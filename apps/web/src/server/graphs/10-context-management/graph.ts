import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 10, Step 1): Add your imports
// You'll need:
//   import { RemoveMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

const MAX_MESSAGES = 10;
const KEEP_RECENT = 5;

// TODO (Lesson 10, Step 2): Define ContextState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add: summary: Annotation<string | null> — reducer: (_, next) => next, default: null

// TODO (Lesson 10, Step 3): Define summarizeNode
// - Get messages to summarize: state.messages.slice(0, -KEEP_RECENT)
// - Ask LLM to write a concise summary of those old messages (max 8 sentences)
// - Remove old messages from state using RemoveMessage({ id: m.id }) for each
// - Return: { messages: deletions, summary: response.content }
// Hint: config?.writer?.("Summarizing conversation...") to show progress

// TODO (Lesson 10, Step 4): Define chatNode
// - System prompt includes the summary if it exists (but doesn't recite it)
// - Invoke LLM with system + state.messages
// - Return: { messages: [response] }

// TODO (Lesson 10, Step 5): Export shouldSummarize routing function
// Return "summarize" if state.messages.length > MAX_MESSAGES, else "chat"
export function shouldSummarize(state: { messages: unknown[] }): "summarize" | "chat" {
	return state.messages.length > MAX_MESSAGES ? "summarize" : "chat";
}

// TODO (Lesson 10, Step 6): Build graph
// Use addConditionalEdges(START, shouldSummarize, { summarize: "summarize", chat: "chat" })
// summarize → chat, chat → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 10, Step 7): Compile and return
	throw new Error("Not implemented — complete Lesson 10!");
}
