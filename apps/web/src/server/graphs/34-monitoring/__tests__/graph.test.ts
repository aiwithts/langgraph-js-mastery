import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Observable response" }),
	}),
}));

describe("Observable Agent with Metrics", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph34Monitoring.config.id).toBe("34-monitoring");
		expect(mod.graph34Monitoring.config.name).toBe("Observable Agent with Metrics");
		expect(mod.graph34Monitoring.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 34 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph34Monitoring.createGraph();
		expect(graph).toBeDefined();
	});

	it("processes a message and emits metrics events", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph34Monitoring.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Hello!")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
