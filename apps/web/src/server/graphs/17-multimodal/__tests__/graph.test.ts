import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "I can see a cat in the image." }),
	}),
}));

describe("Lesson 17: My Vision Agent", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn17MyVisionAgent.config.id).toBe("learn-17-my-vision-agent");
		expect(mod.learn17MyVisionAgent.config.name).toBe("My Vision Agent");
		expect(mod.learn17MyVisionAgent.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 17 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn17MyVisionAgent.createGraph();
		expect(graph).toBeDefined();
	});

	it("processes a text message about an image", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn17MyVisionAgent.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("What do you see in this image?")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
