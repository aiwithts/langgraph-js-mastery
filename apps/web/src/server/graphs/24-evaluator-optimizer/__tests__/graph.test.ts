import { describe, expect, it, vi } from "vitest";

let evalCount = 0;
vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "function add(a, b) { return a + b; }" }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockImplementation(() => {
				evalCount++;
				return Promise.resolve({
					score: evalCount < 2 ? 6 : 9,
					evaluation: "Good solution, needs better error handling",
					improvements: ["Add type checks", "Handle edge cases"],
				});
			}),
		}),
	}),
}));

describe("Lesson 24: My Code Improver", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn24MyCodeImprover.config.id).toBe("learn-24-my-code-improver");
		expect(mod.learn24MyCodeImprover.config.name).toBe("My Code Improver");
		expect(mod.learn24MyCodeImprover.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 24 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn24MyCodeImprover.createGraph();
		expect(graph).toBeDefined();
	});

	it("iterates to improve the solution above the quality threshold", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn24MyCodeImprover.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Write a function to add two numbers")],
		});
		expect(result.solution).toBeTruthy();
		expect(result.score).toBeGreaterThanOrEqual(8);
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
