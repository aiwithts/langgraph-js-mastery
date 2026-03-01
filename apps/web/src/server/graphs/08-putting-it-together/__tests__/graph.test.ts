import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "mocked response" }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ mode: "explain", confidence: 0.9, reasoning: "question" }),
		}),
	}),
}));

describe("Lesson 08: Swiss Army Knife Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph08PuttingItTogether.config.id).toBe("08-putting-it-together");
		expect(mod.graph08PuttingItTogether.config.name).toBe("Swiss Army Knife Assistant");
		expect(mod.graph08PuttingItTogether.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 08 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph08PuttingItTogether.createGraph();
		expect(graph).toBeDefined();
	});

	it("classifies and routes a question to explain mode", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph08PuttingItTogether.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("What is a closure?")] });
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
