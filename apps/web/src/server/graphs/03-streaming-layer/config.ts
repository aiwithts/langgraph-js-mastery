import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "03-streaming-layer",
	name: "The Streaming Layer",
	description:
		"A minimal LLM chat graph — first wired to the invoke route, then upgraded to token-by-token streaming.",
	endpoint: "/api/invoke",
};
