import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "11-embeddings-similarity",
	name: "Semantic Example Selector",
	description: "Selects relevant few-shot examples by semantic similarity using embeddings to improve LLM responses.",
	endpoint: "/api/stream",
};
