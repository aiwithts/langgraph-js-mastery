import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 16, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { ToolNode } from "@langchain/langgraph/prebuilt";
//   import { MultiServerMCPClient } from "@langchain/mcp-adapters";
//   import { createLLM } from "../../lib/llm";
//   import { handCodedTools } from "./tools";

// TODO (Lesson 16, Step 3): Set up MCP client for filesystem tools
// let mcpClient: MultiServerMCPClient | null = null;
//
// async function getMCPTools() {
//   if (!mcpClient) {
//     mcpClient = new MultiServerMCPClient({
//       filesystem: {
//         transport: "stdio",
//         command: "npx",
//         args: ["-y", "@modelcontextprotocol/server-filesystem", "./data"],
//       },
//     });
//     await mcpClient.initializeConnections();
//   }
//   return mcpClient.getTools();
// }

// TODO (Lesson 16, Step 4): Define the SYSTEM_PROMPT
// Explain what tools the agent has and how it should think step by step

// TODO (Lesson 16, Step 5): Define async agentNode
// - Get MCP tools + handCodedTools
// - Bind all tools to LLM
// - Invoke with system prompt + state.messages
// - Return: { messages: [response] }

// TODO (Lesson 16, Step 6): Define shouldContinue routing
// Check for tool_calls on last message → "tools" or "end"

// TODO (Lesson 16, Step 7): Build graph (async createGraph)
// Get MCP tools, create ToolNode with all tools
// START → agent → (shouldContinue) → tools ↩ agent | end → END

export async function createGraph(checkpointer?: PostgresSaver): Promise<CompiledGraph> {
	// TODO (Lesson 16, Step 8): Compile and return
	throw new Error("Not implemented — complete Lesson 16!");
}
