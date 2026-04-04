import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const graph28McpServer: GraphModule = {
	config,
	createGraph,
};
