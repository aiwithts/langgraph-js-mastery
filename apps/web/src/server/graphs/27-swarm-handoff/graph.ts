import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 28, Step 1): Add imports
// You'll need: createReactAgent from "@langchain/langgraph/prebuilt"
// tool from "@langchain/core/tools", AIMessage from "@langchain/core/messages"
// Annotation, END, MessagesAnnotation, START, StateGraph from "@langchain/langgraph"
// z from "zod", and createLLM from "../../lib/llm"

// TODO (Lesson 28, Step 2): Define SwarmState
// Spread MessagesAnnotation.spec and add a handoffCount field with a sum reducer
// (reducer: (curr, next) => curr + next) defaulting to 0.

// TODO (Lesson 28, Step 3): Define transfer tools (transferToBilling, transferToTechnical, transferToGeneral)
// Each tool accepts an empty Zod schema (z.object({})) and returns a transfer message string.

// TODO (Lesson 28, Step 4): Define domain tools
// Define at least one domain tool per agent — stub implementations returning mock answers
// relevant to billing, technical, or general queries.

// TODO (Lesson 28, Step 5): Define specialist agents (generalAgent, billingAgent, technicalAgent)
// Use createReactAgent for each. Pass the LLM, its domain tools, and the two transfer tools
// for the other agents.

// TODO (Lesson 28, Step 6): Define routeFromAgent
// Check handoffCount >= 5 first (convergence guard), then inspect tool_calls on the last
// message and return the target agent name or END.

// TODO (Lesson 28, Step 7): Build and compile the swarm graph
// Wire: START → generalAgent, conditional edge from each agent via routeFromAgent.
// Compile with the checkpointer and export from createGraph.

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	throw new Error("Not implemented — complete Lesson 28!");
}
