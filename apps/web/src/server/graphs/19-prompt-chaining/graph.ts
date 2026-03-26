import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 19, Step 1): Add your imports
// You'll need:
//   import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 19, Step 2): Define PipelineState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add: draft, critique, refined — each Annotation<string> with replace reducer, default ""

// TODO (Lesson 19, Step 3): Define draftNode

// TODO (Lesson 19, Step 4): Define critiqueNode

// TODO (Lesson 19, Step 5): Define refineNode

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 19, Step 6): Build and compile the graph
	// START → draftNode → critiqueNode → refineNode → END
	throw new Error("Not implemented — complete Lesson 19!");
}
