import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "34-monitoring",
	name: "Observable Agent with Metrics",
	description: "Instruments a ReAct agent with callback handlers to track token usage, latency, and LLM cost.",
	endpoint: "/api/stream-ui",
};
