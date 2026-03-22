import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue(new AIMessage("**Variables**\n\nFormatted response...")),
	}),
}));

describe("Lesson 06: Few-Shot Formatting Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph06FewShotPrompting.config.id).toBe("06-few-shot-prompting");
		expect(mod.graph06FewShotPrompting.config.name).toBe("Few-Shot Formatting Assistant");
		expect(mod.graph06FewShotPrompting.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 06 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph06FewShotPrompting.createGraph();
		expect(graph).toBeDefined();
	});

	it("returns a consistently formatted response", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph06FewShotPrompting.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("What is a variable?")] });
		expect(result.messages.length).toBeGreaterThan(1);
		expect(result.messages.at(-1).content).toContain("**");
	});
});
