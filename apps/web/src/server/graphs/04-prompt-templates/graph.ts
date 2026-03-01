import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 04, Step 1): Add your imports
// You'll need:
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";
//   import { ASSISTANT_PROMPT } from "./prompts";

// TODO (Lesson 04, Step 2, Task 2): Define SpecialtyState
// Use Annotation.Root({ ...MessagesAnnotation.spec })
// Add: specialty: Annotation<string> — reducer: (_, next) => next, default: () => "programming"

// TODO (Lesson 04, Step 3): Define assistantNode
// - Format ASSISTANT_PROMPT with { specialty: state.specialty, messages: state.messages }
// - Invoke LLM with the formatted prompt and pass config as the second argument
// - Return: { messages: [response] }

// TODO (Lesson 04, Step 4): Build the graph
// new StateGraph(SpecialityState)
//   .addNode("assistant", assistantNode)
//   .addEdge(START, "assistant")
//   .addEdge("assistant", END)

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 04, Step 5): Compile and return
	throw new Error("Not implemented — complete Lesson 04!");
}
