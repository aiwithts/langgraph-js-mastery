import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 26, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { END, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 26, Step 2): Understand the config.writer pattern for UI dispatch
//
// The config.writer function is how LangGraph nodes emit custom events.
// These events are streamed to the frontend as SSE events.
// Format:
//   config.writer?.({
//     type: "ui",
//     id: "unique-component-id",
//     component: "ComponentName",  // frontend knows how to render this
//     props: { ...componentData }, // data for the component
//   });
//
// The frontend can render any component based on the "component" field.

// TODO (Lesson 26, Step 3): Define uiAssistantNode
// - Get the user's request from the last message
// - Use LLM with structuredOutput to decide what component to render:
//   { componentType: z.enum(["InfoCard", "DataTable", "CodeBlock", "ProfileCard"]), data: z.any() }
//   OR: use keyword matching (simpler) — if "weather" → WeatherCard, if "stock" → StockChart
// - Dispatch the UI event: config.writer?.({ type: "ui", id: "component-1", component: ..., props: ... })
// - Also send a text message explaining what was rendered
// - Return: { messages: [response] }

// TODO (Lesson 26, Step 4): Build graph: START → uiAssistant → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 26, Step 5): Compile and return
	throw new Error("Not implemented — complete Lesson 26!");
}
