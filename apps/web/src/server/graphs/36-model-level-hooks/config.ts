import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "36-model-level-hooks",
	name: "Model-Level Hooks",
	description:
		"Adds pre- and post-model hooks to a guardrails agent to enforce context budget and PII filtering globally across all LLM calls.",
	endpoint: "/api/stream-thread",
	persistent: true,
};
