import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Processing completed after 3 steps." }),
	}),
}));

describe("Lesson 02: My Multi-Step Processor", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn02MyProcessorModule.config.id).toBe("learn-02-my-processor");
		expect(mod.learn02MyProcessorModule.config.name).toBe("My Multi-Step Processor");
		expect(mod.learn02MyProcessorModule.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 02 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn02MyProcessorModule.createGraph();
		expect(graph).toBeDefined();
	});

	it("processes a message through 3 steps and returns a summary", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn02MyProcessorModule.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("test input")] });
		expect(result.stepCount).toBe(3);
		expect(result.log).toHaveLength(3);
		expect(result.messages.at(-1).content).toContain("3");
	});
});
