import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "I can help you with your billing issue." }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ category: "billing", confidence: 0.9, reasoning: "payment" }),
		}),
	}),
}));

describe("Intent Classifier and Router", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph20Routing.config.id).toBe("20-routing");
		expect(mod.graph20Routing.config.name).toBe("Intent Classifier and Router");
		expect(mod.graph20Routing.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 20 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph20Routing.createGraph();
		expect(graph).toBeDefined();
	});

	it("classifies and routes a billing question to the billing handler", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph20Routing.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("I was double charged on my credit card")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.category).toBe("billing");
	});
});
