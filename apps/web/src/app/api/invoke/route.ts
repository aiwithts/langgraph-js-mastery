/**
 * POST /api/invoke — Invoke a graph and return the complete response (stateless)
 *
 * Introduced in Lesson 01. Students implement the TextEncoder, ReadableStream,
 * graph.invoke() call, and SSE event dispatch in Step 2 below.
 *
 * The frontend sends the full conversation history on every request — no thread ID,
 * no checkpointer. Thread persistence is introduced in Lesson 10 (/api/stream-thread).
 *
 * Request body: { graphId, messages: [{role, content}…] }
 * SSE events:   message_complete → done
 */

import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { v4 as uuidv4 } from "uuid"; // Used in TODO: generate message IDs
import type { StatelessRequest, SSEEvent } from "@/types";
import "@/server/graphs/index";
import { getGraph } from "@/server/lib/registry";

export async function POST(req: Request) {
	// Extract JSON body from request
	const body = (await req.json()) as StatelessRequest;
	const { graphId, messages } = body;

	// Basic body validation
	if (!graphId || !messages || messages.length === 0) {
		return Response.json({ error: "graphId and messages are required" }, { status: 400 });
	}

	// Look up the graph by the provided id
	const registeredGraph = getGraph(graphId);
	if (!registeredGraph) {
		return Response.json({ error: "Graph not found" }, { status: 404 });
	}

	// Map the full conversation history to LangChain message objects
	const input = {
		messages: messages.map((m) =>
			m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content),
		),
	};

	// TODO (Lesson 01, Step 2, Task 1): Create a TextEncoder

	// TODO (Lesson 01, Step 2, Task 2): Build a ReadableStream and enqueue SSE events directly

	// TODO (Lesson 01, Step 2, Task 3): Return a Response with SSE headers

	// Placeholder — replace with your ReadableStream implementation in Step 2
	return Response.json({ error: "Not implemented — complete Lesson 01, Step 2" }, { status: 501 });
}
