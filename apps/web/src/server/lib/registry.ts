import type { GraphInfo } from "@/types";
import type { GraphModule, RegisteredGraph } from "../types";

// Registry of all available graphs
const graphRegistry = new Map<string, RegisteredGraph>();

export function registerGraph(module: GraphModule): void {
	graphRegistry.set(module.config.id, {
		...module.config,
		createGraph: module.createGraph,
	});
	console.log(`Registered graph: ${module.config.id} - ${module.config.name}`);
}

export function getGraph(id: string): RegisteredGraph | undefined {
	return graphRegistry.get(id);
}

export function getAllGraphs(): GraphInfo[] {
	return Array.from(graphRegistry.values()).map(({ id, name, description, endpoint, resumeEndpoint }) => ({
		id,
		name,
		description,
		endpoint,
		resumeEndpoint,
	}));
}

export function hasGraph(id: string): boolean {
	return graphRegistry.has(id);
}
