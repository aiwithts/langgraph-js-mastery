import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const learn03MyChatbot: GraphModule = {
	config,
	createGraph,
};
