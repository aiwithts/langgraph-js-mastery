import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 21, Step 1): Add your imports
// You'll need:
//   import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 21, Step 2): Define the subgraph state and implementation
// Step A: Define SubgraphState with text and summary fields (replace reducer, default "")
// Step B: Define summarizeSubNode — invokes LLM with state.text, returns { summary }
// Step C: Build and compile the subgraph (START → summarize → END, no checkpointer)

// TODO (Lesson 21, Step 3): Define ParentState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add: topic and summary fields (Annotation<string>, replace reducer, default "")

// TODO (Lesson 21, Step 4): Define parent nodes
// extractTopicNode: gets content from last message, returns { topic }
// presentResultNode: formats state.summary as AIMessage, returns { messages: [...] }

// TODO (Lesson 21, Step 5): Define callSubgraphNode
// Invokes the subgraph with { text: state.topic }, returns { summary: result.summary }

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 21, Step 6): Build and compile the parent graph
	// START → extractTopic → callSubgraph → presentResult → END
	throw new Error("Not implemented — complete Lesson 21!");
}
