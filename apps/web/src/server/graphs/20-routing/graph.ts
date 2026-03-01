import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 20, Step 1): Add your imports
// You'll need:
//   import { HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import type { LangGraphRunnableConfig } from "@langchain/langgraph";
//   import { z } from "zod";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 20, Step 2): Define RouterState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   category: Annotation<string> — reducer replaces, default "general"
//   confidence: Annotation<number> — reducer replaces, default 0

// TODO (Lesson 20, Step 3): Define ClassificationSchema using Zod
// z.object({
//   category: z.enum(["billing", "technical", "general"]).describe("Best matching category"),
//   confidence: z.number().min(0).max(1).describe("Classification confidence"),
//   reasoning: z.string().describe("Why this category was chosen"),
// })

// TODO (Lesson 20, Step 4): Define classifierNode
// - Use llm.withStructuredOutput(ClassificationSchema) to classify the user request
// - System prompt explains the three categories with clear examples:
//   billing: payments, invoices, subscriptions, refunds
//   technical: bugs, errors, API issues, how-to questions
//   general: account info, policies, general inquiries
// - Return: { category: result.category, confidence: result.confidence }

// TODO (Lesson 20, Step 5): Define 4 handler nodes
// Each has a specialized system prompt:
//   billingHandler: billing specialist, empathetic about payment frustrations
//   technicalHandler: technical expert, step-by-step solutions
//   generalHandler: friendly customer service rep
//   triageNode: asks clarifying question when confidence < 0.7

// TODO (Lesson 20, Step 6): Define routeByCategory
// If confidence < 0.7 → "triage"
// Switch on category: billing → "billingHandler", technical → "technicalHandler", else → "generalHandler"

// TODO (Lesson 20, Step 7): Build graph
// START → classifier → (routeByCategory) → billing|technical|general|triage → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 20, Step 8): Compile and return
	throw new Error("Not implemented — complete Lesson 20!");
}
