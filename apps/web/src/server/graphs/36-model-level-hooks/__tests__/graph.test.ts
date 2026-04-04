import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi
			.fn()
			.mockResolvedValue(new AIMessage("Here is a safe and helpful response to your question.")),
	}),
}));

describe("Model-Level Hooks", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph36ModelLevelHooks.config.id).toBe("36-model-level-hooks");
		expect(mod.graph36ModelLevelHooks.config.name).toBe("Model-Level Hooks");
		expect(mod.graph36ModelLevelHooks.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 37 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph36ModelLevelHooks.createGraph();
		expect(graph).toBeDefined();
	});

	it("invokes and returns an AI response", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph36ModelLevelHooks.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Explain TypeScript decorators.")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
		const lastMessage = result.messages.at(-1);
		expect(lastMessage).toBeInstanceOf(AIMessage);
	});
});
