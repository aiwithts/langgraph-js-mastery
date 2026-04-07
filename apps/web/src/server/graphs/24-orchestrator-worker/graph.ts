import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 25, Step 1): Add your imports
// import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
// import { Annotation, END, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
// import { z } from "zod";
// import { createLLM } from "../../lib/llm";

// TODO (Lesson 25, Step 2): Define TeamState

// TODO (Lesson 25, Step 3): Define worker nodes (webSearcherNode, analyzerNode)
// Both are INTERNAL nodes — suppress streaming: llm.invoke([...], { tags: ["langsmith:nostream"] })

// TODO (Lesson 25, Step 4): Define supervisorNode
// INTERNAL node — suppress streaming: llm.withStructuredOutput(...).invoke([...], { tags: ["langsmith:nostream"] })

// TODO (Lesson 25, Step 5): Define routeFromSupervisor

// TODO (Lesson 25, Step 6): Define reporterNode
// FINAL node — pass config as second arg to llm.invoke so the response streams to the client
// Accept (state, config: LangGraphRunnableConfig) and invoke with config; return { report, messages: [synthesized] }

// TODO (Lesson 25, Step 7): Build orchestrator-worker graph

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 25, Step 8): Compile and return
	throw new Error("Not implemented — complete Lesson 25!");
}
