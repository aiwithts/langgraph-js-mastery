import type { Message, Thread } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { getCheckpointer, getPool } from "./checkpointer";
import { hasGraph } from "./registry";

let initialized = false;

async function ensureInitialized(): Promise<void> {
	if (initialized) return;

	const pool = await getPool();
	await pool.query(`
    CREATE TABLE IF NOT EXISTS threads (
      id TEXT PRIMARY KEY,
      graph_id TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
	await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_threads_graph_id ON threads(graph_id)
  `);
	await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_threads_updated_at ON threads(updated_at DESC)
  `);
	initialized = true;
	console.log("Threads table initialized");
}

export async function getThreadsByGraph(graphId: string): Promise<Thread[]> {
	await ensureInitialized();
	const pool = await getPool();
	const result = await pool.query(
		`SELECT id, graph_id as "graphId", created_at as "createdAt", updated_at as "updatedAt"
     FROM threads
     WHERE graph_id = $1
     ORDER BY updated_at DESC`,
		[graphId],
	);

	return result.rows.map((row) => ({
		id: row.id,
		graphId: row.graphId,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	}));
}

export async function getLatestThread(graphId: string): Promise<Thread | null> {
	await ensureInitialized();
	const pool = await getPool();
	const result = await pool.query(
		`SELECT id, graph_id as "graphId", created_at as "createdAt", updated_at as "updatedAt"
     FROM threads
     WHERE graph_id = $1
     ORDER BY updated_at DESC
     LIMIT 1`,
		[graphId],
	);

	if (result.rows.length === 0) return null;

	const row = result.rows[0];
	return {
		id: row.id,
		graphId: row.graphId,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	};
}

export async function createThread(graphId: string): Promise<Thread> {
	await ensureInitialized();
	const pool = await getPool();
	const threadId = uuidv4();
	const now = new Date();

	await pool.query(
		`INSERT INTO threads (id, graph_id, created_at, updated_at)
     VALUES ($1, $2, $3, $3)`,
		[threadId, graphId, now],
	);

	return {
		id: threadId,
		graphId,
		createdAt: now.toISOString(),
		updatedAt: now.toISOString(),
	};
}

export async function deleteThread(threadId: string): Promise<boolean> {
	await ensureInitialized();
	const pool = await getPool();

	const existing = await pool.query("SELECT id FROM threads WHERE id = $1", [threadId]);
	if (existing.rows.length === 0) return false;

	await pool.query("DELETE FROM threads WHERE id = $1", [threadId]);
	await pool.query("DELETE FROM checkpoints WHERE thread_id = $1", [threadId]);
	await pool.query("DELETE FROM checkpoint_blobs WHERE thread_id = $1", [threadId]);
	await pool.query("DELETE FROM checkpoint_writes WHERE thread_id = $1", [threadId]);

	return true;
}

export async function getThreadMessages(threadId: string): Promise<Message[]> {
	await ensureInitialized();
	const pool = await getPool();

	const existing = await pool.query("SELECT id FROM threads WHERE id = $1", [threadId]);
	if (existing.rows.length === 0) return [];

	const checkpointer = await getCheckpointer();
	const config = { configurable: { thread_id: threadId } };

	const checkpointTuple = await checkpointer.getTuple(config);

	if (!checkpointTuple || !checkpointTuple.checkpoint) {
		return [];
	}

	const messages: Message[] = [];
	const channelValues = checkpointTuple.checkpoint.channel_values as
		| Record<string, unknown>
		| undefined;

	const messagesArray = channelValues?.["messages"];
	if (messagesArray && Array.isArray(messagesArray)) {
		for (const msg of messagesArray) {
			const msgObj = msg as {
				id?: string;
				type?: string;
				content?: unknown;
				_getType?: () => string;
			};
			const msgType = msgObj._getType?.() ?? msgObj.type ?? "unknown";

			messages.push({
				id: msgObj.id ?? uuidv4(),
				role: msgType === "human" ? "user" : "assistant",
				content:
					typeof msgObj.content === "string" ? msgObj.content : JSON.stringify(msgObj.content),
				timestamp: new Date().toISOString(),
			});
		}
	}

	return messages;
}

export async function ensureThread(graphId: string, threadId: string): Promise<Thread> {
	await ensureInitialized();
	const pool = await getPool();
	const now = new Date();

	const existing = await pool.query(
		`SELECT id, graph_id as "graphId", created_at as "createdAt", updated_at as "updatedAt"
     FROM threads WHERE id = $1`,
		[threadId],
	);

	if (existing.rows.length > 0) {
		const row = existing.rows[0];
		await pool.query("UPDATE threads SET updated_at = NOW() WHERE id = $1", [threadId]);
		return {
			id: row.id,
			graphId: row.graphId,
			createdAt: row.createdAt.toISOString(),
			updatedAt: now.toISOString(),
		};
	}

	await pool.query(
		`INSERT INTO threads (id, graph_id, created_at, updated_at)
     VALUES ($1, $2, $3, $3)`,
		[threadId, graphId, now],
	);

	return {
		id: threadId,
		graphId,
		createdAt: now.toISOString(),
		updatedAt: now.toISOString(),
	};
}
