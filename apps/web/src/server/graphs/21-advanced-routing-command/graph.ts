import type { CompiledGraph } from "../../types";

// TODO (Lesson 22, Step 1): Add imports
// You'll need Command, Annotation, MessagesAnnotation, StateGraph, START, END from "@langchain/langgraph"
// AIMessage, HumanMessage, SystemMessage from "@langchain/core/messages"
// and createLLM from "../../lib/llm"

// TODO (Lesson 22, Step 2): Define ModerationState using Annotation.Root
// Spread MessagesAnnotation.spec and add: severity (default "none"), violations (default []), requiresHumanReview (default false)

// TODO (Lesson 22, Step 3): Define triageNode using Command
// Command lets you update state AND specify the next node atomically in a single return.
// Extract the last message content, measure its length, then return new Command({ update: {...}, goto: "..." })

// TODO (Lesson 22, Step 4): Define humanQueue, autoReject, and handler nodes (stubs)
// Each node should append a final AI message describing the outcome.

// TODO (Lesson 22, Step 5): Build and compile the graph
// Wire START → triage, then triage routes to humanQueue | autoReject | handler via Command

// Note: this graph does not use thread persistence, but the optional parameter
// keeps the signature compatible with GraphModule.
export function createGraph(_checkpointer?: unknown): CompiledGraph {
	throw new Error("Not implemented — complete Lesson 22!");
}
