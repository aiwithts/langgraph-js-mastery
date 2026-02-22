/**
 * POST /api/graphs/:id/resume - Resume an interrupted graph
 *
 * When a graph uses `interrupt()` for human-in-the-loop workflows,
 * it pauses execution and waits for user input. This endpoint resumes
 * execution with the user's response.
 *
 * @see Lesson 18: Human-in-the-Loop
 */

import type { ResumeRequest, SSEEvent } from "@/types";
import "@/server/graphs/index";
import { getCheckpointer } from "@/server/lib/checkpointer";
import { type SendEvent, resumeGraph } from "@/server/lib/graph-runner";
import { getGraph } from "@/server/lib/registry";
import { ensureThread } from "@/server/lib/threads";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id: graphId } = await params;
	const registeredGraph = getGraph(graphId);

	if (!registeredGraph) {
		return Response.json({ error: "Graph not found" }, { status: 404 });
	}

	const body = (await req.json()) as ResumeRequest;
	const { threadId, response } = body;

	if (!threadId || !response) {
		return Response.json({ error: "threadId and response are required" }, { status: 400 });
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

				await resumeGraph(graph, response, config, sendEvent, threadId);
			} catch (error) {
				console.error("Error resuming graph:", error);
				const errorEvent: SSEEvent = {
					type: "error",
					message: error instanceof Error ? error.message : "Unknown error occurred",
					code: "RESUME_ERROR",
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
