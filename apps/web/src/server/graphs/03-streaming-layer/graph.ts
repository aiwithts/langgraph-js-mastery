import { AIMessage } from "@langchain/core/messages";
import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
import type { CompiledGraph } from "../../types";

// TODO (Step 1, Task 1): Define the echoNode function
// Parameters: state (typeof MessagesAnnotation.State)
// 1. Get the last message from state.messages
// 2. Extract its content as a string (if content is not a string, use "unknown")
// 3. Create an AIMessage with a response that echoes the user's input
// 4. Return { messages: [yourAIMessage] }

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Step 1, Task 2): Build the graph
	// 1. Create a new StateGraph with MessagesAnnotation
	// 2. Add echoNode with .addNode('echo', echoNode)
	// 3. Add edge from START to 'echo'
	// 4. Add edge from 'echo' to END
	// 5. Compile and return:
	//    workflow.compile({ checkpointer: checkpointer as any }) // known LangGraph type narrowing workaround — safe here
	throw new Error("Not implemented — complete Lesson 03 Step 1!");
}
