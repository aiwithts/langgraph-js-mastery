import { ChatAnthropic } from "@langchain/anthropic";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatOpenAI } from "@langchain/openai";

export interface CreateLLMConfig {
	temperature?: number;
	streaming?: boolean;
	model?: string;
}

// TODO (Lesson 03): Implement the createLLM factory
//
// This shared utility is imported by every lesson that calls an LLM.
// Implement it once here — all subsequent graphs use it via `createLLM()`.
//
// Steps:
//   1. Destructure config: { temperature = 0.7, streaming = true, model } = config
//      - temperature: controls randomness (0 = deterministic, 1 = creative)
//      - streaming: enables token-by-token output (required for real-time delivery)
//      - model: optional override; each provider has a sensible default
//
//   2. If process.env["OPENAI_API_KEY"] is set, return:
//        new ChatOpenAI({ model: model ?? "gpt-4o-mini", temperature, streaming })
//
//   3. If process.env["ANTHROPIC_API_KEY"] is set, return:
//        new ChatAnthropic({ model: model ?? "claude-3-5-haiku-latest", temperature, streaming })
//
//   4. If neither key is available, throw an Error telling the user to add a key to their .env file
//
export function createLLM(config: CreateLLMConfig = {}): BaseChatModel {
	throw new Error("Not implemented — complete Lesson 03!");
}
