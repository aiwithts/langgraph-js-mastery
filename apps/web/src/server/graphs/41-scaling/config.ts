import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "41-scaling",
	name: "Production-Ready Agent",
	description: "Capstone agent with PostgreSQL persistence, model routing by complexity, and all five production pillars.",
	endpoint: "/api/stream-ui",
	persistent: true,
};
