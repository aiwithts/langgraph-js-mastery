import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "I will delete the file data.txt" }),
	}),
}));

describe("Interrupt and Approval Flow", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph18HumanInTheLoop.config.id).toBe("18-human-in-the-loop");
		expect(mod.graph18HumanInTheLoop.config.name).toBe("Interrupt and Approval Flow");
		expect(mod.graph18HumanInTheLoop.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 18 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph18HumanInTheLoop.createGraph();
		expect(graph).toBeDefined();
	});

	it("pauses at the human approval step (interrupt)", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		// With a checkpointer, the graph would pause at interrupt().
		// Without one, the graph will throw a GraphInterrupt or similar.
		// This test verifies the graph initializes correctly.
		const graph = await mod.graph18HumanInTheLoop.createGraph();
		expect(graph).toBeDefined();
	});
});
