import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 41, Step 1): Add imports
// You'll need HumanMessage, SystemMessage from "@langchain/core/messages"
// Annotation, END, MessagesAnnotation, START, StateGraph from "@langchain/langgraph"
// z from "zod", and createLLM from "../../lib/llm"

// TODO (Lesson 41, Step 2): Define RouterState extending MessagesAnnotation.spec with category and response fields.

// TODO (Lesson 41, Step 3): Define classifyNode
// Use createLLM({ temperature: 0 }).withStructuredOutput(z.object({ category: z.enum([...]) }))
// Pass { tags: ["langsmith:nostream"] } to invoke
// Return { category: result.category }

// TODO (Lesson 41, Step 4): Define specialistNode
// Use state.category to select a domain-appropriate system prompt
// Invoke the LLM with that prompt and the full message history
// Return { response: responseText, messages: [response] }

// TODO (Lesson 41, Step 5): Build and compile the router graph
// Wire START → classify → specialist → END
// Compile with checkpointer and export via createGraph

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	throw new Error("Not implemented — complete Lesson 41!");
}
