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

	// NOTE: Tasks 1–3 go INSIDE a ReadableStream's start(controller) callback.
	//       Task 4 (return the Response) goes OUTSIDE it, after the ReadableStream closing brace.

	// TODO (Lesson 03, Step 3, Task 1): Create the TextEncoder and define send() inside the ReadableStream start callback

	// TODO (Lesson 03, Step 3, Task 2): Set up the PostgresSaver checkpointer, create the graph, and build the config object

	// TODO (Lesson 03, Step 3, Task 3): Stream tokens with graph.stream() and send message_delta, message_complete, and done events

	// TODO (Lesson 03, Step 3, Task 4): Return a new Response wrapping the stream with SSE headers

	// Placeholder — replace with your ReadableStream implementation in Step 3
	return Response.json({ error: "Not implemented — complete Lesson 03, Step 3" }, { status: 501 });
}
