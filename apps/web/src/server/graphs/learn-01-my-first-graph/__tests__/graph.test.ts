import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "mocked response" }),
	}),
}));

describe("Lesson 01: My First Graph", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn01MyFirstGraphModule.config.id).toBe("my-first-graph");
		expect(mod.learn01MyFirstGraphModule.config.name).toBe("My First Graph");
		expect(mod.learn01MyFirstGraphModule.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 01 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn01MyFirstGraphModule.createGraph();
		expect(graph).toBeDefined();
	});

	it("processes a message and returns a greeting", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn01MyFirstGraphModule.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.messages.at(-1).content).toContain("Hello!");
	});
});
