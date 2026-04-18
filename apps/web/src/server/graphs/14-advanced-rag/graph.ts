import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 15, Step 1): Add your imports
// You'll need:
//   import { SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";
//   import { getRetriever } from "./vector-store";

// TODO (Lesson 15, Step 4): Define RAGState (same as Lesson 14)
// Add: context: string, sources: string[]

// TODO (Lesson 15, Step 5): Define retrieveNode (same as Lesson 14 but uses hybrid retriever)

// TODO (Lesson 15, Step 6): Define generateNode (same as Lesson 14)

// TODO (Lesson 15, Step 7, Task 1): Build graph: START → retrieve → generate → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 15, Step 7, Task 2): Compile and return
	throw new Error("Not implemented — complete Lesson 15!");
}
