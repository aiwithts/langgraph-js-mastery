/**
 * POST /api/resume-ui — Resume an interrupted graph and stream tokens + UI events
 *
 * Introduced in Lesson 26 (used by L28 and L31 HITL-UI graphs). Students
 * implement the Command-based resume with combined-mode streaming inside
 * the TODO block below.
 *
 * Request body: { graphId, threadId, response }
 * SSE events:   message_delta* + ui* → (message_complete | interrupt) → done
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

				// ─── TODO (L26): Resume with Command, stream tokens + UI events ───────
				//
				// Import Command at the top of the file (uncomment the import above).
				//
				// 1. Stream using Command({ resume: response }) as input + combined mode:
				//      const input = new Command({ resume: response })
				//      const streamResult = graph.stream(input, {
				//        ...config,
				//        streamMode: ['messages', 'custom'],
				//      })
				//
				// 2. Same combined-mode loop as /api/stream-ui:
				//      for await (const [mode, data] of streamResult) { ... }
				//      'messages' → send message_delta, 'custom' → send(data)
				//
				// 3. After the loop, check for another interrupt (same as stream-hitl):
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
					"Not implemented yet — complete Lesson 26 to add generative UI resume!",
				);
			} catch (error) {
				console.error("Error in resume-ui:", error);
				send({
					type: "error",
					message: error instanceof Error ? error.message : "Unknown error",
					code: "RESUME_UI_ERROR",
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
