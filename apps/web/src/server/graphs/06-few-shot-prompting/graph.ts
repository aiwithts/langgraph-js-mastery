import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 06, Step 1): Add your imports
// You'll need:
//   import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
//   import { END, MessagesAnnotation, START, StateGraph, type LangGraphRunnableConfig } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";
//   import { fewShotPrompt, SYSTEM_MESSAGE } from "./prompt";

// TODO (Lesson 06, Step 3): Define formattingNode
// - Build a full prompt combining system message, few-shot examples, and conversation history:
//   const fullPrompt = ChatPromptTemplate.fromMessages([
//     ["system", SYSTEM_MESSAGE],
//     fewShotPrompt as any,
//     new MessagesPlaceholder("messages"),
//   ]);
// - Format: await fullPrompt.formatMessages({ messages: state.messages })
// - Invoke LLM, return: { messages: [response] }

// TODO (Lesson 06, Step 4): Build the graph
// START → formatter → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 06, Step 5): Compile and return
	throw new Error("Not implemented — complete Lesson 06!");
}
