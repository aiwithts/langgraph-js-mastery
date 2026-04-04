import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue(new AIMessage("Current weather in London: Partly Cloudy, 18°C")),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ location: "London" }),
		}),
	}),
}));

describe("Weather Display Intent Agent", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph33DisplayIntents.config.id).toBe("30-display-intents");
		expect(mod.graph33DisplayIntents.config.name).toBe("Weather Display Intent Agent");
		expect(mod.graph33DisplayIntents.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 30 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph33DisplayIntents.createGraph();
		expect(graph).toBeDefined();
	});

	it("fetches weather data and dispatches a WeatherCard UI event", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph33DisplayIntents.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("What's the weather in London?")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
