import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 08, Step 1): Add your imports
// You'll need:
//   import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";
//   import { type ExtractionResult, ExtractionResultSchema } from "./schemas";

// TODO (Lesson 08, Step 3): Define ExtractorState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add: lastExtraction: Annotation<ExtractionResult | null> — reducer: (_, next) => next, default: null

// TODO (Lesson 08, Step 4): Define extractNode
// - Use createLLM({ temperature: 0, streaming: false })
// - const structuredLlm = llm.withStructuredOutput(ExtractionResultSchema)
// - Get userText from last message
// - Invoke: structuredLlm.invoke([new SystemMessage("Extract contacts, events, and action items..."), new HumanMessage(userText)], { callbacks: [] })
//   NOTE: { callbacks: [] } suppresses LangChain streaming events that would cause [object Object] in the UI
// - Return: { lastExtraction: result }

// TODO (Lesson 08, Step 5): Define formatNode
// - Build a markdown string from state.lastExtraction
// - Handle contacts, events, and actionItems sections
// - Return: { messages: [new AIMessage(formatted)] }

// TODO (Lesson 08, Step 6): Build graph — define const workflow at module level (outside createGraph)
// START → extract → format → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 08, Step 7): Compile and return
	throw new Error("Not implemented — complete Lesson 08!");
}
