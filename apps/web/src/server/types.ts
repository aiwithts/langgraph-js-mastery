import type { CompiledStateGraph } from "@langchain/langgraph";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
import type { GraphInfo } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CompiledGraph = CompiledStateGraph<any, any, any, any, any, any>;

// Extended graph info with the graph builder
export interface RegisteredGraph extends GraphInfo {
	createGraph: (checkpointer?: PostgresSaver) => CompiledGraph | Promise<CompiledGraph>;
}

// Graph module export interface
export interface GraphModule {
	config: GraphInfo;
	createGraph: (checkpointer?: PostgresSaver) => CompiledGraph | Promise<CompiledGraph>;
}
