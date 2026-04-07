import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 26, Step 1): Add your imports
// import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
// import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
// import { z } from "zod";
// import { createLLM } from "../../lib/llm";

const QUALITY_THRESHOLD = 8;
const MAX_ITERATIONS = 3;

// TODO (Lesson 26, Step 2): Define OptimizerState

// TODO (Lesson 26, Step 3): Define generatorNode
// INTERNAL node — suppress streaming: llm.invoke([...], { tags: ["langsmith:nostream"] })

// TODO (Lesson 26, Step 4): Define evaluatorNode
// INTERNAL node — suppress streaming: llm.withStructuredOutput(...).invoke([...], { tags: ["langsmith:nostream"] })

// TODO (Lesson 26, Step 5): Define optimizerNode
// INTERNAL node — suppress streaming: llm.invoke([...], { tags: ["langsmith:nostream"] })

// TODO (Lesson 26, Step 6): Define finalizeNode
// No LLM call needed — just format the solution and return { messages: [new AIMessage(formatted)] }

// TODO (Lesson 26, Step 7): Define shouldContinueOptimizing routing

// TODO (Lesson 26, Step 8): Build the optimizer loop

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 26, Step 9): Compile and return
	throw new Error("Not implemented — complete Lesson 26!");
}
