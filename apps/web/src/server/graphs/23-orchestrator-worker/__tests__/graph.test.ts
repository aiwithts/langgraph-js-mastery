import { describe, expect, it, vi } from "vitest";

let callCount = 0;
vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Final research report..." }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockImplementation(() => {
				callCount++;
				return Promise.resolve({ next: callCount === 1 ? "webSearcher" : "FINISH" });
			}),
		}),
	}),
}));

describe("Lesson 23: My Research Team", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn23MyResearchTeam.config.id).toBe("learn-23-my-research-team");
		expect(mod.learn23MyResearchTeam.config.name).toBe("My Research Team");
		expect(mod.learn23MyResearchTeam.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 23 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn23MyResearchTeam.createGraph();
		expect(graph).toBeDefined();
	});

	it("supervisor routes to workers and produces a final report", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn23MyResearchTeam.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Research the history of LangGraph")],
		});
		expect(result.findings.length).toBeGreaterThan(0);
		expect(result.report).toBeTruthy();
	});
});
