import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 15, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { ToolNode } from "@langchain/langgraph/prebuilt";
//   import { createLLM } from "../../lib/llm";
//   import { myTools } from "./tools";

// TODO (Lesson 15, Step 3): Define agentNode
// - const llm = createLLM({ temperature: 0 })
// - const llmWithTools = llm.bindTools!(myTools)
// - Invoke with [new SystemMessage("..."), ...state.messages]
// - Return: { messages: [response] }

// TODO (Lesson 15, Step 4): Define shouldContinue routing function
// - Get the last AI message
// - If it has tool_calls → return "tools"
// - Otherwise → return "end" (which maps to END)

// TODO (Lesson 15, Step 5): Build the ReAct loop
// Nodes: agent, tools (new ToolNode(myTools))
// START → agent → (shouldContinue) → tools ↩ agent | end → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 15, Step 6): Compile and return
	throw new Error("Not implemented — complete Lesson 15!");
}
