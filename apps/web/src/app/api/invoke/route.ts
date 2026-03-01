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
import { getCheckpointer } from "@/server/lib/checkpointer";
import { getGraph } from "@/server/lib/registry";
import { ensureThread } from "@/server/lib/threads";

export async function POST(req: Request) {
	const body = (await req.json()) as InvokeRequest;
	const { graphId, threadId, message } = body;

	if (!graphId || !threadId || !message) {
		return Response.json({ error: "graphId, threadId and message are required" }, { status: 400 });
	}

	const registeredGraph = getGraph(graphId);
	if (!registeredGraph) {
		return Response.json({ error: "Graph not found" }, { status: 404 });
	}

	const encoder = new TextEncoder();
	const stream = new ReadableStream({
		async start(controller) {
			const send = (event: SSEEvent) =>
				controller.enqueue(
					encoder.encode(`event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`),
				);

			try {
				const checkpointer = await getCheckpointer();
				const graph = await registeredGraph.createGraph(checkpointer);

				await ensureThread(graphId, threadId);

				const config = { configurable: { thread_id: threadId } };
				const input = { messages: [new HumanMessage(message)] };

				// ─── TODO (L01): Call graph.invoke() and send SSE events ──────────────
				//
				// 1. Call graph.invoke(input, config) to run the graph
				// 2. Extract the last message: result.messages.at(-1)
				// 3. Send a 'message_complete' event:
				//      send({ type: 'message_complete', id: uuidv4(), content, role: 'assistant' })
				// 4. Send a 'done' event:
				//      send({ type: 'done', threadId })
				//
				// Hint: cast the last message's content to string — content as string
				//
				// ─────────────────────────────────────────────────────────────────────
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

	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
		},
	});
}
