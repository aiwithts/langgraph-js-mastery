import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Resilient response after retry" }),
	}),
}));

describe("Lesson 33: My Resilient Agent", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn33MyResilientAgent.config.id).toBe("learn-33-my-resilient-agent");
		expect(mod.learn33MyResilientAgent.config.name).toBe("My Resilient Agent");
		expect(mod.learn33MyResilientAgent.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 33 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn33MyResilientAgent.createGraph();
		expect(graph).toBeDefined();
	});

	it("handles a successful request", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn33MyResilientAgent.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.lastError).toBeNull();
	});
});
