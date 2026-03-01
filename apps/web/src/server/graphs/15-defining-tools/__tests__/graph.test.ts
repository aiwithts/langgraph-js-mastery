import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "The answer is 42", tool_calls: [] }),
		bindTools: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ content: "The answer is 42", tool_calls: [] }),
		}),
	}),
}));

describe("Custom Tool Agent", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph15DefiningTools.config.id).toBe("15-defining-tools");
		expect(mod.graph15DefiningTools.config.name).toBe("Custom Tool Agent");
		expect(mod.graph15DefiningTools.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 15 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph15DefiningTools.createGraph();
		expect(graph).toBeDefined();
	});

	it("invokes agent with tools and returns a response", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph15DefiningTools.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("What is 6 * 7?")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
