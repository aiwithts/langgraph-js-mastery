import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const learn36MyProductionAgent: GraphModule = {
	config,
	createGraph,
};
