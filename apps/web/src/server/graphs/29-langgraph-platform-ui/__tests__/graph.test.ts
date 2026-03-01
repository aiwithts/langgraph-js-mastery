import { describe, expect, it, vi } from "vitest";

vi.mock("@langchain/langgraph/remote", () => ({
	RemoteGraph: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({
			messages: [{ content: "Response from remote graph" }],
		}),
	}),
}));

describe("Lesson 29: My Platform Graph", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn29MyPlatformGraph.config.id).toBe("learn-29-my-platform-graph");
		expect(mod.learn29MyPlatformGraph.config.name).toBe("My Platform Graph");
		expect(mod.learn29MyPlatformGraph.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 29 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn29MyPlatformGraph.createGraph();
		expect(graph).toBeDefined();
	});

	it("delegates to the remote graph and returns messages", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = mod.learn29MyPlatformGraph.createGraph();
		const result = await graph.invoke({ messages: [new HumanMessage("Hello!")] });
		expect(result.messages.length).toBeGreaterThan(0);
	});
});
