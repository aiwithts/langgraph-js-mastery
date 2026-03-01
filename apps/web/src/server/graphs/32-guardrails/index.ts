import type { GraphModule } from "../../types";
import { config } from "./config";
import { createGraph } from "./graph";

export const graph32Guardrails: GraphModule = {
	config,
	createGraph,
};
