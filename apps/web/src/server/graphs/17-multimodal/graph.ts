import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 17, Step 1): Add your imports
// You'll need:
//   import { HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 17, Step 2): Understand multimodal message format
// To send an image to a vision model, the HumanMessage content is an ARRAY:
//   [
//     { type: "image_url", image_url: { url: "https://..." or "data:image/jpeg;base64,..." } },
//     { type: "text", text: "What is in this image?" }
//   ]
// The frontend sends messages where content may already be in this format.

// TODO (Lesson 17, Step 3): Define visionNode
// - Get the last message from state.messages
// - Pass it directly to the LLM (it may contain image content)
// - Use a vision-capable model: createLLM({ model: "gpt-4o" })
// - System prompt: "You are a helpful vision assistant. Analyze images carefully and describe what you see."
// - Return: { messages: [response] }
// Hint: Invoke with [new SystemMessage("..."), ...state.messages]

// TODO (Lesson 17, Step 4): Build graph: START → vision → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 17, Step 5): Compile and return
	throw new Error("Not implemented — complete Lesson 17!");
}
