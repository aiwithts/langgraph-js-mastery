import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 14, Step 1): Add your imports
// You'll need:
//   import { SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";
//   import { getRetriever } from "./vector-store";

// TODO (Lesson 14, Step 4): Define RAGState (same as Lesson 13)
// Add: context: string, sources: string[]

// TODO (Lesson 14, Step 5): Define retrieveNode (same as Lesson 13 but uses hybrid retriever)

// TODO (Lesson 14, Step 6): Define generateNode (same as Lesson 13)

// TODO (Lesson 14, Step 7): Build graph: START → retrieve → generate → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 14, Step 8): Compile and return
	throw new Error("Not implemented — complete Lesson 14!");
}
