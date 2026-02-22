import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const learn12LongTermMemoryModule: GraphModule = {
	config,
	createGraph,
};
