import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Here's the information card I rendered for you." }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ componentType: "InfoCard", data: { title: "Test" } }),
		}),
	}),
}));

describe("Data Display Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph26GenerativeUiFundamentals.config.id).toBe("26-generative-ui-fundamentals");
		expect(mod.graph26GenerativeUiFundamentals.config.name).toBe("Data Display Assistant");
		expect(mod.graph26GenerativeUiFundamentals.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 26 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph26GenerativeUiFundamentals.createGraph();
		expect(graph).toBeDefined();
	});

	it("dispatches a UI component and returns a text message", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph26GenerativeUiFundamentals.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Show me an info card about LangGraph")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
