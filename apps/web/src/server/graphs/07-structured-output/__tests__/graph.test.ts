import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "extraction result" }),
		withStructuredOutput: vi.fn().mockReturnValue({
			invoke: vi.fn().mockResolvedValue({ contacts: [], events: [], actionItems: [] }),
		}),
	}),
}));

describe("Lesson 07: Data Extractor", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph07StructuredOutput.config.id).toBe("07-structured-output");
		expect(mod.graph07StructuredOutput.config.name).toBe("Data Extractor");
		expect(mod.graph07StructuredOutput.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 07 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph07StructuredOutput.createGraph();
		expect(graph).toBeDefined();
	});

	it("extracts structured data from text", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph07StructuredOutput.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Contact John at john@example.com")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
