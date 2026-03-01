import { describe, expect, it, vi } from "vitest";

// Create a controllable mock LLM
const mockLLMInvoke = vi.fn().mockResolvedValue({ content: "Tested response from mock LLM" });

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({ invoke: mockLLMInvoke }),
}));

describe("Lesson 35: Testable Agent", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph35Testing.config.id).toBe("35-testing");
		expect(mod.graph35Testing.config.name).toBe("Testable Agent");
		expect(mod.graph35Testing.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 35 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph35Testing.createGraph();
		expect(graph).toBeDefined();
	});

	it("uses injected LLM and returns a validated response", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph35Testing.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		expect(result.messages.length).toBeGreaterThan(1);
		// Verify the mock was called (not a real API)
		expect(mockLLMInvoke).toHaveBeenCalled();
	});

	it("validates output quality", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		// Test with empty response (should trigger validation)
		mockLLMInvoke.mockResolvedValueOnce({ content: "" });
		const mod = await import("../index");
		const graph = await mod.graph35Testing.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		// After implementation: result.messages.at(-1).content should be a fallback
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
