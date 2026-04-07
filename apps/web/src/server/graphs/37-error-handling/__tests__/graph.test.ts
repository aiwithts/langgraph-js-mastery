import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue(new AIMessage("Resilient response after retry")),
	}),
}));

describe("Resilient Chat Agent", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph37ErrorHandling.config.id).toBe("37-error-handling");
		expect(mod.graph37ErrorHandling.config.name).toBe("Resilient Chat Agent");
		expect(mod.graph37ErrorHandling.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 38 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph37ErrorHandling.createGraph();
		expect(graph).toBeDefined();
	});

	it("handles a successful request", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph37ErrorHandling.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.lastError).toBeNull();
	});
});
