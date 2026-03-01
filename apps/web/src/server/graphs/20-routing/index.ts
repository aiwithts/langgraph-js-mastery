import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const graph20Routing: GraphModule = {
	config,
	createGraph,
};
