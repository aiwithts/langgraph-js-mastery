import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "summary or chat response" }),
	}),
}));

describe("Conversation Summarization Chatbot", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph10ContextManagement.config.id).toBe("10-context-management");
		expect(mod.graph10ContextManagement.createGraph).toBeInstanceOf(Function);
	});

	it("exports shouldSummarize as a named export", async () => {
		const mod = await import("../graph");
		expect(mod.shouldSummarize).toBeInstanceOf(Function);
		expect(mod.shouldSummarize({ messages: new Array(11) })).toBe("summarize");
		expect(mod.shouldSummarize({ messages: new Array(5) })).toBe("chat");
	});

	it("creates a compilable graph (complete Lesson 10 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph10ContextManagement.createGraph();
		expect(graph).toBeDefined();
	});

	it("handles a short conversation without summarizing", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph10ContextManagement.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
