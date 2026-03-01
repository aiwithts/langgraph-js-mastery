import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 19, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 19, Step 2): Define PipelineState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   draft: Annotation<string> — reducer replaces, default ""
//   critique: Annotation<string> — reducer replaces, default ""
//   refined: Annotation<string> — reducer replaces, default ""

// TODO (Lesson 19, Step 3): Define draftNode
// - Get the user's request from the last message
// - Prompt: "Write a first draft of the following. Focus on completeness, not perfection."
// - Return: { draft: response.content }

// TODO (Lesson 19, Step 4): Define critiqueNode
// - Given state.draft, identify 2-3 specific improvements:
//   "Review this draft and identify 2-3 concrete improvements needed."
// - Return: { critique: response.content }

// TODO (Lesson 19, Step 5): Define refineNode
// - Prompt: "Rewrite the draft incorporating this feedback: [critique]"
// - This is the final version — also add it as a message
// - Return: { refined: response.content, messages: [new AIMessage(refined)] }

// TODO (Lesson 19, Step 6): Build graph: START → draft → critique → refine → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 19, Step 7): Compile and return
	throw new Error("Not implemented — complete Lesson 19!");
}
