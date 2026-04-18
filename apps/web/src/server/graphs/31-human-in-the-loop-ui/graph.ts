import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 32, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph, interrupt } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 32, Step 2): Define ApprovalUIState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   pendingAction: Annotation<string | null> — reducer replaces, default null
//   approved: Annotation<boolean | null> — reducer replaces, default null

// TODO (Lesson 32, Step 3): Define analyzeNode
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

// TODO (Lesson 32, Step 4): Define humanApprovalNode (interrupt point)
// - Use interrupt() with the pending action details
// - The human's response (from resume) will be "yes" or "no"
// - Return { approved } based on whether the response is "yes"

// TODO (Lesson 32, Step 5): Define executeNode and cancelNode
// executeNode: dispatch a success UI event + message
// cancelNode: dispatch a cancelled UI event + empathetic message

// TODO (Lesson 32, Step 6): Define routeAfterApproval
// Return "execute" or "cancel" based on state.approved

// TODO (Lesson 32, Step 7): Build graph
// START → analyze → humanApproval → (route) → execute | cancel → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 32, Step 8): Compile with checkpointer (required for interrupt!)
	throw new Error("Not implemented — complete Lesson 32!");
}
