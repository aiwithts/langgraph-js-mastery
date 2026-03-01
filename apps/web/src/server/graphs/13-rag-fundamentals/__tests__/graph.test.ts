import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Based on the context, StateGraph is..." }),
	}),
}));

vi.mock("../vector-store", () => ({
	getRetriever: vi.fn().mockResolvedValue({
		invoke: vi.fn().mockResolvedValue([
			{ pageContent: "StateGraph is the core class...", metadata: { topic: "core" } },
		]),
	}),
}));

describe("Knowledge-Augmented RAG Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph13RagFundamentals.config.id).toBe("13-rag-fundamentals");
		expect(mod.graph13RagFundamentals.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 13 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph13RagFundamentals.createGraph();
		expect(graph).toBeDefined();
	});

	it("retrieves context and generates a grounded answer", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph13RagFundamentals.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("What is a StateGraph?")] });
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.context).toBeTruthy();
	});
});
