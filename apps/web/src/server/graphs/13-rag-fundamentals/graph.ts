import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 13, Step 1): Add your imports
// You'll need:
//   import { SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";
//   import { getRetriever } from "./vector-store";

// TODO (Lesson 13, Step 4): Define RAGState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   context: Annotation<string> — reducer replaces, default ""
//   sources: Annotation<string[]> — reducer replaces, default []

// TODO (Lesson 13, Step 5): Define retrieveNode
// - Get the last user message as a query string
// - Call: const retriever = await getRetriever(3)
// - Retrieve: const docs = await retriever.invoke(query)
// - Build context string from docs
// - Return: { context, sources }

// TODO (Lesson 13, Step 6): Define generateNode
// - System prompt instructs: use ONLY the provided context to answer
//   If context doesn't contain the answer, say so clearly
// - Include state.context in the system prompt
// - Invoke LLM with system + state.messages
// - Return: { messages: [response] }

// TODO (Lesson 13, Step 7): Build graph: START → retrieve → generate → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 13, Step 8): Compile and return
	throw new Error("Not implemented — complete Lesson 13!");
}
