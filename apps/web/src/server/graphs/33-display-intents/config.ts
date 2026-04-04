import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "33-display-intents",
	name: "Weather Display Intent Agent",
	description: "Emits structured display intents from graph state so any frontend can render weather UI components.",
	endpoint: "/api/stream-ui",
	persistent: true,
};
