import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 30, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { END, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 30, Step 2): Define ComponentSchema using Zod
// Import { z } from "zod" and define:
//   const ComponentSchema = z.object({
//     componentType: z.enum(["InfoCard", "DataTable", "CodeBlock", "ProfileCard"])
//       .describe("Which component best suits this request"),
//     data: z.record(z.unknown()).describe("Props data for the component"),
//   });

// TODO (Lesson 30, Step 3): Define uiAssistantNode
// Signature: async function uiAssistantNode(state, config: LangGraphRunnableConfig)
// - Invoke createLLM().withStructuredOutput(ComponentSchema) with the conversation messages
// - Dispatch the UI event using config.writer:
//   config.writer?.({ type: "ui", id: "component-1", component: result.componentType, props: result.data })
// - Return: { messages: [new AIMessage(`Here's a ${result.componentType}...`)] }

// TODO (Lesson 30, Step 4): Build graph: START → uiAssistant → END
// Use new StateGraph(MessagesAnnotation).addNode(...).addEdge(...).addEdge(...)

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 30, Step 5): Compile and return
	// Replace this throw with: return workflow.compile({ checkpointer });
	throw new Error("Not implemented — complete Lesson 30!");
}
