import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "The answer is 42", tool_calls: [] }),
		bindTools: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ content: "The answer is 42", tool_calls: [] }),
		}),
	}),
}));

vi.mock("@langchain/mcp-adapters", () => ({
	MultiServerMCPClient: vi.fn().mockReturnValue({
		initializeConnections: vi.fn().mockResolvedValue(undefined),
		getTools: vi.fn().mockReturnValue([]),
	}),
}));

describe("Lesson 16: ReAct Agent", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn16ReactAgent.config.id).toBe("learn-16-react-agent");
		expect(mod.learn16ReactAgent.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 16 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.learn16ReactAgent.createGraph();
		expect(graph).toBeDefined();
	});

	it("processes a question using the ReAct loop", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.learn16ReactAgent.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("What is the population of Tokyo?")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
