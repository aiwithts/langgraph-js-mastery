import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "17-multimodal",
	name: "Vision Analysis Agent",
	description: "Accepts image URLs or base64 data and returns a vision analysis from a vision-capable LLM.",
	endpoint: "/api/stream-thread",
	persistent: true,
};
