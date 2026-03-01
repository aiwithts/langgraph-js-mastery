import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 23, Step 1): Add your imports
// You'll need:
//   import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 23, Step 2): Define TeamState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   task: Annotation<string> — reducer replaces, default ""
//   findings: Annotation<string[]> — reducer APPENDS, default []
//   report: Annotation<string> — reducer replaces, default ""
//   next: Annotation<string> — reducer replaces, default ""

// TODO (Lesson 23, Step 3): Define worker agent nodes
//
// webSearcherNode: simulates web search
//   - "Search" for information about state.task
//   - Return mock search results as a finding
//   - Return: { findings: ["Web search found: ..."] }
//
// analyzerNode: analyzes and synthesizes
//   - Analyze the task and provide expert analysis
//   - Return: { findings: ["Analysis: ..."] }

// TODO (Lesson 23, Step 4): Define supervisorNode
// The supervisor decides which worker to call next (or "FINISH"):
//   - Use llm.withStructuredOutput to get { next: "webSearcher" | "analyzer" | "FINISH" }
//   - System prompt explains available workers and their specialties
//   - Return: { next: result.next }

// TODO (Lesson 23, Step 5): Define routeFromSupervisor
// function routeFromSupervisor(state: typeof TeamState.State): string
//   - If state.next === "FINISH" → return END (or "report")
//   - Otherwise → return state.next (worker node name)

// TODO (Lesson 23, Step 6): Define reportNode
// - Synthesize all state.findings into a final report
// - Add report as a message
// - Return: { report: synthesized, messages: [new AIMessage(synthesized)] }

// TODO (Lesson 23, Step 7): Build orchestrator-worker graph
// Nodes: supervisor, webSearcher, analyzer, report
// START → supervisor → (routeFromSupervisor) → webSearcher | analyzer → supervisor (loop)
// When FINISH: → report → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 23, Step 8): Compile and return
	throw new Error("Not implemented — complete Lesson 23!");
}
