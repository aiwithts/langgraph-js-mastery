import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi
			.fn()
			.mockResolvedValueOnce(new AIMessage("Build an AI-powered code review tool"))
			.mockResolvedValueOnce(new AIMessage("Clean, minimal interface with inline suggestions"))
			.mockResolvedValueOnce(new AIMessage("TypeScript API with LangGraph integration"))
			.mockResolvedValueOnce(new AIMessage("Target senior developers seeking productivity gains"))
			.mockResolvedValue(new AIMessage("Final product brief combining all perspectives")),
	}),
}));

describe("Director and Team Leads", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph26HierarchicalTeams.config.id).toBe("25-hierarchical-teams");
		expect(mod.graph26HierarchicalTeams.config.name).toBe("Director and Team Leads");
		expect(mod.graph26HierarchicalTeams.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 25 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph26HierarchicalTeams.createGraph();
		expect(graph).toBeDefined();
	});

	it("coordinates team leads and produces a final product brief", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph26HierarchicalTeams.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Build a new AI-powered development tool")],
		});
		expect(result.strategicGoal).toBeTruthy();
		expect(result.designBrief).toBeTruthy();
		expect(result.engineeringPlan).toBeTruthy();
		expect(result.finalReport).toBeTruthy();
	});
});
