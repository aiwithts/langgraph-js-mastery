import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 32, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 32, Step 2): Define SafeAgentState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   isSafe: Annotation<boolean> — reducer replaces, default true
//   violations: Annotation<string[]> — reducer appends, default []

// TODO (Lesson 32, Step 3): Define inputValidationNode
// Check the user's input for security issues:
//
// Prompt injection patterns:
//   - "ignore previous instructions"
//   - "jailbreak", "DAN mode", "pretend you are"
//   - "forget your guidelines"
//
// Harmful content requests:
//   - Requests for weapon synthesis, illegal activities
//
// PII in the request (should be anonymized):
//   - Email patterns: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
//   - SSN patterns: /\b\d{3}-\d{2}-\d{4}\b/
//   - Credit card patterns: /\b\d{4}[\s-]\d{4}[\s-]\d{4}[\s-]\d{4}\b/
//
// Return: { isSafe: boolean, violations: string[] }

// TODO (Lesson 32, Step 4): Define agentNode
// Normal LLM conversation — only runs if isSafe === true

// TODO (Lesson 32, Step 5): Define outputFilterNode
// Check the LLM's response for:
//   - Accidental PII leakage (same patterns)
//   - Harmful content
// If issues found, replace response with a safe fallback

// TODO (Lesson 32, Step 6): Define rejectNode
// Politely decline and explain what was detected (without being preachy)

// TODO (Lesson 32, Step 7): Build graph
// START → inputValidation → (if safe) → agent → outputFilter → END
//                         → (if not safe) → reject → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 32, Step 8): Compile and return
	throw new Error("Not implemented — complete Lesson 32!");
}
