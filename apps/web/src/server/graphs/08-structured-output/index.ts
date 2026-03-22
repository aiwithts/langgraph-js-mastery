import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const graph08StructuredOutput: GraphModule = {
	config,
	createGraph,
};
