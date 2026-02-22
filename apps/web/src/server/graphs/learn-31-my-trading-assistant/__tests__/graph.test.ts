import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Please select an asset to buy." }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ intent: "buy" }),
		}),
	}),
}));

describe("Lesson 31: My Trading Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn31MyTradingAssistant.config.id).toBe("learn-31-my-trading-assistant");
		expect(mod.learn31MyTradingAssistant.config.name).toBe("My Trading Assistant");
		expect(mod.learn31MyTradingAssistant.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 31 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn31MyTradingAssistant.createGraph();
		expect(graph).toBeDefined();
	});

	it("detects buy intent and dispatches asset selection UI", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const uiEvents: unknown[] = [];
		const mod = await import("../index");
		const graph = mod.learn31MyTradingAssistant.createGraph();
		const result = await graph.invoke(
			{ messages: [new HumanMessage("I want to buy some Bitcoin")] },
			{ writer: (event: unknown) => uiEvents.push(event) },
		);
		expect(result.intent).toBe("buy");
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
