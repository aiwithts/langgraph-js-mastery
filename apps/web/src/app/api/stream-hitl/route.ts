/**
 * POST /api/stream-hitl — Stream a graph response with interrupt detection
 *
 * Introduced in Lesson 18. Students implement the streaming loop and
 * interrupt detection inside the TODO block below.
 *
 * Request body: { graphId, threadId, message }
 * SSE events:   message_delta* → (message_complete | interrupt) → done
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

					// TODO (Lesson 18, Step 8): Stream tokens, detect interrupt, send appropriate events
				throw new Error("Not implemented — complete Lesson 18, Step 8!");
			} catch (error) {
				console.error("Error in stream-hitl:", error);
				send({
					type: "error",
					message: error instanceof Error ? error.message : "Unknown error",
					code: "STREAM_HITL_ERROR",
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
