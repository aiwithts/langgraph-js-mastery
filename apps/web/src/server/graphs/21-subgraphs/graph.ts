import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 21, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 21, Step 2): Define the subgraph state and implementation
// Create a self-contained subgraph for a specific sub-task.
// Example: a "summarizer" subgraph that summarizes text.
//
// Step A: Define SubgraphState
//   const SubgraphState = Annotation.Root({
//     text: Annotation<string>({ reducer: (_, next) => next, default: () => "" }),
//     summary: Annotation<string>({ reducer: (_, next) => next, default: () => "" }),
//   });
//
// Step B: Define a node for the subgraph
//   async function summarizeSubNode(state: typeof SubgraphState.State) { ... }
//
// Step C: Build and compile the subgraph
//   const subgraph = new StateGraph(SubgraphState)
//     .addNode("summarize", summarizeSubNode)
//     .addEdge(START, "summarize")
//     .addEdge("summarize", END)
//     .compile();

// TODO (Lesson 21, Step 3): Define the parent graph state
// The parent state must include fields that map to/from the subgraph state.
//
// const ParentState = Annotation.Root({
//   ...MessagesAnnotation.spec,
//   topic: Annotation<string>({ reducer: (_, next) => next, default: () => "" }),
//   summary: Annotation<string>({ reducer: (_, next) => next, default: () => "" }),
// });

// TODO (Lesson 21, Step 4): Define parent nodes
// extractTopicNode: extracts the topic from the user message
//   - Gets the topic from the last message
//   - Return: { topic: extractedTopic }
//
// presentResultNode: formats the subgraph result as a message
//   - Uses state.summary to create a response
//   - Return: { messages: [new AIMessage(`Summary: ${state.summary}`)] }

// TODO (Lesson 21, Step 5): Create a wrapper node that calls the subgraph
// async function callSubgraphNode(state: typeof ParentState.State) {
//   const result = await subgraph.invoke({ text: state.topic });
//   return { summary: result.summary };
// }

// TODO (Lesson 21, Step 6): Build the parent graph
// START → extractTopic → callSubgraph → presentResult → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 21, Step 7): Compile parent graph and return
	throw new Error("Not implemented — complete Lesson 21!");
}
