import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "32-langgraph-platform-ui",
	name: "LangGraph Platform UI",
	description: "Wraps a deployed LangGraph Platform graph via RemoteGraph, delegating message processing to a remote graph.",
	endpoint: "/api/stream-ui",
	persistent: true,
};
