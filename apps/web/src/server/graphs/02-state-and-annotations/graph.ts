import type { CompiledGraph } from "../../types";
import { StateGraph, Annotation, MessagesAnnotation, START, END } from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 02, Step 1, Task 1): Define ProcessorState using Annotation.Root
// Spread ...MessagesAnnotation.spec, then add stepCount (number, add reducer, default 0)
// and log (string[], append reducer, default [])

// TODO (Lesson 02, Step 1, Task 2): Create analyzeNode
// async function analyzeNode(state: typeof ProcessorState.State)

// TODO (Lesson 02, Step 1, Task 3): Create processNode
// async function processNode(state: typeof ProcessorState.State)

// TODO (Lesson 02, Step 1, Task 4): Create completeNode
// async function completeNode(state: typeof ProcessorState.State)

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 02, Step 1, Task 5): Build the StateGraph with all three nodes and compile it
	throw new Error("Not implemented — complete Lesson 02!");
}
