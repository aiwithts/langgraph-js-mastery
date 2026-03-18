import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "03-streaming-layer",
	name: "The Streaming Layer",
	description: "An echo graph wired to the streaming route — tokens flow token by token to the browser.",
	endpoint: "/api/stream",
};
