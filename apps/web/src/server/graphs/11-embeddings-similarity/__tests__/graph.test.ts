import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "**Formatted response**\n\nWith examples..." }),
	}),
}));

vi.mock("@langchain/openai", () => ({
	OpenAIEmbeddings: vi.fn().mockReturnValue({
		embedDocuments: vi.fn().mockResolvedValue([[0.1, 0.2], [0.3, 0.4], [0.5, 0.6], [0.7, 0.8]]),
		embedQuery: vi.fn().mockResolvedValue([0.15, 0.25]),
	}),
}));

describe("Semantic Example Selector", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph11EmbeddingsSimilarity.config.id).toBe("11-embeddings-similarity");
		expect(mod.graph11EmbeddingsSimilarity.config.name).toBe("Semantic Example Selector");
		expect(mod.graph11EmbeddingsSimilarity.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 11 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph11EmbeddingsSimilarity.createGraph();
		expect(graph).toBeDefined();
	});

	it("selects relevant examples and responds with proper formatting", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph11EmbeddingsSimilarity.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("What is recursion?")] });
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.selectedExamples).toHaveLength(2);
	});
});
