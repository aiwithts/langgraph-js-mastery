import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 18, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, Command, END, MessagesAnnotation, START, StateGraph, interrupt } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 18, Step 2): Define ApprovalState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   pendingAction: Annotation<string | null> — reducer replaces, default null
//   approved: Annotation<boolean | null> — reducer replaces, default null

// TODO (Lesson 18, Step 3): Define planNode
// - Inspect the user's request
// - Use LLM to determine what action should be taken
// - Return: { pendingAction: "action description", messages: [explanationMessage] }

// TODO (Lesson 18, Step 4): Define humanApprovalNode
// This is the interrupt point. The graph pauses here until resumed.
//
//   const decision = interrupt({
//     action: state.pendingAction,
//     question: "Do you approve this action? Reply 'yes' to approve or 'no' to cancel.",
//   });
//   // After resume, decision contains the human's response
//   return new Command({ update: { approved: decision === "yes" } });

// TODO (Lesson 18, Step 5): Define executeNode
// - If state.approved: simulate executing the action, return success message
// - Else: return cancellation message

// TODO (Lesson 18, Step 6): Define routeAfterApproval
// Return "execute" if state.approved === true, "execute" handles both cases

// TODO (Lesson 18, Step 7): Build graph
// START → plan → humanApproval → execute → END
// Note: humanApproval uses Command to update state, so it connects directly to execute

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 18, Step 8): Compile with checkpointer (required for interrupt to work!)
	throw new Error("Not implemented — complete Lesson 18!");
}
