import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi
			.fn()
			.mockResolvedValueOnce({ content: "Build an AI-powered code review tool" })
			.mockResolvedValueOnce({ content: "Clean, minimal interface with inline suggestions" })
			.mockResolvedValueOnce({ content: "TypeScript API with LangGraph integration" })
			.mockResolvedValueOnce({ content: "Target senior developers seeking productivity gains" })
			.mockResolvedValue({ content: "Final product brief combining all perspectives" }),
	}),
}));

describe("Director and Team Leads", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph25HierarchicalTeams.config.id).toBe("25-hierarchical-teams");
		expect(mod.graph25HierarchicalTeams.config.name).toBe("Director and Team Leads");
		expect(mod.graph25HierarchicalTeams.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 25 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph25HierarchicalTeams.createGraph();
		expect(graph).toBeDefined();
	});

	it("coordinates team leads and produces a final product brief", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph25HierarchicalTeams.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Build a new AI-powered development tool")],
		});
		expect(result.strategicGoal).toBeTruthy();
		expect(result.designBrief).toBeTruthy();
		expect(result.engineeringPlan).toBeTruthy();
		expect(result.finalReport).toBeTruthy();
	});
});
