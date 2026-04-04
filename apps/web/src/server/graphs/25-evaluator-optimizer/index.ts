import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const graph25EvaluatorOptimizer: GraphModule = {
	config,
	createGraph,
};
