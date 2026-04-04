/**
 * POST /api/stream-thread — Stream a graph response with PostgreSQL-backed thread persistence
 *
 * Introduced in Lesson 10. Students implement the checkpointer setup, graph creation,
 * config object, and graph.stream() loop in Step 8 below.
 *
 * Request body: { graphId, threadId, message }
 * SSE events:   message_delta* → message_complete → done
 */

import { HumanMessage } from "@langchain/core/messages";
import { v4 as uuidv4 } from "uuid"; // Used in TODO: generate message IDs
import type { InvokeRequest, SSEEvent } from "@/types";
import "@/server/graphs/index";
// TODO (Lesson 10, Step 8, Task 2): Uncomment this import
// import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
import { getGraph } from "@/server/lib/registry";
import { ensureThread } from "@/server/lib/threads";

export async function POST(req: Request) {
	// Extract JSON body from request
	const body = (await req.json()) as InvokeRequest;
	const { graphId, threadId, message } = body;

	// Basic body validation
	if (!graphId || !threadId || !message) {
		return Response.json({ error: "graphId, threadId and message are required" }, { status: 400 });
	}

	// Look up the graph by the provided id
	const registeredGraph = getGraph(graphId);
	if (!registeredGraph) {
		return Response.json({ error: "Graph not found" }, { status: 404 });
	}

	// Ensure a persisted thread record exists for this graph (pre-built — no changes needed)
	await ensureThread(graphId, threadId);

	// Compose input state — only the new message; the checkpointer loads prior history
	const input = { messages: [new HumanMessage(message)] };

	// NOTE: Tasks 1–3 go INSIDE a ReadableStream's start(controller) callback.
	//       Task 4 (return the Response) goes OUTSIDE it, after the ReadableStream closing brace.

	// TODO (Lesson 10, Step 8, Task 1): Create the TextEncoder and define send() inside the ReadableStream start callback

	// TODO (Lesson 10, Step 8, Task 2): Set up the PostgresSaver checkpointer, create the graph, and build the config object
	//   const checkpointer = PostgresSaver.fromConnString(process.env['DATABASE_URL']!);
	//   await checkpointer.setup();
	//   const graph = await registeredGraph.createGraph(checkpointer);
	//   const config = { configurable: { thread_id: threadId } };

	// TODO (Lesson 10, Step 8, Task 3): Stream tokens with graph.stream() and send message_delta, message_complete, and done events

	// TODO (Lesson 10, Step 8, Task 4): Return a new Response wrapping the stream with SSE headers

	// Placeholder — replace with your ReadableStream implementation
	return Response.json({ error: "Not implemented — complete Lesson 10, Step 8" }, { status: 501 });
}
