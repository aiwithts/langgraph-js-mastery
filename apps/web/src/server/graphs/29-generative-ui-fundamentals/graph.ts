import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 30, Step 1): Add your imports
// Import message types from @langchain/core/messages, graph primitives and config type
// from @langchain/langgraph, and the createLLM factory from ../../lib/llm.

// TODO (Lesson 30, Step 2): Define ComponentSchema using Zod
// Import z from "zod" and create an object schema with a constrained componentType field
// and a data field that holds arbitrary props for the selected component.

// TODO (Lesson 30, Step 3): Define uiAssistantNode
// The node receives state and a LangGraphRunnableConfig. Invoke the LLM with structured
// output to choose a component, dispatch a UI event via config.writer, and return a text
// AIMessage.

// TODO (Lesson 30, Step 4): Build graph: START → uiAssistant → END
// Use StateGraph with MessagesAnnotation, add the node, and wire the edges.

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 30, Step 5): Compile and return
	// Replace this throw with: return workflow.compile({ checkpointer });
	throw new Error("Not implemented — complete Lesson 30!");
}
