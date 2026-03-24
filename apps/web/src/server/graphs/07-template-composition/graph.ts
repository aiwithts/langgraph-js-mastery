import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 07, Step 1): Add your imports
// You'll need:
//   import type { ChatPromptTemplate } from "@langchain/core/prompts";
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";
//   import { CODE_PROMPT, CONCEPT_PROMPT, DEBUG_PROMPT } from "./prompts";

// TODO (Lesson 07, Step 3): Define routeByContent
// Signature: function routeByContent(state: typeof MessagesAnnotation.State): "code" | "concept" | "debug"
// Inspect the last message content (lowercased) and return the appropriate mode.

// TODO (Lesson 07, Step 4): Define the createNode factory
// Signature: function createNode(prompt: ChatPromptTemplate) { ... }
// The returned async function formats the prompt with state.messages and invokes the LLM.

// TODO (Lesson 07, Step 5): Build the graph
// Three nodes (code, concept, debug) wired with addConditionalEdges from START via routeByContent.
// Each node edges to END.

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 07, Step 6): Compile and return
	throw new Error("Not implemented — complete Lesson 07!");
}
