import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Here's the information card I rendered for you." }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ componentType: "InfoCard", data: { title: "Test" } }),
		}),
	}),
}));

describe("Lesson 26: My UI Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn26MyUiAssistant.config.id).toBe("learn-26-my-ui-assistant");
		expect(mod.learn26MyUiAssistant.config.name).toBe("My UI Assistant");
		expect(mod.learn26MyUiAssistant.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 26 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn26MyUiAssistant.createGraph();
		expect(graph).toBeDefined();
	});

	it("dispatches a UI component and returns a text message", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const uiEvents: unknown[] = [];
		const mod = await import("../index");
		const graph = mod.learn26MyUiAssistant.createGraph();
		const result = await graph.invoke(
			{ messages: [new HumanMessage("Show me an info card about LangGraph")] },
			{ writer: (event: unknown) => uiEvents.push(event) },
		);
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
