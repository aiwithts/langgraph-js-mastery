import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "17-multimodal",
	name: "Vision Analysis Agent",
	description: "Accepts image URLs or base64 data and routes to describe, extract, or Q&A analysis modes.",
	endpoint: "/api/stream",
};
