import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "33-error-handling",
	name: "Resilient Chat Agent",
	description: "A chat agent that recovers from failures using retry, LLM fallbacks, and a circuit breaker.",
	endpoint: "/api/stream-ui",
};
