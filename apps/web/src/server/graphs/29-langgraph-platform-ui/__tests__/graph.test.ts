import { describe, expect, it, vi } from "vitest";

vi.mock("@langchain/langgraph/remote", () => ({
	RemoteGraph: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({
			messages: [{ content: "Response from remote graph" }],
		}),
	}),
}));

describe("LangGraph Platform UI", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph29LanggraphPlatformUi.config.id).toBe("29-langgraph-platform-ui");
		expect(mod.graph29LanggraphPlatformUi.config.name).toBe("LangGraph Platform UI");
		expect(mod.graph29LanggraphPlatformUi.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 29 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph29LanggraphPlatformUi.createGraph();
		expect(graph).toBeDefined();
	});

	it("delegates to the remote graph and returns messages", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph29LanggraphPlatformUi.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		expect(result.messages.length).toBeGreaterThan(0);
	});
});
