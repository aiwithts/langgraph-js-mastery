import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue(new AIMessage("mocked template response")),
	}),
}));

describe("Lesson 05: Specialty Template Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph05PromptTemplates.config.id).toBe("05-prompt-templates");
		expect(mod.graph05PromptTemplates.config.name).toBe("Specialty Template Assistant");
		expect(mod.graph05PromptTemplates.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 05 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph05PromptTemplates.createGraph();
		expect(graph).toBeDefined();
	});

	it("responds to a message with the specialty context", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph05PromptTemplates.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Explain TypeScript generics")],
			specialty: "TypeScript",
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
