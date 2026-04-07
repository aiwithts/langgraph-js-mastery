import { AIMessage } from "@langchain/core/messages";
import type { LLMResult } from "@langchain/core/outputs";
import { describe, expect, it, vi } from "vitest";

// Simulate a real LLM response that includes token usage data in llmOutput
const mockLLMResult: LLMResult = {
	generations: [
		[
			{
				text: "TypeScript decorators are a design pattern...",
				// Cast needed: LLMResult.generations is Generation[][] but chat models return ChatGeneration[]
				message: new AIMessage("TypeScript decorators are a design pattern..."),
			} as never,
		],
	],
	llmOutput: {
		tokenUsage: {
			promptTokens: 25,
			completionTokens: 15,
			totalTokens: 40,
		},
	},
};

vi.mock("../../../lib/llm", () => ({
	createLLM: vi.fn().mockImplementation(() => {
		return {
			withConfig: vi.fn().mockImplementation((config: { callbacks?: Array<{ handleLLMEnd?: (result: LLMResult) => Promise<void> }> }) => {
				return {
					invoke: vi.fn().mockImplementation(async (_messages: unknown) => {
						// Simulate the LLM calling handleLLMEnd on registered callbacks
						if (config?.callbacks) {
							for (const cb of config.callbacks) {
								await cb.handleLLMEnd?.(mockLLMResult);
							}
						}
						return new AIMessage("TypeScript decorators are a design pattern...");
					}),
				};
			}),
		};
	}),
}));

describe("Model-Level Hooks", () => {
	it("exports a valid module with config and createGraph", async () => {
		const mod = await import("../index");
		expect(mod.graph36ModelLevelHooks.config.id).toBe("36-model-level-hooks");
		expect(mod.graph36ModelLevelHooks.config.name).toBe("Model-Level Hooks");
		expect(mod.graph36ModelLevelHooks.createGraph).toBeInstanceOf(Function);
	});

	it("creates a compilable graph (complete Lesson 37 to pass this test)", async () => {
		const mod = await import("../index");
		const graph = await mod.graph36ModelLevelHooks.createGraph();
		expect(graph).toBeDefined();
	});

	it("invokes and returns an AI response", async () => {
		const { HumanMessage } = await import("@langchain/core/messages");
		const mod = await import("../index");
		const graph = await mod.graph36ModelLevelHooks.createGraph();
		const result = await graph.invoke({
			messages: [new HumanMessage("Explain TypeScript decorators.")],
		});
		expect(result.messages.length).toBeGreaterThan(1);
		const lastMessage = result.messages.at(-1);
		expect(lastMessage).toBeInstanceOf(AIMessage);
	});

	it("TokenUsageTracker accumulates token counts via handleLLMEnd", async () => {
		const { BaseCallbackHandler } = await import("@langchain/core/callbacks/base");

		class TokenUsageTracker extends BaseCallbackHandler {
			name = "TokenUsageTracker";
			totalTokens = 0;

			async handleLLMEnd(output: LLMResult) {
				const usage = output.llmOutput?.tokenUsage;
				if (usage) {
					this.totalTokens += usage.totalTokens ?? 0;
				}
			}
		}

		const tracker = new TokenUsageTracker();
		expect(tracker.totalTokens).toBe(0);

		await tracker.handleLLMEnd(mockLLMResult);
		expect(tracker.totalTokens).toBe(40);

		await tracker.handleLLMEnd(mockLLMResult);
		expect(tracker.totalTokens).toBe(80);
	});
});
