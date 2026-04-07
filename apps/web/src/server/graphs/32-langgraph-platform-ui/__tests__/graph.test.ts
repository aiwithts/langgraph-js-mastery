import { describe, expect, it, vi } from "vitest";
import { AIMessage } from "@langchain/core/messages";

vi.mock("@langchain/langgraph/remote", () => {
	const mockInvoke = vi.fn().mockResolvedValue({
		messages: [new AIMessage("Response from remote graph")],
	});
	class RemoteGraph {
		invoke = mockInvoke;
	}
	return { RemoteGraph };
});

describe("LangGraph Platform UI", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph32LanggraphPlatformUi.config.id).toBe("32-langgraph-platform-ui");
		expect(mod.graph32LanggraphPlatformUi.config.name).toBe("LangGraph Platform UI");
		expect(mod.graph32LanggraphPlatformUi.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 33 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph32LanggraphPlatformUi.createGraph();
		expect(graph).toBeDefined();
	});

	it("delegates to the remote graph and returns messages", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph32LanggraphPlatformUi.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		expect(result.messages.length).toBeGreaterThan(0);
	});
});
