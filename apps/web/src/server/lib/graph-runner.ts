/**
 * Graph Runner — Executes LangGraph graphs and streams results to the client
 * ==========================================================================
 *
 * This is the core file you'll build and progressively enhance throughout the course.
 * It handles the bridge between your LangGraph graphs and the browser:
 *
 * ```
 * Browser ──► API Route ──► runGraph() ──► graph.invoke/stream ──► SSE events ──► Browser
 * ```
 *
 * ## Your Journey
 *
 * You'll evolve this file as you learn new capabilities:
 *
 * | Lesson | Enhancement                    | What Changes                              |
 * |--------|--------------------------------|-------------------------------------------|
 * | L01    | Basic invocation               | graph.invoke() → SSE response             |
 * | L03    | Token streaming                | graph.stream() + streamMode: 'messages'   |
 * | L18    | Human-in-the-loop              | Interrupt detection + resume handler       |
 * | L26    | Generative UI (custom events)  | Combined stream modes + UI event handling  |
 * | L30    | Display intents                | Collect intents from final state           |
 *
 * ## How This File Is Used
 *
 * The API route in `app/api/graphs/[id]/invoke/route.ts` calls `runGraph()` for new
 * messages and `resumeGraph()` for human-in-the-loop responses. You don't need to
 * modify the route file — just implement and enhance the functions here.
 *
 * @see app/api/graphs/[id]/invoke/route.ts — the API route that calls these functions
 * @see Lesson 01: Your first implementation of runGraph
 */

import type { SSEEvent } from "@/types";

/** Callback function to send an SSE event to the client */
export type SendEvent = (event: SSEEvent) => void;

// ─── TODO (Lesson 01): Implement runGraph ────────────────────────────────────
//
// This function receives a compiled graph, input, config, and a sendEvent callback.
// Your job: invoke the graph, extract the response, and send it to the client
// as SSE events.
//
// The sendEvent callback sends a typed SSE event to the client:
//   - sendEvent({ type: 'message_complete', id, content, role: 'assistant' })
//   - sendEvent({ type: 'done', threadId })
//
// The client (useChat hook) expects these events:
//   - { type: 'message_complete', id, content, role: 'assistant' } — the full response
//   - { type: 'done', threadId } — signals the stream is finished
//
// Steps:
//   1. Call graph.invoke(input, config) to run the graph
//   2. Extract the last message from result.messages
//   3. Send a 'message_complete' event with the message content
//   4. Send a 'done' event with the threadId
//
// Hint: Use `v4 as uuidv4` from the 'uuid' package to generate message IDs.
//
// ─────────────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function runGraph(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	graph: any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	input: any,
	config: { configurable: { thread_id: string } },
	sendEvent: SendEvent,
	threadId: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	// TODO: Implement in Lesson 01
	throw new Error("Not implemented yet — complete Lesson 01 to build your first graph runner!");
}

// ─── TODO (Lesson 18): Implement resumeGraph ─────────────────────────────────
//
// This function resumes an interrupted graph with the user's response.
// You'll implement this when you learn about human-in-the-loop in Lesson 18.
//
// The client calls this when the user responds to an interrupt
// (e.g., confirming an action, filling a form, making a selection).
//
// ─────────────────────────────────────────────────────────────────────────────

export async function resumeGraph(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	graph: any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	response: any,
	config: { configurable: { thread_id: string } },
	sendEvent: SendEvent,
	threadId: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	// TODO: Implement in Lesson 18
	throw new Error("Not implemented yet — complete Lesson 18 to add human-in-the-loop support!");
}
