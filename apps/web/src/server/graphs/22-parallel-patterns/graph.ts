import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 22, Step 1): Add your imports
// You'll need:
//   import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, Send, START, StateGraph } from "@langchain/langgraph";
//   import { z } from "zod";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 22, Step 2): Define WorkerState

// TODO (Lesson 22, Step 3): Define ParallelState

// TODO (Lesson 22, Step 4): Define parseInputNode

// TODO (Lesson 22, Step 5): Define fanOut

// TODO (Lesson 22, Step 6): Define workerNode

// TODO (Lesson 22, Step 7): Define aggregateNode

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 22, Step 8): Build and compile the graph
	// START → parseInput → (fanOut) → worker → aggregate → END
	throw new Error("Not implemented — complete Lesson 22!");
}
