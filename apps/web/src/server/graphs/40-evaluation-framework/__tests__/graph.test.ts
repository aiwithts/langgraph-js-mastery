import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi
			.fn()
			.mockResolvedValue(
				new AIMessage(
					'{"category":"billing","response":"I can help you with your billing question."}',
				),
			),
	}),
}));

describe("Evaluation Framework", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph40EvaluationFramework.config.id).toBe("40-evaluation-framework");
		expect(mod.graph40EvaluationFramework.config.name).toBe("Evaluation Framework");
		expect(mod.graph40EvaluationFramework.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 41 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph40EvaluationFramework.createGraph();
		expect(graph).toBeDefined();
	});

	it("routes a billing question to the billing category", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph40EvaluationFramework.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Why was I charged twice this month?")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.category).toBe("billing");
	});
});
