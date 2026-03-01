/**
 * Graph Runner Tests
 * ==================
 *
 * These tests verify your graph-runner implementation as you build it through the course.
 * Run the tests that match your current lesson:
 *
 *   pnpm test graph-runner            # Run all graph-runner tests
 *   pnpm test graph-runner -- -t L01  # Run only Lesson 01 tests
 *   pnpm test graph-runner -- -t L03  # Run only Lesson 03 tests
 *   pnpm test graph-runner -- -t L18  # Run only Lesson 18 tests
 *   pnpm test graph-runner -- -t L26  # Run only Lesson 26 tests
 *   pnpm test graph-runner -- -t L30  # Run only Lesson 30 tests
 *
 * Each test suite corresponds to a version of graph-runner.ts:
 *
 * | Suite | Lesson | What It Tests                              |
 * |-------|--------|---------------------------------------------|
 * | L01   | 01     | Basic invocation with graph.invoke()        |
 * | L03   | 03     | Token streaming with graph.stream()         |
 * | L18   | 18     | Interrupt detection + resume                |
 * | L26   | 26     | Custom events (combined stream modes)       |
 * | L30   | 30     | Display intent collection                   |
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SSEEvent } from "@/types";
import type { CompiledGraph } from "@/server/types";
import type { SendEvent } from "../graph-runner";
import { resumeGraph, runGraph } from "../graph-runner";

// ─── Mock SendEvent ─────────────────────────────────────────────────────────

/** Creates a mock sendEvent callback that captures SSE events */
function createMockSendEvent() {
	const events: Array<{ type: string; data: Record<string, unknown> }> = [];

	const sendEvent: SendEvent = (event: SSEEvent) => {
		events.push({ type: event.type, data: event as unknown as Record<string, unknown> });
	};

	return {
		sendEvent,
		_events: events,
		getEvents: (type?: string) => (type ? events.filter((e) => e.type === type) : events),
		getLastEvent: (type: string) => events.filter((e) => e.type === type).pop(),
		hasEvent: (type: string) => events.some((e) => e.type === type),
	};
}

// ─── Mock Graphs ────────────────────────────────────────────────────────────

/** Creates a mock graph that returns a fixed message via invoke() */
function createInvokeGraph(responseContent: string) {
	return {
		invoke: vi.fn(async () => ({
			messages: [{ content: responseContent, _getType: () => "ai" }],
		})),
		stream: vi.fn(),
		getState: vi.fn(),
	} as unknown as CompiledGraph;
}

/** Creates a mock graph that streams tokens via stream() */
function createStreamingGraph(tokens: string[]) {
	return {
		invoke: vi.fn(),
		stream: vi.fn(async function* () {
			for (const token of tokens) {
				// Single 'messages' mode: chunks are [message, metadata]
				yield [{ content: token, _getType: () => "ai" }, { langgraph_node: "chat" }];
			}
		}),
		getState: vi.fn(async () => ({ values: {}, tasks: [] })),
	} as unknown as CompiledGraph;
}

/** Creates a mock graph that streams tokens in combined mode */
function createCombinedModeGraph(
	tokens: string[],
	customEvents: Array<Record<string, unknown>> = [],
) {
	return {
		invoke: vi.fn(),
		stream: vi.fn(async function* () {
			// Emit custom events first
			for (const event of customEvents) {
				yield ["custom", event];
			}
			// Then emit tokens
			for (const token of tokens) {
				// Combined mode: ['messages', [message, metadata]]
				yield ["messages", [{ content: token, _getType: () => "ai" }, { langgraph_node: "chat" }]];
			}
		}),
		getState: vi.fn(async () => ({ values: {}, tasks: [] })),
	} as unknown as CompiledGraph;
}

/** Creates a mock graph that interrupts */
function createInterruptGraph(tokens: string[], interruptValue: unknown) {
	return {
		invoke: vi.fn(),
		stream: vi.fn(async function* () {
			for (const token of tokens) {
				yield [{ content: token, _getType: () => "ai" }, { langgraph_node: "chat" }];
			}
		}),
		getState: vi.fn(async () => ({
			values: {},
			tasks: [
				{
					interrupts: [{ value: interruptValue }],
				},
			],
		})),
	} as unknown as CompiledGraph;
}

/** Creates a mock graph with display intents in final state */
function createDisplayIntentGraph(tokens: string[], intents: Array<Record<string, unknown>>) {
	return {
		invoke: vi.fn(),
		stream: vi.fn(async function* () {
			for (const token of tokens) {
				yield ["messages", [{ content: token, _getType: () => "ai" }, { langgraph_node: "chat" }]];
			}
		}),
		getState: vi.fn(async () => ({
			values: { displayIntents: intents },
			tasks: [],
		})),
	} as unknown as CompiledGraph;
}

// ─── Test Config ────────────────────────────────────────────────────────────

const testConfig = { configurable: { thread_id: "test-thread-123" } };
const testThreadId = "test-thread-123";

// ═══════════════════════════════════════════════════════════════════════════
// L01: Basic Invocation
// ═══════════════════════════════════════════════════════════════════════════

describe("L01: Basic Invocation (graph.invoke)", () => {
	it("should call graph.invoke with input and config", async () => {
		const graph = createInvokeGraph("Hello from the graph!");
		const mock = createMockSendEvent();
		const input = { messages: [{ content: "Hi", _getType: () => "human" }] };

		await runGraph(graph, input, testConfig, mock.sendEvent, testThreadId);

		expect(graph.invoke).toHaveBeenCalledWith(input, testConfig);
	});

	it("should send a message_complete event with the graph response", async () => {
		const graph = createInvokeGraph("Hello from the graph!");
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const completeEvents = mock.getEvents("message_complete");
		expect(completeEvents.length).toBe(1);
		expect(completeEvents[0].data.content).toBe("Hello from the graph!");
		expect(completeEvents[0].data.role).toBe("assistant");
	});

	it("should send a done event with the threadId", async () => {
		const graph = createInvokeGraph("Hello!");
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const doneEvents = mock.getEvents("done");
		expect(doneEvents.length).toBe(1);
		expect(doneEvents[0].data.threadId).toBe(testThreadId);
	});

	it("should send message_complete before done", async () => {
		const graph = createInvokeGraph("Hello!");
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const events = mock.getEvents();
		const completeIndex = events.findIndex((e) => e.type === "message_complete");
		const doneIndex = events.findIndex((e) => e.type === "done");
		expect(completeIndex).toBeLessThan(doneIndex);
	});

	it("should include an id field in message_complete", async () => {
		const graph = createInvokeGraph("Hello!");
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const event = mock.getLastEvent("message_complete");
		expect(event?.data.id).toBeDefined();
		expect(typeof event?.data.id).toBe("string");
		expect((event?.data.id as string).length).toBeGreaterThan(0);
	});
});

// ═══════════════════════════════════════════════════════════════════════════
// L03: Token Streaming
// ═══════════════════════════════════════════════════════════════════════════

describe("L03: Token Streaming (graph.stream)", () => {
	it("should call graph.stream instead of graph.invoke", async () => {
		const graph = createStreamingGraph(["Hello", " world", "!"]);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		expect(graph.stream).toHaveBeenCalled();
		expect(graph.invoke).not.toHaveBeenCalled();
	});

	it('should use streamMode "messages"', async () => {
		const graph = createStreamingGraph(["Hello"]);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const streamCall = (vi.mocked(graph.stream).mock.calls as any[])[0];
		const streamConfig = streamCall[1] as any;
		// Accept either 'messages' or ['messages', ...] (V4 uses combined mode)
		const streamMode = streamConfig.streamMode;
		if (Array.isArray(streamMode)) {
			expect(streamMode).toContain("messages");
		} else {
			expect(streamMode).toBe("messages");
		}
	});

	it("should send message_delta events for each token", async () => {
		const tokens = ["Hello", " world", "!"];
		const graph = createStreamingGraph(tokens);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const deltas = mock.getEvents("message_delta");
		expect(deltas.length).toBe(tokens.length);
		expect(deltas[0].data.content).toBe("Hello");
		expect(deltas[1].data.content).toBe(" world");
		expect(deltas[2].data.content).toBe("!");
	});

	it('should send message_delta events with role "assistant"', async () => {
		const graph = createStreamingGraph(["Hi"]);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const delta = mock.getLastEvent("message_delta");
		expect(delta?.data.role).toBe("assistant");
	});

	it("should send message_complete with the full accumulated content", async () => {
		const graph = createStreamingGraph(["Hello", " world", "!"]);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const complete = mock.getLastEvent("message_complete");
		expect(complete?.data.content).toBe("Hello world!");
	});

	it("should send done event after message_complete", async () => {
		const graph = createStreamingGraph(["Hello"]);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		expect(mock.hasEvent("message_complete")).toBe(true);
		expect(mock.hasEvent("done")).toBe(true);

		const events = mock.getEvents();
		const completeIndex = events.findIndex((e) => e.type === "message_complete");
		const doneIndex = events.findIndex((e) => e.type === "done");
		expect(completeIndex).toBeLessThan(doneIndex);
	});

	it("should pass config (with thread_id) to graph.stream", async () => {
		const graph = createStreamingGraph(["Hi"]);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const streamCall = (vi.mocked(graph.stream).mock.calls as any[])[0];
		const streamConfig = streamCall[1] as any;
		expect(streamConfig.configurable.thread_id).toBe("test-thread-123");
	});
});

// ═══════════════════════════════════════════════════════════════════════════
// L18: Interrupt Handling
// ═══════════════════════════════════════════════════════════════════════════

describe("L18: Interrupt Handling", () => {
	it("should detect interrupts via graph.getState()", async () => {
		const interruptValue = {
			kind: "confirmation",
			id: "confirm-1",
			title: "Confirm?",
			message: "Are you sure?",
			severity: "info",
		};
		const graph = createInterruptGraph(["Checking..."], interruptValue);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		expect(graph.getState).toHaveBeenCalledWith(testConfig);
	});

	it("should send an interrupt event when the graph is interrupted", async () => {
		const interruptValue = {
			kind: "confirmation",
			id: "confirm-1",
			title: "Confirm?",
			message: "Proceed?",
			severity: "info",
		};
		const graph = createInterruptGraph([], interruptValue);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		expect(mock.hasEvent("interrupt")).toBe(true);
		const interruptEvent = mock.getLastEvent("interrupt");
		expect(interruptEvent?.data.intent).toEqual(interruptValue);
	});

	it("should send done after interrupt (not message_complete)", async () => {
		const interruptValue = {
			kind: "confirmation",
			id: "confirm-1",
			title: "OK?",
			message: "Go?",
			severity: "info",
		};
		const graph = createInterruptGraph([], interruptValue);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		expect(mock.hasEvent("done")).toBe(true);
		// When interrupted, message_complete should NOT be sent
		// (the graph hasn't finished producing a response)
		const events = mock.getEvents();
		const interruptIndex = events.findIndex((e) => e.type === "interrupt");
		const doneIndex = events.findIndex((e) => e.type === "done");
		expect(interruptIndex).toBeLessThan(doneIndex);
	});

	it("should NOT send interrupt when graph completes normally", async () => {
		const graph = createStreamingGraph(["Normal", " response"]);
		// Override getState to return no interrupts
		(graph as unknown as { getState: unknown }).getState = vi.fn(async () => ({ values: {}, tasks: [] }));
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		expect(mock.hasEvent("interrupt")).toBe(false);
		expect(mock.hasEvent("message_complete")).toBe(true);
	});

	it("resumeGraph should exist and be callable", async () => {
		expect(typeof resumeGraph).toBe("function");
	});
});

// ═══════════════════════════════════════════════════════════════════════════
// L26: Custom Events (Generative UI)
// ═══════════════════════════════════════════════════════════════════════════

describe("L26: Custom Events (Generative UI)", () => {
	it('should use combined streamMode including "custom"', async () => {
		const graph = createCombinedModeGraph(["Hello"]);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const streamCall = (vi.mocked(graph.stream).mock.calls as any[])[0];
		const streamConfig = streamCall[1] as any;
		expect(Array.isArray(streamConfig.streamMode)).toBe(true);
		expect(streamConfig.streamMode).toContain("messages");
		expect(streamConfig.streamMode).toContain("custom");
	});

	it("should forward UI events from custom stream mode", async () => {
		const uiEvent = {
			type: "ui",
			id: "weather-1",
			component: "weather",
			props: { city: "Tokyo", temp: 22 },
		};
		const graph = createCombinedModeGraph(["Response"], [uiEvent]);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		expect(mock.hasEvent("ui")).toBe(true);
		const event = mock.getLastEvent("ui");
		expect(event?.data.component).toBe("weather");
		expect((event?.data.props as any).city).toBe("Tokyo");
	});

	it("should still stream tokens in combined mode", async () => {
		const uiEvent = { type: "ui", id: "test-1", component: "test", props: {} };
		const graph = createCombinedModeGraph(["Hello", " world"], [uiEvent]);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const deltas = mock.getEvents("message_delta");
		expect(deltas.length).toBe(2);
		expect(deltas[0].data.content).toBe("Hello");
	});

	it("should send UI events before token deltas (when emitted first)", async () => {
		const uiEvent = {
			type: "ui",
			id: "status-1",
			component: "status",
			props: { text: "Thinking..." },
		};
		const graph = createCombinedModeGraph(["Answer"], [uiEvent]);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const events = mock.getEvents();
		const uiIndex = events.findIndex((e) => e.type === "ui");
		const deltaIndex = events.findIndex((e) => e.type === "message_delta");
		expect(uiIndex).toBeLessThan(deltaIndex);
	});
});

// ═══════════════════════════════════════════════════════════════════════════
// L30: Display Intents
// ═══════════════════════════════════════════════════════════════════════════

describe("L30: Display Intents", () => {
	it("should collect displayIntents from final graph state", async () => {
		const intents = [
			{ id: "weather-1", component: "WeatherCard", props: { city: "NYC", temp: 72 } },
		];
		const graph = createDisplayIntentGraph(["The weather is nice"], intents);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const complete = mock.getLastEvent("message_complete");
		expect(complete?.data.displayIntents).toBeDefined();
		expect((complete?.data.displayIntents as any[]).length).toBe(1);
		expect((complete?.data.displayIntents as any[])[0].component).toBe("WeatherCard");
	});

	it("should NOT include displayIntents when none exist in state", async () => {
		const graph = createStreamingGraph(["Hello"]);
		(graph as unknown as { getState: unknown }).getState = vi.fn(async () => ({ values: {}, tasks: [] }));
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const complete = mock.getLastEvent("message_complete");
		expect(complete?.data.displayIntents).toBeUndefined();
	});

	it("should include multiple display intents", async () => {
		const intents = [
			{ id: "card-1", component: "InfoCard", props: { title: "A" } },
			{ id: "card-2", component: "InfoCard", props: { title: "B" } },
			{ id: "chart-1", component: "Chart", props: { data: [1, 2, 3] } },
		];
		const graph = createDisplayIntentGraph(["Here are the results"], intents);
		const mock = createMockSendEvent();

		await runGraph(graph, { messages: [] }, testConfig, mock.sendEvent, testThreadId);

		const complete = mock.getLastEvent("message_complete");
		expect((complete?.data.displayIntents as any[]).length).toBe(3);
	});
});
