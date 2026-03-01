import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "08-putting-it-together",
	name: "Swiss Army Knife Assistant",
	description: "Classifies user intent into explain, extract, or create modes and routes to a specialized handler.",
	endpoint: "/api/stream",
};
