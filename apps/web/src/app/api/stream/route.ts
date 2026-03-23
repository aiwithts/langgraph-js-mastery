/**
 * POST /api/stream — Stream a graph response token by token
 *
 * Introduced in Lesson 03. Students implement the TextEncoder, send() helper,
 * ReadableStream, checkpointer setup, and graph.stream() loop in Step 3 below.
 *
 * Request body: { graphId, threadId, message }
 * SSE events:   message_delta* → message_complete → done
 */

import { HumanMessage } from "@langchain/core/messages";
import { v4 as uuidv4 } from "uuid"; // Used in TODO: generate message IDs
import type { InvokeRequest, SSEEvent } from "@/types";
import "@/server/graphs/index";
// TODO (Lesson 03, Step 3, Task 1): Uncomment this import
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

	// Ensure an existing persisted thread record for this graph
	await ensureThread(graphId, threadId);

	// Compose input state (typeof MessagesAnnotation.State)
	const input = { messages: [new HumanMessage(message)] };

	// TODO (Lesson 03, Step 3, Task 1): Create the TextEncoder and define a send() helper
	// You wrote controller.enqueue(encoder.encode(...)) inline in L01 — now you'll need it 10+ times.
	// Abstract it: const send = (event: SSEEvent) => controller.enqueue(encoder.encode(`event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`))
	// Define send() inside the ReadableStream's start(controller) callback so it closes over controller.

	// TODO (Lesson 03, Step 3, Task 2): Set up the checkpointer and create the graph
	// 1. const checkpointer = PostgresSaver.fromConnString(process.env['DATABASE_URL']!)
	// 2. await checkpointer.setup()
	// 3. const graph = registeredGraph.createGraph(checkpointer)
	// 4. const config = { configurable: { thread_id: threadId } }

	// TODO (Lesson 03, Step 3, Task 3): Stream tokens and send SSE events
	// Use graph.stream(input, { ...config, streamMode: 'messages' }) and iterate chunks
	// Filter to ai-type chunks with string content:
	//   chunk._getType() === 'ai' && typeof chunk.content === 'string' && chunk.content
	//   NOTE: structured-output nodes emit chunks where content is an array — the typeof guard skips those
	// send() a message_delta for each chunk (accumulate content)
	// send() message_complete after the loop, then send() done

	// TODO (Lesson 03, Step 3, Task 4): Return a Response with SSE headers

	// Placeholder — replace with your ReadableStream implementation in Step 3
	return Response.json({ error: "Not implemented — complete Lesson 03, Step 3" }, { status: 501 });
}
