import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 25, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 25, Step 2): Define HierarchicalState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add these fields (all reducer replaces, default ""):
//   strategicGoal: string
//   designBrief: string
//   engineeringPlan: string
//   marketingAngle: string
//   finalReport: string

// TODO (Lesson 25, Step 3): Define directorNode
// The director sets strategic direction based on user input:
//   - System: "You are a product director. Define the strategic goal clearly and concisely."
//   - Return: { strategicGoal: response.content }

// TODO (Lesson 25, Step 4): Define team lead nodes
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

// TODO (Lesson 25, Step 5): Define synthesisNode
// Combines all team lead outputs into a final product plan:
//   - Include strategicGoal, designBrief, engineeringPlan, marketingAngle
//   - Format as a structured product brief
//   - Return: { finalReport: report, messages: [new AIMessage(report)] }

// TODO (Lesson 25, Step 6): Build graph
// Option A (sequential): START → director → design → engineering → marketing → synthesis → END
// Option B (parallel): Use Send API to call design, engineering, marketing in parallel
// Start with sequential (simpler), then try parallel as a bonus

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 25, Step 7): Compile and return
	throw new Error("Not implemented — complete Lesson 25!");
}
