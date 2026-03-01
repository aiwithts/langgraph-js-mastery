import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "mocked mode response" }),
	}),
}));

describe("Lesson 06: My Multi-Mode Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn06MyMultiModeAssistant.config.id).toBe("my-multi-mode-assistant");
		expect(mod.learn06MyMultiModeAssistant.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 06 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn06MyMultiModeAssistant.createGraph();
		expect(graph).toBeDefined();
	});

	it("routes code questions to code mode", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn06MyMultiModeAssistant.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Write a TypeScript function to sort an array")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
