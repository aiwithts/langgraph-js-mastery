import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 36, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 36, Step 2): Validate environment at module load time
// function validateEnvironment() {
//   const required = ["DATABASE_URL"];
//   const optional = ["OPENAI_API_KEY", "ANTHROPIC_API_KEY"];
//   const missing = required.filter(key => !process.env[key]);
//   if (missing.length > 0) console.warn(`Missing env vars: ${missing.join(", ")}`);
//   const hasLLM = optional.some(key => process.env[key]);
//   if (!hasLLM) throw new Error("Set OPENAI_API_KEY or ANTHROPIC_API_KEY");
// }
// validateEnvironment();  // Uncomment after implementation

// TODO (Lesson 36, Step 3): Define model routing based on task type
// Different tasks benefit from different models:
//   - Classify: cheap/fast model (gpt-4o-mini or claude-3-5-haiku-latest)
//   - Reason: powerful model (gpt-4o or claude-3-5-sonnet-latest)
//   - Generate: balanced model
//
// function selectModel(taskType: "classify" | "reason" | "generate"): string {
//   if (process.env["OPENAI_API_KEY"]) {
//     return taskType === "classify" ? "gpt-4o-mini" : "gpt-4o";
//   }
//   return taskType === "classify" ? "claude-3-5-haiku-latest" : "claude-3-5-sonnet-latest";
// }

// TODO (Lesson 36, Step 4): Define ProductionState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   taskType: Annotation<string> — reducer replaces, default "generate"
//   modelUsed: Annotation<string> — reducer replaces, default ""

// TODO (Lesson 36, Step 5): Define classifyNode (fast/cheap model)
// - Classify the user's request: simple question, complex reasoning, or content generation
// - Use structuredOutput: { taskType: z.enum(["classify", "reason", "generate"]) }
// - Return: { taskType: result.taskType }

// TODO (Lesson 36, Step 6): Define reasoningNode (powerful model)
// - Use the model appropriate for reasoning tasks
// - Log the model selection: console.log(`Using model: ${modelName} for ${state.taskType}`)
// - Return: { messages: [response], modelUsed: modelName }

// TODO (Lesson 36, Step 7): Build production graph
// START → classify → (route by taskType) → reasoning | generate → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 36, Step 8): Compile and return (PostgresSaver for production persistence)
	throw new Error("Not implemented — complete Lesson 36!");
}
