import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Please select an asset to buy." }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ intent: "buy" }),
		}),
	}),
}));

describe("Multi-Step Interactive Wizard", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph31InteractiveIntents.config.id).toBe("31-interactive-intents");
		expect(mod.graph31InteractiveIntents.config.name).toBe("Multi-Step Interactive Wizard");
		expect(mod.graph31InteractiveIntents.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 31 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph31InteractiveIntents.createGraph();
		expect(graph).toBeDefined();
	});

	it("detects buy intent and dispatches asset selection UI", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph31InteractiveIntents.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("I want to buy some Bitcoin")],
		});
		expect(result.intent).toBe("buy");
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
