/**
 * POST /api/stream-ui — Stream tokens and custom UI events
 *
 * Introduced in Lesson 26. Students implement the combined-mode streaming
 * loop and interrupt detection inside the TODO block below.
 *
 * Request body: { graphId, threadId, message }
 * SSE events:   message_delta* + ui* → (message_complete | interrupt) → done
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

				// ─── TODO (L26): Stream tokens + UI events, detect interrupts ─────────
				//
				// 1. Open a combined-mode stream:
				//      const streamResult = graph.stream(input, {
				//        ...config,
				//        streamMode: ['messages', 'custom'],
				//      })
				//
				// 2. Each iteration yields a [mode, data] tuple:
				//      for await (const [mode, data] of streamResult) {
				//        if (mode === 'messages') {
				//          const [chunk] = data
				//          if (chunk._getType() === 'ai' && chunk.content) {
				//            send({ type: 'message_delta', content: chunk.content as string, role: 'assistant' })
				//          }
				//        } else if (mode === 'custom') {
				//          send(data)  // forward UI event directly to the client
				//        }
				//      }
				//
				// 3. After the loop, check for interrupt (same pattern as /api/stream-hitl):
				//      const state = await graph.getState(config)
				//      const interrupt = state.tasks[0]?.interrupts?.[0]
				//
				// 3a. If interrupted → send({ type: 'interrupt', intent: interrupt.value })
				// 3b. Otherwise → send({ type: 'message_complete', id: uuidv4(), content, role: 'assistant' })
				//
				// 4. Always send done:
				//       send({ type: 'done', threadId })
				//
				// ─────────────────────────────────────────────────────────────────────
				throw new Error(
					"Not implemented yet — complete Lesson 26 to add generative UI streaming!",
				);
			} catch (error) {
				console.error("Error in stream-ui:", error);
				send({
					type: "error",
					message: error instanceof Error ? error.message : "Unknown error",
					code: "STREAM_UI_ERROR",
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
