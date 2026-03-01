/**
 * POST /api/stream — Stream a graph response token by token
 *
 * Introduced in Lesson 03. Students implement the graph.stream() loop
 * and SSE event dispatch inside the TODO block below.
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

	// Create stream
	const encoder = new TextEncoder();
	const stream = new ReadableStream({
		async start(controller) {
			// Send helper
			const send = (event: SSEEvent) =>
				controller.enqueue(
					encoder.encode(`event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`),
				);

			try {
				// Ensure an existing persisted thread record for this graph
				await ensureThread(graphId, threadId);

				// Compose input state (typeof MessagesAnnotation.State)
				const input = { messages: [new HumanMessage(message)] };

				// TODO (Lesson 03, Step 3, Task 1): Set up the checkpointer and create the graph
				// 1. const checkpointer = PostgresSaver.fromConnString(process.env['DATABASE_URL']!)
				// 2. await checkpointer.setup()
				// 3. const graph = registeredGraph.createGraph(checkpointer)
				// 4. const config = { configurable: { thread_id: threadId } }

				// TODO (Lesson 03, Step 3, Task 2): Stream tokens and send SSE events
				// 1. Open a stream: graph.stream(input, { ...config, streamMode: 'messages' })
				// 2. Iterate: for await (const [chunk] of streamResult)
				// 3. If chunk._getType() === 'ai' && chunk.content, send a 'message_delta' event
				// 4. After the loop, send a 'message_complete' event with the accumulated content
				// 5. Send a 'done' event with threadId
				throw new Error(
					"Not implemented yet — complete Lesson 03 to add persistence and token streaming!",
				);
			} catch (error) {
				console.error("Error streaming graph:", error);
				send({
					type: "error",
					message: error instanceof Error ? error.message : "Unknown error",
					code: "STREAM_ERROR",
				});
			} finally {
				controller.close();
			}
		},
	});

	// Pass stream in response
	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
		},
	});
}
