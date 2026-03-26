import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 18, Step 1): Add imports

// TODO (Lesson 18, Step 2): Define ApprovalState

// TODO (Lesson 18, Step 3): Define planNode

// TODO (Lesson 18, Step 4): Define humanApprovalNode

// TODO (Lesson 18, Step 5): Define executeNode

// TODO (Lesson 18, Step 6): Build graph: START → plan → humanApproval → execute → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 18, Step 7): Compile with checkpointer (required for interrupt to work)
	throw new Error("Not implemented — complete Lesson 18!");
}
