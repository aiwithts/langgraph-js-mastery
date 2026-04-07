import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 33, Step 1): Add your imports
// You'll need:
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { RemoteGraph } from "@langchain/langgraph/remote";

// TODO (Lesson 33, Step 2): Define platformNode
// Instantiate RemoteGraph INSIDE the function (not at module level).
// - graphId: process.env["REMOTE_GRAPH_ID"] ?? "agent"
// - url: process.env["LANGGRAPH_PLATFORM_URL"] ?? "http://localhost:8123"
// - apiKey: process.env["LANGGRAPH_API_KEY"]
// - Invoke with: { messages: state.messages }
// - Return: { messages: result.messages }

// TODO (Lesson 33, Step 3): Build graph: START → platform → END
// Use StateGraph(MessagesAnnotation), addNode, addEdge.
// Note: The local wrapper graph is thin — most logic lives in the deployed graph.

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 33, Step 4): Compile and return
	throw new Error("Not implemented — complete Lesson 33!");
}
