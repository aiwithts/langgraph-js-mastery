import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "25-evaluator-optimizer",
	name: "Code Generator With Feedback Loop",
	description: "Generates TypeScript code, scores it against quality criteria, and refines it until the threshold is met.",
	endpoint: "/api/stream-thread",
	persistent: true,
};
