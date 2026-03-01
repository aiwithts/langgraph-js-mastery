import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "mocked template response" }),
	}),
}));

describe("Lesson 04: My Specialty Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn04MyTemplateAssistant.config.id).toBe("my-specialty-assistant");
		expect(mod.learn04MyTemplateAssistant.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 04 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn04MyTemplateAssistant.createGraph();
		expect(graph).toBeDefined();
	});

	it("responds to a message with the specialty context", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn04MyTemplateAssistant.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Explain TypeScript generics")],
			speciality: "TypeScript",
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
