import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Using hybrid retrieval, I found..." }),
	}),
}));

vi.mock("../vector-store", () => ({
	getRetriever: vi.fn().mockResolvedValue({
		invoke: vi.fn().mockResolvedValue([
			{ pageContent: "Nodes are functions that process state...", metadata: { topic: "nodes" } },
			{ pageContent: "Edges connect nodes...", metadata: { topic: "edges" } },
		]),
	}),
}));

describe("Hybrid Retrieval RAG Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph14AdvancedRag.config.id).toBe("14-advanced-rag");
		expect(mod.graph14AdvancedRag.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 14 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph14AdvancedRag.createGraph();
		expect(graph).toBeDefined();
	});

	it("uses hybrid retrieval to answer questions", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph14AdvancedRag.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("How do nodes work?")] });
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.context).toBeTruthy();
	});
});
