import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue(new AIMessage("This is about TypeScript concise summary")),
	}),
}));

describe("Modular Subgraph Composition", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph22Subgraphs.config.id).toBe("22-subgraphs");
		expect(mod.graph22Subgraphs.config.name).toBe("Modular Subgraph Composition");
		expect(mod.graph22Subgraphs.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph", async () => {
		const mod = await import("../index");
		const graph = await mod.graph22Subgraphs.createGraph();
		expect(graph).toBeDefined();
	});

	it("orchestrates a subgraph to process the input", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph22Subgraphs.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Summarize the benefits of TypeScript")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.summary).toBeTruthy();
	});
});
