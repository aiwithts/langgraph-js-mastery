import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Current weather in London: Partly Cloudy, 18°C" }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ location: "London" }),
		}),
	}),
}));

describe("Lesson 30: My Weather Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn30MyWeatherAssistant.config.id).toBe("learn-30-my-weather-assistant");
		expect(mod.learn30MyWeatherAssistant.config.name).toBe("My Weather Assistant");
		expect(mod.learn30MyWeatherAssistant.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 30 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn30MyWeatherAssistant.createGraph();
		expect(graph).toBeDefined();
	});

	it("fetches weather data and dispatches a WeatherCard UI event", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const uiEvents: unknown[] = [];
		const mod = await import("../index");
		const graph = mod.learn30MyWeatherAssistant.createGraph();
		const result = await graph.invoke(
			{ messages: [new HumanMessage("What's the weather in London?")] },
			{ writer: (event: unknown) => uiEvents.push(event) },
		);
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
