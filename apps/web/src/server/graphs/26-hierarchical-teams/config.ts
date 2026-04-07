import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "26-hierarchical-teams",
	name: "Director and Team Leads",
	description: "A Director delegates design, engineering, and marketing to team leads in sequence, merging outputs into a final product brief.",
	endpoint: "/api/stream-thread",
	persistent: true,
};
