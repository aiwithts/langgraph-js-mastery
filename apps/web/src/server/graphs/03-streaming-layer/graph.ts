import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 03, Step 2, Task 1): Add your imports
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 03, Step 2, Task 2): Define chatNode
// - Signature: async function chatNode(state: typeof MessagesAnnotation.State, config: LangGraphRunnableConfig)
// - const llm = createLLM()
// - const response = await llm.invoke(state.messages, config)  // config wires token streaming
// - Return: { messages: [response] }

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 03, Step 2, Task 3): Build and compile
	// new StateGraph(MessagesAnnotation)
	//   .addNode("chat", chatNode)
	//   .addEdge(START, "chat")
	//   .addEdge("chat", END)
	//   .compile({ checkpointer: checkpointer as any })
	throw new Error("Not implemented — complete Lesson 03, Step 2!");
}
