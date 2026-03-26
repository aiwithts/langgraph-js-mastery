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

				// TODO (Lesson 18, Step 9): Resume graph with Command and detect interrupts
				throw new Error("Not implemented — complete Lesson 18, Step 9!");
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
