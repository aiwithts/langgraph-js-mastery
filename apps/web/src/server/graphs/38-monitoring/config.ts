import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "38-monitoring",
	name: "Observable Agent with Metrics",
	description: "Instruments a LangGraph agent to track latency and token estimates inside nodes, emitting metrics via config.writer.",
	endpoint: "/api/stream-ui",
	persistent: true,
};
