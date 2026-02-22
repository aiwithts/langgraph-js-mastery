import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "summary or chat response" }),
	}),
}));

describe("Lesson 10: My Context Manager", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn10MyContextManager.config.id).toBe("my-context-manager");
		expect(mod.learn10MyContextManager.createGraph).toBeInstanceOf(Function);
	});

	it("exports shouldSummarize as a named export", async () => {
		const mod = await import("../graph");
		expect(mod.shouldSummarize).toBeInstanceOf(Function);
		expect(mod.shouldSummarize({ messages: new Array(11) })).toBe("summarize");
		expect(mod.shouldSummarize({ messages: new Array(5) })).toBe("chat");
	});

	it("creates a compilable graph (complete Lesson 10 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn10MyContextManager.createGraph();
		expect(graph).toBeDefined();
	});

	it("handles a short conversation without summarizing", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn10MyContextManager.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
