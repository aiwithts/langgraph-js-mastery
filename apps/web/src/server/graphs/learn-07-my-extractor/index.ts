import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const learn07MyExtractor: GraphModule = {
	config,
	createGraph,
};
