import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue(new AIMessage("Agent healthy. Deployment check passed.")),
	}),
}));

describe("Application Structure & Deployment", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph42ApplicationStructure.config.id).toBe("42-application-structure");
		expect(mod.graph42ApplicationStructure.config.name).toBe(
			"Application Structure & Deployment",
		);
		expect(mod.graph42ApplicationStructure.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph", async () => {
		const mod = await import("../index");
		const graph = await mod.graph42ApplicationStructure.createGraph();
		expect(graph).toBeDefined();
	});

	it("basic invocation succeeds and returns an AI response", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph42ApplicationStructure.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Is the agent healthy?")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
		const lastMessage = result.messages.at(-1);
		expect(lastMessage).toBeInstanceOf(AIMessage);
	});
});
