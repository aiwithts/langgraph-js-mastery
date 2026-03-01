import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Processed results summary" }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ items: ["apple", "banana", "cherry"] }),
		}),
	}),
}));

describe("Parallel Map-Reduce Processor", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph22ParallelPatterns.config.id).toBe("22-parallel-patterns");
		expect(mod.graph22ParallelPatterns.config.name).toBe("Parallel Map-Reduce Processor");
		expect(mod.graph22ParallelPatterns.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 22 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph22ParallelPatterns.createGraph();
		expect(graph).toBeDefined();
	});

	it("fans out to process items in parallel and aggregates results", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph22ParallelPatterns.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Process these items: apple, banana, cherry")],
		});
		expect(result.results.length).toBeGreaterThan(0);
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
