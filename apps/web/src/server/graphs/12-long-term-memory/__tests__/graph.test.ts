import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Hello! I remember you mentioned..." }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ memories: [] }),
		}),
	}),
}));

vi.mock("@langchain/openai", () => ({
	OpenAIEmbeddings: vi.fn().mockReturnValue({
		embedDocuments: vi.fn().mockResolvedValue([[0.1, 0.2]]),
		embedQuery: vi.fn().mockResolvedValue([0.1, 0.2]),
	}),
}));

describe("Memory-Enhanced Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph12LongTermMemory.config.id).toBe("12-long-term-memory");
		expect(mod.graph12LongTermMemory.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 12 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph12LongTermMemory.createGraph();
		expect(graph).toBeDefined();
	});

	it("stores and retrieves memories across conversations", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph12LongTermMemory.createGraph();
		const result = await graph.invoke(
			{ messages: [new HumanMessage("My name is Alice and I love TypeScript")] },
			{ configurable: { user_id: "test-user" } },
		);
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
