import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "20-routing",
	name: "Intent Classifier and Router",
	description: "Classifies customer requests by intent and routes to specialist handlers, with confidence-based triage for unclear inputs.",
	endpoint: "/api/stream",
};
