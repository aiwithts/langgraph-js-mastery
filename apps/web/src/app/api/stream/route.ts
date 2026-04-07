/**
 * POST /api/stream — Stream a graph response token by token (stateless)
 *
 * Introduced in Lesson 03. Students implement the TextEncoder, send() helper,
 * ReadableStream, and graph.stream() loop in Step 3 below.
 *
 * The frontend sends the full conversation history on every request — no thread ID,
 * no checkpointer. Thread persistence is introduced separately in Lesson 10 (/api/stream-thread).
 *
 * Request body: { graphId, messages: [{role, content}…] }
 * SSE events:   message_delta* → message_complete → done
 */

import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { v4 as uuidv4 } from "uuid"; // Used in TODO: generate message IDs
import type { StatelessRequest, SSEEvent } from "@/types";
import "@/server/graphs/index";
import { getGraph } from "@/server/lib/registry";

export async function POST(req: Request) {
	// Extract JSON body from request
	const body = (await req.json()) as StatelessRequest;
	const { graphId, messages } = body;

	// Basic body validation
	if (!graphId || !messages || messages.length === 0) {
		return Response.json({ error: "graphId and messages are required" }, { status: 400 });
	}

	// Look up the graph by the provided id
	const registeredGraph = getGraph(graphId);
	if (!registeredGraph) {
		return Response.json({ error: "Graph not found" }, { status: 404 });
	}

	// Map the full conversation history to LangChain message objects
	const input = {
		messages: messages.map((m) =>
			m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content),
		),
	};

	// NOTE: Tasks 1–3 go INSIDE a ReadableStream's start(controller) callback.
	//       Task 4 (return the Response) goes OUTSIDE it, after the ReadableStream closing brace.

	// TODO (Lesson 03, Step 3, Task 1): Create the TextEncoder and define send() inside the ReadableStream start callback

	// TODO (Lesson 03, Step 3, Task 2): Create the graph and build the config object

	// TODO (Lesson 03, Step 3, Task 3): Stream tokens with graph.stream() and send message_delta, message_complete, and done events

	// TODO (Lesson 03, Step 3, Task 4): Return a new Response wrapping the stream with SSE headers

	// Placeholder — replace with your ReadableStream implementation in Step 3
	return Response.json({ error: "Not implemented — complete Lesson 03, Step 3" }, { status: 501 });
}
