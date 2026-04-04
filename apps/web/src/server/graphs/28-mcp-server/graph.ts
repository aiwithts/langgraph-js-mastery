import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 29, Step 1): Add imports
// You'll need MessagesAnnotation, StateGraph, START, END from "@langchain/langgraph"
// and createLLM from "../../lib/llm"

// TODO (Lesson 29, Step 2): Define researchNode
// This is the agent that will be exposed via MCP — it should respond to research queries.

// TODO (Lesson 29, Step 3): Define the graph and build it
// Wire START → research → END

// TODO (Lesson 29, Step 4): Expose the graph as an MCP tool (optional — for advanced step)
// Use @modelcontextprotocol/sdk to wrap the compiled graph as an MCP-callable tool.

export async function createGraph(checkpointer?: PostgresSaver): Promise<CompiledGraph> {
	throw new Error("Not implemented — complete Lesson 29!");
}
