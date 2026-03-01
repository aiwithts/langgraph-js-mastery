import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "32-guardrails",
	name: "Layered Security Agent",
	description: "Guards LLM input and output with injection detection, PII redaction, and output filtering.",
	endpoint: "/api/stream-ui",
};
