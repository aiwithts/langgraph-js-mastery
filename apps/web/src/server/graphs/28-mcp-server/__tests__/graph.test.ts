import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi
			.fn()
			.mockResolvedValue(new AIMessage("Here is what I found in my research on that topic.")),
	}),
}));

describe("LangGraph as MCP Server", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph28McpServer.config.id).toBe("28-mcp-server");
		expect(mod.graph28McpServer.config.name).toBe("LangGraph as MCP Server");
		expect(mod.graph28McpServer.createGraph).toBeInstanceOf(Function);
	});

	it("createGraph is async and resolves to a compiled graph (complete Lesson 29 to pass this test)", async () => {
		const mod = await import("../index");
		const graphPromise = mod.graph28McpServer.createGraph();
		expect(graphPromise).toBeInstanceOf(Promise);
		const graph = await graphPromise;
		expect(graph).toBeDefined();
	});

	it("invokes and returns a research response", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph28McpServer.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Research the history of TypeScript.")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
		const lastMessage = result.messages.at(-1);
		expect(lastMessage).toBeInstanceOf(AIMessage);
	});
});
