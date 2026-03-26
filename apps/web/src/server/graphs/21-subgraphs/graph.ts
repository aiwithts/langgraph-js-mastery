import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 21, Step 1): Add your imports
// You'll need:
//   import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 21, Step 2): Define the subgraph state and implementation

// TODO (Lesson 21, Step 3): Define ParentState

// TODO (Lesson 21, Step 4): Define extractTopicNode and presentResultNode

// TODO (Lesson 21, Step 5): Define callSubgraphNode

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 21, Step 6): Build and compile the parent graph
	// START → extractTopic → callSubgraph → presentResult → END
	throw new Error("Not implemented — complete Lesson 21!");
}
