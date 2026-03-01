import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "03-multi-turn-conversations",
	name: "LLM Chatbot with History",
	description: "LLM-powered chatbot that streams tokens and maintains full conversation history.",
	endpoint: "/api/stream",
};
