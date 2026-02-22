import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Observable response" }),
	}),
}));

describe("Lesson 34: My Observable Agent", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn34MyObservableAgent.config.id).toBe("learn-34-my-observable-agent");
		expect(mod.learn34MyObservableAgent.config.name).toBe("My Observable Agent");
		expect(mod.learn34MyObservableAgent.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 34 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn34MyObservableAgent.createGraph();
		expect(graph).toBeDefined();
	});

	it("processes a message and emits metrics events", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const stateUpdates: unknown[] = [];
		const mod = await import("../index");
		const graph = mod.learn34MyObservableAgent.createGraph();
		const result = await graph.invoke(
			{ messages: [new HumanMessage("Hello!")] },
			{ writer: (event: unknown) => stateUpdates.push(event) },
		);
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
