import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "40-evaluation-framework",
	name: "Evaluation Framework",
	description:
		"An evaluation harness for the customer service router using a dataset, LLM-as-judge, and trajectory validation — demonstrating why evals catch regressions that unit tests miss.",
	endpoint: "/api/stream-thread",
	persistent: true,
};
