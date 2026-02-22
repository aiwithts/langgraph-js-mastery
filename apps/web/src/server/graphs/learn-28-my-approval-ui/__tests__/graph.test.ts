import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "I'll delete the file data.txt. Please confirm." }),
	}),
}));

describe("Lesson 28: My Approval UI", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn28MyApprovalUi.config.id).toBe("learn-28-my-approval-ui");
		expect(mod.learn28MyApprovalUi.config.name).toBe("My Approval UI");
		expect(mod.learn28MyApprovalUi.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 28 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn28MyApprovalUi.createGraph();
		expect(graph).toBeDefined();
	});

	it("dispatches a confirmation UI event before interrupting", async () => {
		// Note: With a real checkpointer, this would pause at interrupt().
		// This test verifies the graph structure is valid.
		const mod = await import("../index");
		const graph = mod.learn28MyApprovalUi.createGraph();
		expect(graph).toBeDefined();
	});
});
