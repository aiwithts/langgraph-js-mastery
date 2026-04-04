import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "21-advanced-routing-command",
	name: "Advanced Routing with Command",
	description:
		"A content moderation gateway using Command to combine state update and routing in one atomic node return.",
	endpoint: "/api/stream-thread",
	persistent: true,
};
