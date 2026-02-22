/**
 * POST /api/graphs/:id/invoke - Invoke a graph with SSE streaming
 *
 * This endpoint:
 * 1. Looks up the graph by ID from the registry
 * 2. Creates a ReadableStream for SSE
 * 3. Creates/resumes a thread with the checkpointer
 * 4. Delegates to runGraph() in server/lib/graph-runner.ts
 *
 * Request Body:
 * {
 *   "threadId": "unique-thread-id",
 *   "message": "User's message"
 * }
 */

import { HumanMessage } from "@langchain/core/messages";
import type { InvokeRequest, SSEEvent } from "@/types";
import "@/server/graphs/index";
import { getCheckpointer } from "@/server/lib/checkpointer";
import { type SendEvent, runGraph } from "@/server/lib/graph-runner";
import { getGraph } from "@/server/lib/registry";
import { ensureThread } from "@/server/lib/threads";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id: graphId } = await params;
	const registeredGraph = getGraph(graphId);

	if (!registeredGraph) {
		return Response.json({ error: "Graph not found" }, { status: 404 });
	}

	const body = (await req.json()) as InvokeRequest;
	const { threadId, message } = body;

	if (!threadId || !message) {
		return Response.json({ error: "threadId and message are required" }, { status: 400 });
	}

	const encoder = new TextEncoder();
	const stream = new ReadableStream({
		async start(controller) {
			const sendEvent: SendEvent = (event: SSEEvent) => {
				controller.enqueue(
					encoder.encode(`event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`),
				);
			};

			try {
				const checkpointer = await getCheckpointer();
				const graph = await registeredGraph.createGraph(checkpointer);

				await ensureThread(graphId, threadId);

				const config = {
					configurable: {
						thread_id: threadId,
					},
				};

				const humanMessage = new HumanMessage(message);

				await runGraph(graph, { messages: [humanMessage] }, config, sendEvent, threadId);
			} catch (error) {
				console.error("Error invoking graph:", error);
				const errorEvent: SSEEvent = {
					type: "error",
					message: error instanceof Error ? error.message : "Unknown error occurred",
					code: "INVOKE_ERROR",
				};
				sendEvent(errorEvent);
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
