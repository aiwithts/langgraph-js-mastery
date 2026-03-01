import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 02, Step 1): Add your imports
// You'll need:
//   import { AIMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";

// TODO (Lesson 02, Step 2): Define ProcessorState using Annotation.Root
// Spread MessagesAnnotation.spec, then add:
//   stepCount: Annotation<number> with reducer (current, next) => current + next, default () => 0
//   log: Annotation<string[]> with reducer (current, next) => [...current, ...next], default () => []

// TODO (Lesson 02, Step 3): Define three async node functions:
//
// analyzeNode(state: typeof ProcessorState.State):
//   - Get lastMessage from state.messages
//   - Return: { stepCount: 1, log: [`Received: "${lastMessage.content}"`] }
//
// processNode(state):
//   - Return: { stepCount: 1, log: ["Processing..."] }
//
// completeNode(state):
//   - Create summary: new AIMessage(`Processing completed after ${state.stepCount} steps.`)
//   - Return: { stepCount: 1, log: ["Complete!"], messages: [summary] }

// TODO (Lesson 02, Step 4): Build the graph
// new StateGraph(ProcessorState)
//   .addNode("analyze", analyzeNode)
//   .addNode("process", processNode)
//   .addNode("complete", completeNode)
//   .addEdge(START, "analyze")
//   .addEdge("analyze", "process")
//   .addEdge("process", "complete")
//   .addEdge("complete", END)

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 02, Step 5): Compile and return
	throw new Error("Not implemented — complete Lesson 02!");
}
