import { ChatAnthropic } from "@langchain/anthropic";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatOpenAI } from "@langchain/openai";

export interface CreateLLMConfig {
	temperature?: number;
	streaming?: boolean;
	model?: string;
}

export function createLLM(config: CreateLLMConfig = {}): BaseChatModel {
	const { temperature = 0.7, streaming = true, model } = config;

	if (process.env["OPENAI_API_KEY"]) {
		return new ChatOpenAI({
			model: model ?? "gpt-4o-mini",
			temperature,
			streaming,
		});
	}
	if (process.env["ANTHROPIC_API_KEY"]) {
		return new ChatAnthropic({
			model: model ?? "claude-3-5-haiku-latest",
			temperature,
			streaming,
		});
	}

	throw new Error(
		"No LLM API key found. Set OPENAI_API_KEY or ANTHROPIC_API_KEY in your .env file.",
	);
}
