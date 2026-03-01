/**
 * POST /api/invoke — Invoke a graph and return the complete response
 *
 * Introduced in Lesson 01. Students implement the graph.invoke() call
 * and SSE event dispatch inside the TODO block below.
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
				// Look up our registered graph
				const graph = registeredGraph.createGraph();
				const config = {};

				// Compose input state (typeof MessagesAnnotation.State)
				const input = { messages: [new HumanMessage(message)] };

				// TODO (Lesson 01, Step 2): Call graph.invoke() and send SSE events
				// 1. Call graph.invoke(input, config) and store the result
				// 2. Extract the last message from result.messages
				// 3. Send a 'message_complete' event — include id, content (cast to string), and role: 'assistant'
				// 4. Send a 'done' event — include threadId
				throw new Error(
					"Not implemented yet — complete Lesson 01 to build your first route!",
				);
			} catch (error) {
				console.error("Error invoking graph:", error);
				send({
					type: "error",
					message: error instanceof Error ? error.message : "Unknown error",
					code: "INVOKE_ERROR",
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
