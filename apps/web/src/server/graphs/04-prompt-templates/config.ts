import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "04-prompt-templates",
	name: "Specialty Template Assistant",
	description: "Chat assistant that formats prompts via ChatPromptTemplate with a configurable {specialty} variable.",
	endpoint: "/api/stream",
};
