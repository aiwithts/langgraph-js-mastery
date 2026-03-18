import type { CompiledGraph } from "../../types";
import { StateGraph, Annotation, MessagesAnnotation, START, END } from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Step 1, Task 1): Define ProcessorState using Annotation.Root
// Spread MessagesAnnotation.spec, then add:
//   stepCount: Annotation<number> with reducer (curr, next) => curr + next, default () => 0
//   log: Annotation<string[]> with reducer (curr, next) => [...curr, ...next], default () => []

// TODO (Step 1, Task 2): Create analyzeNode
// async function analyzeNode(state: typeof ProcessorState.State)
//   - Get the last message from state.messages
//   - Extract its content as a string (handle non-string content)
//   - Return { stepCount: 1, log: [`Received: "${input}"`] }

// TODO (Step 1, Task 3): Create processNode
// async function processNode(state: typeof ProcessorState.State)
//   - Return { stepCount: 1, log: ['Processing...'] }

// TODO (Step 1, Task 4): Create completeNode
// async function completeNode(state: typeof ProcessorState.State)
//   - totalSteps = state.stepCount + 1  (add reducer not applied yet)
//   - fullLog = [...state.log, 'Complete!']
//   - Create AIMessage with multi-line summary:
//       `Processing Summary\nSteps: ${totalSteps}\nLog:\n${fullLog.map((e, i) => `  ${i+1}. ${e}`).join('\n')}`
//   - Return { stepCount: 1, log: ['Complete!'], messages: [summaryMessage] }

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Step 1, Task 5): Build the StateGraph and compile it
	// 1. new StateGraph(ProcessorState)
	//    .addNode("analyze", analyzeNode)
	//    .addNode("process", processNode)
	//    .addNode("complete", completeNode)
	//    .addEdge(START, "analyze")
	//    .addEdge("analyze", "process")
	//    .addEdge("process", "complete")
	//    .addEdge("complete", END)
	// 2. return workflow.compile()
	throw new Error("Not implemented — complete Lesson 02!");
}
