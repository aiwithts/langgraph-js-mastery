import { ChatAnthropic } from "@langchain/anthropic";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatOpenAI } from "@langchain/openai";

export interface CreateLLMConfig {
	temperature?: number;
	streaming?: boolean;
	model?: string;
}

// TODO (Lesson 03, Step 1): Implement the createLLM factory
export function createLLM(config: CreateLLMConfig = {}): BaseChatModel {
	throw new Error("Not implemented — complete Lesson 03, Step 1!");
}
