import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Summary: This is about TypeScript..." }),
	}),
}));

describe("Lesson 21: My Composed System", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn21MyComposedSystem.config.id).toBe("learn-21-my-composed-system");
		expect(mod.learn21MyComposedSystem.config.name).toBe("My Composed System");
		expect(mod.learn21MyComposedSystem.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 21 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn21MyComposedSystem.createGraph();
		expect(graph).toBeDefined();
	});

	it("orchestrates a subgraph to process the input", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn21MyComposedSystem.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Summarize the benefits of TypeScript")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.summary).toBeTruthy();
	});
});
