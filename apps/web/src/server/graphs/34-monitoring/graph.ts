import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 34, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { END, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";
// Optional (for LangSmith tracing):
//   import { traceable } from "langsmith/traceable";
//   Set env vars: LANGCHAIN_TRACING_V2=true, LANGCHAIN_API_KEY=ls__...

// TODO (Lesson 34, Step 2): Define a simple metrics tracker
// interface Metrics { totalRequests: number; totalTokensApprox: number; avgLatencyMs: number; }
// const metrics: Metrics = { totalRequests: 0, totalTokensApprox: 0, avgLatencyMs: 0 };

// TODO (Lesson 34, Step 3): Define observedAgentNode
// - Record start time: const startTime = Date.now();
// - Invoke the LLM (optionally wrap with traceable())
// - Record end time and compute latency
// - Update metrics
// - Emit a state_update event via config.writer:
//   config.writer?.({ type: "state_update", node: "agent", state: { latencyMs, tokensApprox, totalRequests } })
// - Return: { messages: [response] }

// TODO (Lesson 34, Step 4): Define metricsNode
// - Emit current metrics as a state_update event
// - Log to console
// - Return: {} (no state changes)

// TODO (Lesson 34, Step 5): Build graph: START → observe → metrics → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 34, Step 6): Compile and return
	throw new Error("Not implemented — complete Lesson 34!");
}
