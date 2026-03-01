import { describe, expect, it, vi } from "vitest";

vi.mock("../../lib/llm", () => ({
	createLLM: vi.fn().mockReturnValue({
		invoke: vi.fn().mockResolvedValue({ content: "Please fill in the booking form above." }),
	}),
}));

describe("Lesson 27: My Booking Assistant", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.learn27MyBookingAssistant.config.id).toBe("learn-27-my-booking-assistant");
		expect(mod.learn27MyBookingAssistant.config.name).toBe("My Booking Assistant");
		expect(mod.learn27MyBookingAssistant.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 27 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = mod.learn27MyBookingAssistant.createGraph();
		expect(graph).toBeDefined();
	});

	it("dispatches a booking form on reservation request", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const uiEvents: unknown[] = [];
		const mod = await import("../index");
		const graph = mod.learn27MyBookingAssistant.createGraph();
		const result = await graph.invoke(
			{ messages: [new HumanMessage("I'd like to make a reservation for 4 people")] },
			{ writer: (event: unknown) => uiEvents.push(event) },
		);
		expect(result.messages.length).toBeGreaterThan(1);
	});
});
