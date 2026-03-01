import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "I can see a cat in the image." }),
	}),
}));

describe("Vision Analysis Agent", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph17Multimodal.config.id).toBe("17-multimodal");
		expect(mod.graph17Multimodal.config.name).toBe("Vision Analysis Agent");
		expect(mod.graph17Multimodal.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 17 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph17Multimodal.createGraph();
		expect(graph).toBeDefined();
	});

	it("processes a text message about an image", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph17Multimodal.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("What do you see in this image?")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
