import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 22, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, Send, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 22, Step 2): Define WorkerState for individual items
// const WorkerState = Annotation.Root({
//   item: Annotation<string>({ reducer: (_, next) => next, default: () => "" }),
//   result: Annotation<string>({ reducer: (_, next) => next, default: () => "" }),
// });

// TODO (Lesson 22, Step 3): Define ParallelState for the main graph
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   items: Annotation<string[]> — reducer replaces, default []
//   results: Annotation<string[]> — reducer APPENDS (very important for fan-in!), default []
//   summary: Annotation<string> — reducer replaces, default ""

// TODO (Lesson 22, Step 4): Define parseInputNode
// - Parse the user's message to extract a list of items to process
// - Use LLM with structuredOutput: { items: z.array(z.string()) }
//   OR: just split the message by commas for simplicity
// - Return: { items: parsedItems }

// TODO (Lesson 22, Step 5): Define fanOut function
// This function returns Send objects to dispatch work to workers in parallel:
// function fanOut(state: typeof ParallelState.State): Send[] {
//   return state.items.map(item => new Send("worker", { item }));
// }
// Note: fanOut is used as the target of addConditionalEdges, not a regular node

// TODO (Lesson 22, Step 6): Define workerNode (processes a SINGLE item)
// async function workerNode(state: typeof WorkerState.State) {
//   // Process state.item — call LLM, transform, analyze, etc.
//   const result = `Processed: ${state.item}`; // or use LLM
//   return { result };
// }
// The worker's result will be aggregated into ParallelState.results

// TODO (Lesson 22, Step 7): Define aggregateNode (fan-in)
// - All worker results are now in state.results
// - Combine them into a summary
// - Add summary as a message
// - Return: { summary: combined, messages: [new AIMessage(combined)] }

// TODO (Lesson 22, Step 8): Build graph with fan-out pattern
// const graph = new StateGraph(ParallelState)
//   .addNode("parseInput", parseInputNode)
//   .addNode("worker", workerNode)  // uses WorkerState
//   .addNode("aggregate", aggregateNode)
//   .addEdge(START, "parseInput")
//   .addConditionalEdges("parseInput", fanOut)  // fan-out to workers
//   .addEdge("worker", "aggregate")
//   .addEdge("aggregate", END)

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 22, Step 9): Compile and return
	throw new Error("Not implemented — complete Lesson 22!");
}
