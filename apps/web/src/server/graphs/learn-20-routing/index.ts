import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const learn20Routing: GraphModule = {
	config,
	createGraph,
};
