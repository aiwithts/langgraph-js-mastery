import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "34-interactive-intents",
	name: "Multi-Step Interactive Wizard",
	description: "A trading assistant that detects buy/sell/info intent and routes across multiple invocations using state-driven routing — no interrupt() required.",
	endpoint: "/api/stream-ui",
	resumeEndpoint: "/api/resume-ui",
	persistent: true,
};
