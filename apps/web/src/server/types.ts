import type { CompiledStateGraph, LangGraphRunnableConfig } from "@langchain/langgraph";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
import type { GraphInfo } from "@/types";

// Compiled graph — broad type so runGraph works with any lesson's graph
export type CompiledGraph = CompiledStateGraph<any, any, any, any, any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

// Input passed to graph.invoke / graph.stream (an object whose keys depend on the graph's state schema)
export type GraphInput = Record<string, unknown>;

// LangGraph config — carries thread_id, callbacks, and streaming metadata
export type GraphConfig = LangGraphRunnableConfig;

// Extended graph info with the graph builder
export interface RegisteredGraph extends GraphInfo {
	createGraph: (checkpointer?: PostgresSaver) => CompiledGraph | Promise<CompiledGraph>;
}

// Graph module export interface
export interface GraphModule {
	config: GraphInfo;
	createGraph: (checkpointer?: PostgresSaver) => CompiledGraph | Promise<CompiledGraph>;
}
