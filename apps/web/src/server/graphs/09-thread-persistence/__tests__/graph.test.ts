import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "#1 Hello! Nice to meet you." }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ facts: [] }),
		}),
	}),
}));

describe("Persistent Memory Tester", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph09ThreadPersistence.config.id).toBe("09-thread-persistence");
		expect(mod.graph09ThreadPersistence.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 09 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph09ThreadPersistence.createGraph();
		expect(graph).toBeDefined();
	});

	it("extracts facts and responds with message numbering", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph09ThreadPersistence.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Hi! I'm Alice and I love TypeScript.")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.messageCount).toBe(1);
	});
});
