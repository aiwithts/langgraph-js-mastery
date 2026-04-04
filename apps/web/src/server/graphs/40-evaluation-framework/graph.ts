import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 41, Step 1): Add imports
// You'll need Annotation, StateGraph, MessagesAnnotation, START, END from "@langchain/langgraph"
// and createLLM from "../../lib/llm"

// TODO (Lesson 41, Step 2): Define EvalState with category and response fields
// Extend MessagesAnnotation to add: category (string), response (string)

// TODO (Lesson 41, Step 3): Define classifyNode and specialistNode
// classifyNode detects the query category (billing | technical | general)
// specialistNode generates a domain-appropriate response

// TODO (Lesson 41, Step 4): Define the evaluation dataset (10 entries)
// Each entry: { input: string, expectedCategory: string }
// Cover billing, technical, and general query types

// TODO (Lesson 41, Step 5): Define LLM-as-judge evaluate() function
// The judge receives the input, expected category, and actual response,
// then returns a score (0-1) and reasoning string

// TODO (Lesson 41, Step 6): Build and compile the router graph
// Wire START → classify → specialist → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	throw new Error("Not implemented — complete Lesson 41!");
}
