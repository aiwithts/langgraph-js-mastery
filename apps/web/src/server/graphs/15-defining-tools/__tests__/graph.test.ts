import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "The answer is 42", tool_calls: [] }),
		bindTools: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ content: "The answer is 42", tool_calls: [] }),
		}),
	}),
}));

describe("Lesson 15: My Tool Kit", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn15MyToolKit.config.id).toBe("learn-15-my-tool-kit");
		expect(mod.learn15MyToolKit.config.name).toBe("My Tool Kit");
		expect(mod.learn15MyToolKit.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 15 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn15MyToolKit.createGraph();
		expect(graph).toBeDefined();
	});

	it("invokes agent with tools and returns a response", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn15MyToolKit.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("What is 6 * 7?")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
