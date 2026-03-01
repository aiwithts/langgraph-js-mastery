import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "22-parallel-patterns",
	name: "Parallel Map-Reduce Processor",
	description: "Fans out items to parallel workers via the Send API and aggregates results with concat reducers.",
	endpoint: "/api/stream",
};
