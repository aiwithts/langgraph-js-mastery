/**
 * POST /api/invoke — Invoke a graph and return the complete response
 *
 * Introduced in Lesson 01. Students implement the TextEncoder, ReadableStream,
 * graph.invoke() call, and SSE event dispatch in Step 2 below.
 *
 * Request body: { graphId, threadId, message }
 * SSE events:   message_complete → done
 */

import { HumanMessage } from "@langchain/core/messages";
import { v4 as uuidv4 } from "uuid"; // Used in TODO: generate message IDs
import type { InvokeRequest, SSEEvent } from "@/types";
import "@/server/graphs/index";
import { getGraph } from "@/server/lib/registry";

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

	const input = { messages: [new HumanMessage(message)] };

	// TODO (Lesson 01, Step 2, Task 1): Create a TextEncoder
	// TextEncoder converts JS strings to Uint8Array — ReadableStream.enqueue() only accepts binary chunks.

	// TODO (Lesson 01, Step 2, Task 2): Build a ReadableStream and enqueue SSE events directly
	// 1. Create: const stream = new ReadableStream({ async start(controller) { ... } })
	// 2. Inside start(), in a try/finally block:
	//    - const graph = registeredGraph.createGraph()
	//    - const config = {}
	//    - const result = await graph.invoke(input, config)
	//    - const lastMessage = result.messages.at(-1)
	//    - Enqueue a message_complete event directly:
	//        controller.enqueue(encoder.encode(`event: message_complete\ndata: ${JSON.stringify({ type: 'message_complete', id: uuidv4(), content: lastMessage.content as string, role: 'assistant' })}\n\n`))
	//    - Enqueue a done event:
	//        controller.enqueue(encoder.encode(`event: done\ndata: ${JSON.stringify({ type: 'done', threadId })}\n\n`))
	//    - In finally: controller.close()

	// TODO (Lesson 01, Step 2, Task 3): Return a Response with SSE headers
	// return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' } })

	// Placeholder — replace with your ReadableStream implementation in Step 2
	return Response.json({ error: "Not implemented — complete Lesson 01, Step 2" }, { status: 501 });
}
