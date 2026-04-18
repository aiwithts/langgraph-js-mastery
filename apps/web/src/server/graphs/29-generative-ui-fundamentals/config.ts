import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "29-generative-ui-fundamentals",
	name: "Data Display Assistant",
	description: "Uses an LLM to select the right UI component (InfoCard, DataTable, CodeBlock, or ProfileCard) and streams it alongside a text explanation.",
	endpoint: "/api/stream-ui",
	persistent: true,
};
