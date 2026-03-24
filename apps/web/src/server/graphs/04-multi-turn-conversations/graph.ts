import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";
import { createLLM } from "../../lib/llm";
import type { CompiledGraph } from "../../types";
import type { LangGraphRunnableConfig } from "@langchain/langgraph";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 04, Step 1, Task 1): Define your chatbot's personality
// Assign a string to SYSTEM_PROMPT that describes the persona your bot should adopt.

// TODO (Lesson 04, Step 1, Task 2): Implement the chatNode function
// Build the messages array, invoke the LLM with config for streaming, and return the response.

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 04, Step 1, Task 3): Build and compile the graph
	// Wire chatNode from START to END, then compile with the checkpointer.
	throw new Error("Not implemented — complete Lesson 04, Step 1, Task 3!");
}
