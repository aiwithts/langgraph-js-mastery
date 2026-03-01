import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "12-long-term-memory",
	name: "Memory-Enhanced Assistant",
	description: "Extracts facts from messages and retrieves them semantically across threads.",
	endpoint: "/api/stream",
};
