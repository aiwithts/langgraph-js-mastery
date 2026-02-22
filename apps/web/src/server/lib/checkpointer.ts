import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
import pg from "pg";

const { Pool } = pg;

let checkpointer: PostgresSaver | null = null;
let pool: pg.Pool | null = null;

export async function getCheckpointer(): Promise<PostgresSaver> {
	if (checkpointer) {
		return checkpointer;
	}

	const connectionString = process.env["DATABASE_URL"];
	if (!connectionString) {
		throw new Error("DATABASE_URL environment variable is required");
	}

	pool = new Pool({ connectionString });
	checkpointer = PostgresSaver.fromConnString(connectionString);

	// Setup tables on first use
	await checkpointer.setup();

	console.log("PostgreSQL checkpointer initialized");
	return checkpointer;
}

export async function getPool(): Promise<pg.Pool> {
	if (pool) {
		return pool;
	}

	const connectionString = process.env["DATABASE_URL"];
	if (!connectionString) {
		throw new Error("DATABASE_URL environment variable is required");
	}

	pool = new Pool({ connectionString });
	return pool;
}

export async function closeConnections(): Promise<void> {
	if (pool) {
		await pool.end();
		pool = null;
	}
	checkpointer = null;
}
