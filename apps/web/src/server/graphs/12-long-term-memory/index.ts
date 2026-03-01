import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const graph12LongTermMemory: GraphModule = {
	config,
	createGraph,
};
