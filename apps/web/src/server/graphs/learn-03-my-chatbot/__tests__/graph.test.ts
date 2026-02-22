import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "mocked chatbot response" }),
	}),
}));

describe("Lesson 03: My Chatbot", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn03MyChatbot.config.id).toBe("my-chatbot");
		expect(mod.learn03MyChatbot.config.name).toBe("My Chatbot");
		expect(mod.learn03MyChatbot.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 03 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn03MyChatbot.createGraph();
		expect(graph).toBeDefined();
	});

	it("processes a message and returns an AI response", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn03MyChatbot.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
