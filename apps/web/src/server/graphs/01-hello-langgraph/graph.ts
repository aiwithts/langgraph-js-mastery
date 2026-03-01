import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 01, Step 1): Add your imports
// You'll need:
//   import { AIMessage } from "@langchain/core/messages";
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";

// TODO (Lesson 01, Step 2): Define a `greetNode` function
// - Accept: state: typeof MessagesAnnotation.State
// - Get the last message from state.messages (use state.messages.at(-1))
// - Create: new AIMessage(`Hello! You said: "${lastMessage.content}"`)
// - Return: { messages: [response] }

// TODO (Lesson 01, Step 3): Build the workflow
// const workflow = new StateGraph(MessagesAnnotation)
//   .addNode("greet", greetNode)
//   .addEdge(START, "greet")
//   .addEdge("greet", END);

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 01, Step 4): Compile and return
	// return workflow.compile({ checkpointer: checkpointer as any });
	throw new Error("Not implemented — complete Lesson 01!");
}
