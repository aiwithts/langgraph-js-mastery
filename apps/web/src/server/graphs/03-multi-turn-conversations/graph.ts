import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";
import { createLLM } from "../../lib/llm";
import type { CompiledGraph } from "../../types";
import type { LangGraphRunnableConfig } from "@langchain/langgraph";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Step 1): Define your chatbot's personality
// const SYSTEM_PROMPT = `You are a helpful and caring assistant...`;
// Make it your own — a coach, buddy, expert, or fictional character.

// TODO (Step 2): Define an async chatNode function
// - Signature: async function chatNode(state: typeof MessagesAnnotation.State, config: LangGraphRunnableConfig)
// - Create an LLM: const llm = createLLM()  (already implemented in Lesson 03)
// - Build messages: [new SystemMessage(SYSTEM_PROMPT), ...state.messages]
// - Invoke the LLM: const response = await llm.invoke(messages, config)  <-- pass config for token streaming
// - Return: { messages: [response] }

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Step 3): Build and compile the graph
	// 1. const workflow = new StateGraph(MessagesAnnotation)
	//      .addNode("chat", chatNode)
	//      .addEdge(START, "chat")
	//      .addEdge("chat", END)
	// 2. return workflow.compile({ checkpointer: checkpointer as any })
	throw new Error("Not implemented — complete Lesson 04, Step 3!");
}
