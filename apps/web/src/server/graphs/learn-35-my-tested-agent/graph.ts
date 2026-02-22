import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 35, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 35, Step 2): Design for testability with dependency injection
//
// Key principle: inject dependencies instead of creating them inside nodes.
// This makes nodes easy to test with mock dependencies.
//
// export interface AgentDependencies {
//   llm: ReturnType<typeof createLLM>;
// }
//
// The default dependencies (used in production):
// const defaultDeps: AgentDependencies = { llm: createLLM({ temperature: 0.7 }) };

// TODO (Lesson 35, Step 3): Create node factory that accepts dependencies
// function createAgentNode(deps: AgentDependencies) {
//   return async function agentNode(state: typeof MessagesAnnotation.State) {
//     const response = await deps.llm.invoke([
//       new SystemMessage("You are a helpful, testable assistant."),
//       ...state.messages,
//     ]);
//     return { messages: [response] };
//   };
// }

// TODO (Lesson 35, Step 4): Define validateOutputNode
// - Check the response meets quality criteria:
//   - Not empty
//   - Not too short (> 10 chars)
//   - Doesn't contain error indicators
// - This node is easy to unit test independently
// - If validation fails, replace with a safe fallback

// TODO (Lesson 35, Step 5): Build the graph (accepts optional deps for testing)
// export function createGraph(checkpointer?: PostgresSaver, deps?: AgentDependencies)
// If deps not provided, use defaultDeps
// START → agent → validateOutput → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 35, Step 6): Compile with injected dependencies
	throw new Error("Not implemented — complete Lesson 35!");
}
