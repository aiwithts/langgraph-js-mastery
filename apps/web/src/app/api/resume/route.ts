/**
 * POST /api/resume — Resume an interrupted graph with the user's response
 *
 * Introduced in Lesson 18. Students implement the Command-based resume
 * and interrupt re-detection inside the TODO block below.
 *
 * Request body: { graphId, threadId, response }
 * SSE events:   message_delta* → (message_complete | interrupt) → done
 */

import { v4 as uuidv4 } from "uuid"; // Used in TODO: generate message IDs
// import { Command } from "@langchain/langgraph"; // Used in TODO: resume with Command({ resume: response })
import type { ResumeRequest, SSEEvent } from "@/types";
import "@/server/graphs/index";
import { getCheckpointer } from "@/server/lib/checkpointer";
import { getGraph } from "@/server/lib/registry";
import { ensureThread } from "@/server/lib/threads";

export async function POST(req: Request) {
	const body = (await req.json()) as ResumeRequest;
	const { graphId, threadId, response } = body;

	if (!graphId || !threadId || !response) {
		return Response.json({ error: "graphId, threadId and response are required" }, { status: 400 });
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

				// ─── TODO (L18): Resume graph with Command and detect interrupts ──────
				//
				// Import Command at the top of the file (uncomment the import above).
				//
				// 1. Stream using Command({ resume: response }) as the input:
				//      const input = new Command({ resume: response })
				//      const streamResult = graph.stream(input, { ...config, streamMode: 'messages' })
				//
				// 2. Same token loop as /api/stream-hitl — send message_delta for each AI chunk.
				//
				// 3. After the loop, check for another interrupt (same pattern as stream-hitl):
				//      const state = await graph.getState(config)
				//      const interrupt = state.tasks[0]?.interrupts?.[0]
				//
				// 3a. If interrupted again → send({ type: 'interrupt', intent: interrupt.value })
				// 3b. Otherwise → send({ type: 'message_complete', id: uuidv4(), content, role: 'assistant' })
				//
				// 4. Always send done:
				//       send({ type: 'done', threadId })
				//
				// ─────────────────────────────────────────────────────────────────────
				throw new Error(
					"Not implemented yet — complete Lesson 18 to add human-in-the-loop resume!",
				);
			} catch (error) {
				console.error("Error resuming graph:", error);
				send({
					type: "error",
					message: error instanceof Error ? error.message : "Unknown error",
					code: "RESUME_ERROR",
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
