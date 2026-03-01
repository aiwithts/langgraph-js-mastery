import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 28, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, Command, END, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph, interrupt } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 28, Step 2): Define ApprovalUIState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   pendingAction: Annotation<string | null> — reducer replaces, default null
//   approved: Annotation<boolean | null> — reducer replaces, default null

// TODO (Lesson 28, Step 3): Define analyzeNode
// - Determine what action the user wants (use LLM)
// - Set pendingAction
// - Dispatch a rich UI event showing the action and its consequences:
//   config.writer?.({
//     type: "ui",
//     id: "confirmation-card",
//     component: "ConfirmationCard",
//     props: {
//       title: "Action Requires Approval",
//       action: state.pendingAction,
//       severity: "warning",
//       details: [{ label: "What will happen", value: "..." }],
//     },
//   });
// - Return: { pendingAction: action, messages: [explanationMessage] }

// TODO (Lesson 28, Step 4): Define humanApprovalNode (interrupt point)
// - Use interrupt() with the pending action details
// - Use Command to update approved based on the human's decision
// - The human's response (from resume) should be "yes" or "no"

// TODO (Lesson 28, Step 5): Define executeNode and cancelNode
// executeNode: dispatch a success UI event + message
// cancelNode: dispatch a cancelled UI event + empathetic message

// TODO (Lesson 28, Step 6): Define routeAfterApproval
// Return "execute" or "cancel" based on state.approved

// TODO (Lesson 28, Step 7): Build graph
// START → analyze → humanApproval → (route) → execute | cancel → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 28, Step 8): Compile with checkpointer (required for interrupt!)
	throw new Error("Not implemented — complete Lesson 28!");
}
