import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi
			.fn()
			.mockResolvedValue(
				new AIMessage("I can help with your billing question. Your account is in good standing."),
			),
	}),
}));

describe("Agent Swarm & Handoff", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph27SwarmHandoff.config.id).toBe("27-swarm-handoff");
		expect(mod.graph27SwarmHandoff.config.name).toBe("Agent Swarm & Handoff");
		expect(mod.graph27SwarmHandoff.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 28 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph27SwarmHandoff.createGraph();
		expect(graph).toBeDefined();
	});

	it("invokes and returns an AI response", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph27SwarmHandoff.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("I have a question about my bill.")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
		const lastMessage = result.messages.at(-1);
		expect(lastMessage).toBeInstanceOf(AIMessage);
	});
});
