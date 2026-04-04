import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "24-orchestrator-worker",
	name: "Multi-Agent Orchestrator",
	description: "An orchestrator delegates to research, writer, and coder workers in sequence until the task is complete.",
	endpoint: "/api/stream-thread",
	persistent: true,
};
