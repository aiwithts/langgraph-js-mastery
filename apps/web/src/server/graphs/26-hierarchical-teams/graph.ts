import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 27, Step 1): Add your imports
// You'll need:
//   import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 27, Step 2): Define HierarchicalState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add these fields (all reducer replaces, default ""):
//   strategicGoal: string
//   designBrief: string
//   engineeringPlan: string
//   marketingAngle: string
//   finalReport: string

// TODO (Lesson 27, Step 3): Define directorNode
// INTERNAL node — suppress streaming: llm.invoke([...], { tags: ["langsmith:nostream"] })
//   - System: "You are a product director. Define the strategic goal clearly and concisely."
//   - Return: { strategicGoal: response.content }

// TODO (Lesson 27, Step 4): Define team lead nodes (designLeadNode, engineeringLeadNode, marketingLeadNode)
// All are INTERNAL nodes — suppress streaming: llm.invoke([...], { tags: ["langsmith:nostream"] })
//
// designLeadNode:
//   - System: "You are a design lead. Create a user-centered design brief."
//   - Context: state.strategicGoal
//   - Return: { designBrief: response.content }
//
// engineeringLeadNode:
//   - System: "You are an engineering lead. Create a technical implementation plan."
//   - Context: state.strategicGoal
//   - Return: { engineeringPlan: response.content }
//
// marketingLeadNode:
//   - System: "You are a marketing lead. Define the marketing angle and key messages."
//   - Context: state.strategicGoal
//   - Return: { marketingAngle: response.content }

// TODO (Lesson 27, Step 5): Define synthesisNode
// FINAL node — accept (state, config: LangGraphRunnableConfig) and pass config to llm.invoke
//   - Include strategicGoal, designBrief, engineeringPlan, marketingAngle
//   - Format as a structured product brief
//   - Return: { finalReport: report, messages: [response] } — use the response object, not new AIMessage(report)

// TODO (Lesson 27, Step 6): Build graph
// Option A (sequential): START → director → design → engineering → marketing → synthesis → END
// Option B (parallel): Use Send API to call design, engineering, marketing in parallel
// Start with sequential (simpler), then try parallel as a bonus

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 27, Step 7): Compile and return
	throw new Error("Not implemented — complete Lesson 27!");
}
