import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "#1 Hello! Nice to meet you." }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ facts: [] }),
		}),
	}),
}));

describe("Lesson 09: My Memory Tester", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn09MyMemoryTester.config.id).toBe("my-memory-tester");
		expect(mod.learn09MyMemoryTester.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 09 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn09MyMemoryTester.createGraph();
		expect(graph).toBeDefined();
	});

	it("extracts facts and responds with message numbering", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn09MyMemoryTester.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Hi! I'm Alice and I love TypeScript.")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.messageCount).toBe(1);
	});
});
