import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 22, Step 1): Add your imports
// You'll need:
//   import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, Send, START, StateGraph } from "@langchain/langgraph";
//   import { z } from "zod";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 22, Step 2): Define WorkerState for individual items
// Annotation.Root with a single item field (Annotation<string>, replace reducer, default "")

// TODO (Lesson 22, Step 3): Define ParallelState for the main graph
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   items: Annotation<string[]> — replace reducer, default []
//   results: Annotation<string[]> — APPEND reducer (curr.concat(next)), default []
//   summary: Annotation<string> — replace reducer, default ""

// TODO (Lesson 22, Step 4): Define parseInputNode
// - Parse the user's message to extract a list of items
// - Use withStructuredOutput with z.object({ items: z.array(z.string()) })
// - Return: { items: parsedItems }

// TODO (Lesson 22, Step 5): Define fanOut function
// - Returns Send[] mapping each item to the "worker" node
// - Used as the callback in addConditionalEdges (not registered with addNode)

// TODO (Lesson 22, Step 6): Define workerNode (processes a SINGLE item)
// - Receives WorkerState with state.item
// - Process the item (call LLM or transform)
// - Return: { results: [processedResult] }  ← writes to ParallelState.results via concat reducer

// TODO (Lesson 22, Step 7): Define aggregateNode (fan-in)
// - All worker results are now in state.results (accumulated by concat reducer)
// - Combine into a numbered summary string
// - Return: { summary: combined, messages: [new AIMessage(combined)] }

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 22, Step 8): Build and compile the graph
	// START → parseInput → (fanOut) → worker → aggregate → END
	throw new Error("Not implemented — complete Lesson 22!");
}
