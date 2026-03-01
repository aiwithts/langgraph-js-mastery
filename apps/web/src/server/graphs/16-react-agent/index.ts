import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const graph16ReactAgent: GraphModule = {
	config,
	createGraph,
};
