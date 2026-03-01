import type { LangGraphRunnableConfig } from "@langchain/langgraph";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 03, Step 1): Add your imports
// You'll need:
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { SystemMessage } from "@langchain/core/messages";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 03, Step 2): Define a system prompt for your chatbot personality
// const SYSTEM_PROMPT = `You are a helpful and caring assistant...`;
// Make it your own — a coach, buddy, expert, or fictional character.

// TODO (Lesson 03, Step 3): Define an async chatNode function
// - Signature: async function chatNode(state: typeof MessagesAnnotation.State, config: LangGraphRunnableConfig)
// - Create an LLM: createLLM()
// - Build messages: [new SystemMessage(SYSTEM_PROMPT), ...state.messages]
// - Invoke the LLM: await llm.invoke(messages, config)  <-- pass config for token streaming
// - Return: { messages: [response] }

// TODO (Lesson 03, Step 4): Build the graph
// new StateGraph(MessagesAnnotation)
//   .addNode("chat", chatNode)
//   .addEdge(START, "chat")
//   .addEdge("chat", END)

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 03, Step 5): Compile and return
	throw new Error("Not implemented — complete Lesson 03!");
}
