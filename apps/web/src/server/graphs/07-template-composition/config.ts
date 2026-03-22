import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "07-template-composition",
	name: "Multi-Mode Prompt Assistant",
	description: "Routes messages to code, concept, or debug nodes using composed prompt templates.",
	endpoint: "/api/stream",
};
