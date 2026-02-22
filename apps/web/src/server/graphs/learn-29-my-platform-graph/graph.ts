import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 29, Step 1): Add your imports
// You'll need:
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { RemoteGraph } from "@langchain/langgraph/remote";

// TODO (Lesson 29, Step 2): Configure the RemoteGraph connection
// RemoteGraph connects to a graph deployed on LangGraph Platform.
//
// const remoteGraph = new RemoteGraph({
//   graphId: process.env["REMOTE_GRAPH_ID"] ?? "agent",
//   url: process.env["LANGGRAPH_PLATFORM_URL"] ?? "http://localhost:8123",
//   apiKey: process.env["LANGGRAPH_API_KEY"],
// });
//
// The RemoteGraph behaves exactly like a local compiled graph:
//   await remoteGraph.invoke({ messages: [...] })
//   await remoteGraph.stream({ messages: [...] })

// TODO (Lesson 29, Step 3): Define platformNode
// - Invoke the remote graph with state.messages
// - The remote graph returns a state object
// - Return: { messages: result.messages } (pass through the messages)

// TODO (Lesson 29, Step 4): Build graph: START → platform → END
// Note: The local wrapper graph is thin — most logic lives in the deployed graph.

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 29, Step 5): Compile and return
	throw new Error("Not implemented — complete Lesson 29!");
}
