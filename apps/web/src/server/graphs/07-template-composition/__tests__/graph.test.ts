import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue(new AIMessage("mocked mode response")),
	}),
}));

describe("Lesson 07: Multi-Mode Prompt Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph07TemplateComposition.config.id).toBe("07-template-composition");
		expect(mod.graph07TemplateComposition.config.name).toBe("Multi-Mode Prompt Assistant");
		expect(mod.graph07TemplateComposition.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 07 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph07TemplateComposition.createGraph();
		expect(graph).toBeDefined();
	});

	it("routes code questions to code mode", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph07TemplateComposition.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Write a TypeScript function to sort an array")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
