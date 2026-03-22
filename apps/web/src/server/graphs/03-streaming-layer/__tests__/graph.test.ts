import { HumanMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";
import { graph03StreamingLayer } from "../index";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "mocked LLM response" }),
	}),
}));

describe("Lesson 03: The Streaming Layer", () => {
	it("exports a valid module with config and createGraph", () => {
		expect(graph03StreamingLayer).toBeDefined();
		expect(graph03StreamingLayer.config).toBeDefined();
		expect(typeof graph03StreamingLayer.createGraph).toBe("function");
	});

	it("config.id is '03-streaming-layer'", () => {
		expect(graph03StreamingLayer.config.id).toBe("03-streaming-layer");
	});

	it("config.endpoint is '/api/stream'", () => {
		// Passes after Phase 2: learner updates config.ts endpoint from '/api/invoke' to '/api/stream'
		expect(graph03StreamingLayer.config.endpoint).toBe("/api/stream");
	});

	it("graph processes a message and returns an AI response", async () => {
		const graph = await Promise.resolve(graph03StreamingLayer.createGraph());
		const result = await graph.invoke({
			messages: [new HumanMessage("Hello!")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
