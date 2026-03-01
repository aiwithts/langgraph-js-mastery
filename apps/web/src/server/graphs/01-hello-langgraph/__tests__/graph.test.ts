import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "mocked response" }),
	}),
}));

describe("Lesson 01: Hello LangGraph", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph01HelloLanggraph.config.id).toBe("01-hello-langgraph");
		expect(mod.graph01HelloLanggraph.config.name).toBe("My First Graph");
		expect(mod.graph01HelloLanggraph.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 01 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.graph01HelloLanggraph.createGraph();
		expect(graph).toBeDefined();
	});

	it("processes a message and returns a greeting", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.graph01HelloLanggraph.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.messages.at(-1).content).toContain("Hello!");
	});
});
