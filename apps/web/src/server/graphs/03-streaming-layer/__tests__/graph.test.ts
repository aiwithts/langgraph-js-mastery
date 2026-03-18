import { HumanMessage } from "@langchain/core/messages";
import { describe, expect, it } from "vitest";
import { graph03StreamingLayer } from "../index";

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
		expect(graph03StreamingLayer.config.endpoint).toBe("/api/stream");
	});

	it("graph processes a message and returns an AIMessage echoing the user input", async () => {
		const graph = graph03StreamingLayer.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("hello streaming")],
		});
		const lastMessage = result.messages[result.messages.length - 1];
		expect(lastMessage._getType()).toBe("ai");
		expect(lastMessage.content).toContain("hello streaming");
	});
});
