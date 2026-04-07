import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 43, Step 1): Add imports
// You'll need MessagesAnnotation, StateGraph, START, END from "@langchain/langgraph"
// and createLLM from "../../lib/llm"

// TODO (Lesson 43, Step 2): Define a simple health-check agent node
// The node should respond to any message with a status confirmation,
// demonstrating a minimal but correctly structured deployable agent.

// TODO (Lesson 43, Step 3): Build and compile the graph
// Wire START → healthCheck → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	throw new Error("Not implemented — complete Lesson 43!");
}
