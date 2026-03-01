import { describe, expect, it, vi } from "vitest";

const invokeMock = vi
	.fn()
	.mockResolvedValueOnce({ content: "Draft: TypeScript is a typed superset..." })
	.mockResolvedValueOnce({ content: "Critique: Needs more examples, clearer intro..." })
	.mockResolvedValueOnce({ content: "Refined: TypeScript is a strongly typed..." });

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({ invoke: invokeMock }),
}));

describe("Draft Critique Refine Pipeline", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph19PromptChaining.config.id).toBe("19-prompt-chaining");
		expect(mod.graph19PromptChaining.config.name).toBe("Draft Critique Refine Pipeline");
		expect(mod.graph19PromptChaining.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 19 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph19PromptChaining.createGraph();
		expect(graph).toBeDefined();
	});

	it("runs draft → critique → refine pipeline and produces a final message", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph19PromptChaining.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Explain what TypeScript is")],
		});
		expect(result.draft).toBeTruthy();
		expect(result.critique).toBeTruthy();
		expect(result.refined).toBeTruthy();
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
