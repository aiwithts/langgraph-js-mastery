import { AIMessage } from "@langchain/core/messages";
import { createLLM } from "../../../lib/llm";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue(new AIMessage("mocked chatbot response")),
	}),
}));

describe("Lesson 04: Multi-Turn Conversations", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph04MultiTurnConversations.config.id).toBe("04-multi-turn-conversations");
		expect(mod.graph04MultiTurnConversations.config.name).toBe("LLM Chatbot with History");
		expect(mod.graph04MultiTurnConversations.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph", async () => {
		const mod = await import("../index");
		const graph = await mod.graph04MultiTurnConversations.createGraph();
		expect(graph).toBeDefined();
	});

	it("processes a message and returns an AI response", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph04MultiTurnConversations.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		expect(result.messages.length).toBeGreaterThan(1);
		// SystemMessage must be prepended first so the LLM always sees the personality prompt
		const mockLlmInvoke = vi.mocked(createLLM).mock.results.at(-1)!.value.invoke as ReturnType<typeof vi.fn>;
		const [messages, config] = mockLlmInvoke.mock.calls.at(-1)!;
		expect(messages[0]._getType()).toBe("system");
		// Config must be forwarded so token streaming works
		expect(config).toBeDefined();
	});
});
