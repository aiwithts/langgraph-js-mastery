import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "**Variables**\n\nFormatted response..." }),
	}),
}));

describe("Lesson 05: My Formatting Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn05MyFormattingAssistant.config.id).toBe("my-formatting-assistant");
		expect(mod.learn05MyFormattingAssistant.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 05 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn05MyFormattingAssistant.createGraph();
		expect(graph).toBeDefined();
	});

	it("returns a consistently formatted response", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn05MyFormattingAssistant.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("What is a variable?")] });
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.messages.at(-1).content).toContain("**");
	});
});
