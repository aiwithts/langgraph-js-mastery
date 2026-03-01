import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 08, Step 1): Add your imports
// You'll need:
//   import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import type { LangGraphRunnableConfig } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";
//   import { CLASSIFY_PROMPT, CREATE_PROMPT, EXPLAIN_PROMPT } from "./prompts";
//   import { ExtractionResultSchema, IntentSchema } from "./schemas";

// TODO (Lesson 08, Step 4): Define SwissArmyState
// Extends MessagesAnnotation with:
//   detectedMode: string — reducer replaces, default "explain"
//   confidence: number — reducer replaces, default 0

// TODO (Lesson 08, Step 5): Define classifyNode
// - Use llm.withStructuredOutput(IntentSchema) to classify the intent
// - Return: { detectedMode: result.mode, confidence: result.confidence }

// TODO (Lesson 08, Step 6): Define explainNode, extractNode, createNode
// - explainNode: formats EXPLAIN_PROMPT with state.messages, invokes LLM
// - extractNode: uses withStructuredOutput(ExtractionResultSchema), formats markdown output
// - createNode: formats CREATE_PROMPT with state.messages, invokes LLM

// TODO (Lesson 08, Step 7): Define routeByMode
// If confidence < 0.6 → "explain"
// Otherwise → state.detectedMode

// TODO (Lesson 08, Step 8): Build graph
// START → classify → (routeByMode) → explain | extract | create → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 08, Step 9): Compile and return
	throw new Error("Not implemented — complete Lesson 08!");
}
