import { AIMessage } from "@langchain/core/messages";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue(new AIMessage("Please fill in the booking form above.")),
	}),
}));

describe("Interactive Booking Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph30InteractiveGenerativeUi.config.id).toBe("30-interactive-generative-ui");
		expect(mod.graph30InteractiveGenerativeUi.config.name).toBe("Interactive Booking Assistant");
		expect(mod.graph30InteractiveGenerativeUi.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 31 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph30InteractiveGenerativeUi.createGraph();
		expect(graph).toBeDefined();
	});

	it("dispatches a booking form on reservation request", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph30InteractiveGenerativeUi.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("I'd like to make a reservation for 4 people")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
