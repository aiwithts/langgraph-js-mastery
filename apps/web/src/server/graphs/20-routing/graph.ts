import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 20, Step 1): Add your imports
// You'll need:
//   import { HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { z } from "zod";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 20, Step 2): Define RouterState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add: category (Annotation<string>, replace reducer, default "general")
//      confidence (Annotation<number>, replace reducer, default 0)

// TODO (Lesson 20, Step 3): Define ClassificationSchema
// z.object with category (z.enum of billing/technical/general), confidence (z.number 0–1),
// and reasoning (z.string) fields — each with a .describe() explanation

// TODO (Lesson 20, Step 4): Define classifierNode

// TODO (Lesson 20, Step 5): Define 4 handler nodes: billingHandler, technicalHandler, generalHandler, triageNode

// TODO (Lesson 20, Step 6): Define routeByCategory

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 20, Step 7): Build and compile the graph
	// START → classifier → (routeByCategory) → billing|technical|general|triage → END
	throw new Error("Not implemented — complete Lesson 20!");
}
