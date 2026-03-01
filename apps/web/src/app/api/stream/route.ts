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

				// ─── TODO (L03): Stream tokens and send SSE events ────────────────────
				//
				// 1. Open a stream:
				//      const streamResult = graph.stream(input, { ...config, streamMode: 'messages' })
				//
				// 2. Iterate and send a 'message_delta' for each AI token chunk:
				//      for await (const [chunk] of streamResult) {
				//        if (chunk._getType() === 'ai' && chunk.content) {
				//          send({ type: 'message_delta', content: chunk.content as string, role: 'assistant' })
				//        }
				//      }
				//
				// 3. After the loop, send 'message_complete' then 'done':
				//      send({ type: 'message_complete', id: uuidv4(), content: accumulated, role: 'assistant' })
				//      send({ type: 'done', threadId })
				//
				// ─────────────────────────────────────────────────────────────────────
				throw new Error(
					"Not implemented yet — complete Lesson 03 to add token streaming!",
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

	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
		},
	});
}
