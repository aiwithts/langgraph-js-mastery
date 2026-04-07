import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "15-defining-tools",
	name: "Custom Tool Agent",
	description: "Runs an LLM bound to custom tools (calculator, search, get_time) that it calls to answer queries.",
	endpoint: "/api/stream-thread",
	persistent: true,
};
