import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 09, Step 1): Add your imports
// You'll need:
//   import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import type { LangGraphRunnableConfig } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";
//   import { CLASSIFY_PROMPT, CREATE_PROMPT, EXPLAIN_PROMPT } from "./prompts";
//   import { ExtractionResultSchema, IntentSchema } from "./schemas";

// TODO (Lesson 09, Step 4): Define SwissArmyState
// Extends MessagesAnnotation with:
//   detectedMode: string — reducer replaces, default "explain"
//   confidence: number — reducer replaces, default 0

// TODO (Lesson 09, Step 5): Define classifyNode
// - Use llm.withStructuredOutput(IntentSchema) to classify the intent
// - Invoke: structuredLlm.invoke([new SystemMessage(CLASSIFY_PROMPT), new HumanMessage(userText)])
// - Return: { detectedMode: result.mode, confidence: result.confidence }

// TODO (Lesson 09, Step 6): Define explainNode, extractNode, createNode
// - explainNode: formats EXPLAIN_PROMPT with state.messages, invokes LLM with config
// - extractNode: uses withStructuredOutput(ExtractionResultSchema), invokes with messages array
//   formats markdown output inline, returns { messages: [new AIMessage(...)] }
// - createNode: formats CREATE_PROMPT with state.messages, invokes LLM with config

// TODO (Lesson 09, Step 7): Define routeByMode
// If confidence < 0.6 → "explain"
// Otherwise → state.detectedMode

// TODO (Lesson 09, Step 8): Build graph — define const workflow at module level (outside createGraph)
// const workflow = new StateGraph(SwissArmyState)
//   .addNode("classify", classifyNode) ...
// START → classify → (routeByMode) → explain | extract | create → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 09, Step 9): Compile and return
	throw new Error("Not implemented — complete Lesson 09!");
}
