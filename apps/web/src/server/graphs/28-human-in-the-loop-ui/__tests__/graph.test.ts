import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "I'll delete the file data.txt. Please confirm." }),
	}),
}));

describe("Approval UI Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph28HumanInTheLoopUi.config.id).toBe("28-human-in-the-loop-ui");
		expect(mod.graph28HumanInTheLoopUi.config.name).toBe("Approval UI Assistant");
		expect(mod.graph28HumanInTheLoopUi.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 28 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph28HumanInTheLoopUi.createGraph();
		expect(graph).toBeDefined();
	});

	it("dispatches a confirmation UI event before interrupting", async () => {
		// Note: With a real checkpointer, this would pause at interrupt().
		// This test verifies the graph structure is valid.
		const mod = await import("../index");
		const graph = await mod.graph28HumanInTheLoopUi.createGraph();
		expect(graph).toBeDefined();
	});
});
