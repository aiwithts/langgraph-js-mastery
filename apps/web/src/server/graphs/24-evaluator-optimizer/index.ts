import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const graph24EvaluatorOptimizer: GraphModule = {
	config,
	createGraph,
};
