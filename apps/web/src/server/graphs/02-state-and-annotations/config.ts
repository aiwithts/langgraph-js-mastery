import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "02-state-and-annotations",
	name: "Multi-Step State Processor",
	description: "Processes input through three nodes, tracking step count and log using custom state reducers.",
	endpoint: "/api/invoke",
};
