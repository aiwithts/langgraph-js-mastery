import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 28, Step 1): Add imports
// You'll need MessagesAnnotation, StateGraph, START, END from "@langchain/langgraph"
// and createLLM from "../../lib/llm"

// TODO (Lesson 28, Step 2): Define transfer tools (transferToGeneral, transferToTechnical, transferToBilling)
// Each tool accepts a reason string and signals a handoff to the named specialist.

// TODO (Lesson 28, Step 3): Define specialist agents (generalAgent, technicalAgent, billingAgent)
// Each agent is bound to its own LLM with only the transfer tools relevant to it.

// TODO (Lesson 28, Step 4): Define routing function
// Inspect the last message for tool calls and route to the requested specialist, or END.

// TODO (Lesson 28, Step 5): Build and compile the swarm graph
// Each specialist node connects via a conditional edge using the routing function.

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	throw new Error("Not implemented — complete Lesson 28!");
}
