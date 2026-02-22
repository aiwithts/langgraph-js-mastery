import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 24, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

const QUALITY_THRESHOLD = 8;
const MAX_ITERATIONS = 3;

// TODO (Lesson 24, Step 2): Define OptimizerState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   solution: Annotation<string> — reducer replaces, default ""
//   evaluation: Annotation<string> — reducer replaces, default ""
//   score: Annotation<number> — reducer replaces, default 0
//   iterations: Annotation<number> — reducer SUMS, default 0

// TODO (Lesson 24, Step 3): Define generatorNode
// - Get user's task from last message
// - Prompt: "Write a first implementation of: [task]. Focus on correctness."
// - Return: { solution: response.content, iterations: 1 }

// TODO (Lesson 24, Step 4): Define evaluatorNode
// - Use llm.withStructuredOutput({ score: z.number(), evaluation: z.string(), improvements: z.array(z.string()) })
// - Prompt: "Evaluate this solution on a scale of 0-10 for correctness, clarity, and edge cases"
// - Return: { evaluation: result.evaluation, score: result.score }

// TODO (Lesson 24, Step 5): Define optimizerNode
// - Given state.solution and state.evaluation:
//   "Improve this solution addressing the feedback: [evaluation]"
// - Return: { solution: improved.content, iterations: 1 }

// TODO (Lesson 24, Step 6): Define finalizeNode
// - Format the final solution with score and iteration info as a message
// - Return: { messages: [new AIMessage(formatted)] }

// TODO (Lesson 24, Step 7): Define shouldContinueOptimizing routing
// Continue (→ "optimize") if: state.score < QUALITY_THRESHOLD AND state.iterations < MAX_ITERATIONS
// Otherwise (→ "finalize")

// TODO (Lesson 24, Step 8): Build the optimizer loop
// START → generate → evaluate → (shouldContinue) → optimize → evaluate (loop back)
//                                                 → finalize → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 24, Step 9): Compile and return
	throw new Error("Not implemented — complete Lesson 24!");
}
