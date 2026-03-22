import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue(new AIMessage("extraction result")),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ contacts: [], events: [], actionItems: [] }),
		}),
	}),
}));

describe("Lesson 08: Data Extractor", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph08StructuredOutput.config.id).toBe("08-structured-output");
		expect(mod.graph08StructuredOutput.config.name).toBe("Data Extractor");
		expect(mod.graph08StructuredOutput.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 08 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph08StructuredOutput.createGraph();
		expect(graph).toBeDefined();
	});

	it("extracts structured data from text", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph08StructuredOutput.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Contact John at john@example.com")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});

	it("shows fallback message when nothing can be extracted (all arrays empty)", async () => {
		// The top-level mock returns { contacts: [], events: [], actionItems: [] } for all invocations,
		// so this test verifies the formatNode's empty-guard branch is exercised.
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph08StructuredOutput.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("The weather is nice today")],
		});
		const lastMessage = result.messages.at(-1);
		expect(lastMessage?.content).toContain("No data could be extracted.");
	});
});
