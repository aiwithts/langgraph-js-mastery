import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Production-quality response" }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ taskType: "reason" }),
		}),
	}),
}));

describe("Lesson 36: My Production Agent", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn36MyProductionAgent.config.id).toBe("learn-36-my-production-agent");
		expect(mod.learn36MyProductionAgent.config.name).toBe("My Production Agent");
		expect(mod.learn36MyProductionAgent.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 36 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn36MyProductionAgent.createGraph();
		expect(graph).toBeDefined();
	});

	it("routes requests to appropriate models based on task type", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn36MyProductionAgent.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Explain the philosophical implications of AI consciousness")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.taskType).toBeTruthy();
	});
});
