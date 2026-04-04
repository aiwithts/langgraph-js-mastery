import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue(new AIMessage("Content flagged for human review.")),
	}),
}));

describe("Advanced Routing with Command", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph21AdvancedRoutingCommand.config.id).toBe("21-advanced-routing-command");
		expect(mod.graph21AdvancedRoutingCommand.config.name).toBe("Advanced Routing with Command");
		expect(mod.graph21AdvancedRoutingCommand.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 22 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph21AdvancedRoutingCommand.createGraph();
		expect(graph).toBeDefined();
	});

	it("invokes and returns at least one AI message", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph21AdvancedRoutingCommand.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("This message contains some content to moderate.")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
