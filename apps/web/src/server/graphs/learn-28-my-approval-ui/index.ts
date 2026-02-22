import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const learn28MyApprovalUi: GraphModule = {
	config,
	createGraph,
};
