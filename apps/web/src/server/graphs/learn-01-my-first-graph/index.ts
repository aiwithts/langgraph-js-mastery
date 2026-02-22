import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const learn01MyFirstGraphModule: GraphModule = {
	config,
	createGraph,
};
