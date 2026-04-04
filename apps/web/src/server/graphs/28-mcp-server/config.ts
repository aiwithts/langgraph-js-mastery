import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "28-mcp-server",
	name: "LangGraph as MCP Server",
	description:
		"Exposes a compiled LangGraph research agent as an MCP server endpoint consumable by any MCP client.",
	endpoint: "/api/stream-thread",
	persistent: true,
};
