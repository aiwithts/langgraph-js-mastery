import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "07-structured-output",
	name: "Data Extractor",
	description: "Extracts contacts, events, and action items from unstructured text using Zod schemas.",
	endpoint: "/api/stream",
};
