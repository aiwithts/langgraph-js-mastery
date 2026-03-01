import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "mocked template response" }),
	}),
}));

describe("Lesson 04: Specialty Template Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph04PromptTemplates.config.id).toBe("04-prompt-templates");
		expect(mod.graph04PromptTemplates.config.name).toBe("Specialty Template Assistant");
		expect(mod.graph04PromptTemplates.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 04 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph04PromptTemplates.createGraph();
		expect(graph).toBeDefined();
	});

	it("responds to a message with the specialty context", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph04PromptTemplates.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Explain TypeScript generics")],
			specialty: "TypeScript",
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
