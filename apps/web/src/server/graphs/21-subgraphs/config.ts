import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "21-subgraphs",
	name: "Modular Subgraph Composition",
	description: "Extracts a topic from the user message and runs it through a self-contained summarizer subgraph.",
	endpoint: "/api/stream",
};
