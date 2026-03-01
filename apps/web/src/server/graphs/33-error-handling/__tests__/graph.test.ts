import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Resilient response after retry" }),
	}),
}));

describe("Resilient Chat Agent", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph33ErrorHandling.config.id).toBe("33-error-handling");
		expect(mod.graph33ErrorHandling.config.name).toBe("Resilient Chat Agent");
		expect(mod.graph33ErrorHandling.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 33 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph33ErrorHandling.createGraph();
		expect(graph).toBeDefined();
	});

	it("handles a successful request", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph33ErrorHandling.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.lastError).toBeNull();
	});
});
