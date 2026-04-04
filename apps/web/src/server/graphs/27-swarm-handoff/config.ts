import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "27-swarm-handoff",
	name: "Agent Swarm & Handoff",
	description:
		"A customer service swarm where specialist agents self-select the next handler via transfer tools — no central orchestrator.",
	endpoint: "/api/stream-thread",
	persistent: true,
};
