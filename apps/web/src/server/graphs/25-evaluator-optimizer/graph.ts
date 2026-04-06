import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 26, Step 1): Add your imports

const QUALITY_THRESHOLD = 8;
const MAX_ITERATIONS = 3;

// TODO (Lesson 26, Step 2): Define OptimizerState

// TODO (Lesson 26, Step 3): Define generatorNode

// TODO (Lesson 26, Step 4): Define evaluatorNode

// TODO (Lesson 26, Step 5): Define optimizerNode

// TODO (Lesson 26, Step 6): Define finalizeNode

// TODO (Lesson 26, Step 7): Define shouldContinueOptimizing routing

// TODO (Lesson 26, Step 8): Build the optimizer loop

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 26, Step 9): Compile and return
	throw new Error("Not implemented — complete Lesson 26!");
}
