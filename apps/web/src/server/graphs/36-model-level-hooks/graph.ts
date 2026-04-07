import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 37, Step 1): Add imports
// You'll need:
//   BaseCallbackHandler from "@langchain/core/callbacks/base"
//   LLMResult from "@langchain/core/outputs"
//   HumanMessage, SystemMessage from "@langchain/core/messages"
//   END, MessagesAnnotation, START, StateGraph from "@langchain/langgraph"
//   createLLM from "../../lib/llm"

// TODO (Lesson 37, Step 2): Define TokenUsageTracker
// Extend BaseCallbackHandler and implement handleLLMEnd to accumulate token counts.
// The class should have a public `totalTokens` field (starts at 0) and a `name` field.
// In handleLLMEnd, read output.llmOutput?.tokenUsage?.totalTokens and add it to totalTokens.

// TODO (Lesson 37, Step 3): Define agentNode
// Create a TokenUsageTracker instance, attach it to the LLM via
// llm.withConfig({ callbacks: [tracker] }), invoke the LLM with a system message
// and the full message history, and return { messages: [response] }.

// TODO (Lesson 37, Step 4): Build and export createGraph
// Wire the graph (START → agent → END) and compile it.
// Export via createGraph(checkpointer?).

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	throw new Error("Not implemented — complete Lesson 37!");
}
