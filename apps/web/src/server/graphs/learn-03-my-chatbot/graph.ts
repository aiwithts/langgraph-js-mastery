import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 03, Step 1): Add your imports
// You'll need:
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 03, Step 2): Define a system prompt for your chatbot personality
// const SYSTEM_PROMPT = `You are a helpful and caring assistant...`;
// Make it your own — a coach, buddy, expert, or fictional character.

// TODO (Lesson 03, Step 3): Define an async chatNode function
// - Create an LLM: createLLM({ temperature: 0.7 })
// - Build messages: [["system", SYSTEM_PROMPT], ...state.messages]
// - Invoke and return: { messages: [response] }

// TODO (Lesson 03, Step 4): Build the graph
// new StateGraph(MessagesAnnotation)
//   .addNode("chat", chatNode)
//   .addEdge(START, "chat")
//   .addEdge("chat", END)

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 03, Step 5): Compile and return
	throw new Error("Not implemented — complete Lesson 03!");
}
