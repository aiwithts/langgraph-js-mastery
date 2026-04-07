import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 10, Step 1): Add your imports
// You'll need:
//   import { type BaseMessageLike, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { z } from "zod";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 10, Step 2): Define schemas for fact extraction
// FactsSchema: z.object({
//   category: z.enum(["name", "preference", "personal", "other"]),
//   value: z.string().describe("Fact stated as: 'The user is...', 'The user likes...'"),
// })
// ExtractionSchema: z.object({ facts: z.array(FactsSchema).default([]) })

// TODO (Lesson 10, Step 3): Define MemoryState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   messageCount: Annotation<number> — reducer sums (current + next), default 0
//   facts: Annotation<FactsSchemaArray> — reducer appends arrays, default []

// TODO (Lesson 10, Step 4): Define extractNode
// - Use structuredLlm to extract facts about the user from the last message
// - System prompt: extract specific facts about the user (name, preferences, personal info)
// - Invoke with { tags: ["langsmith:nostream"] } to suppress JSON from the streamed output
// - Return: { facts: result.facts, messageCount: 1 }

// TODO (Lesson 10, Step 5): Define respondNode
// - System prompt: be a delightful conversationalist, subtly curious about the user
//   Include this instruction: "Start with the message number (#1, #2, etc.)"
//   Include known facts to personalize the response
// - Return: { messages: [response] }

// TODO (Lesson 10, Step 6): Planning step — sketch the graph shape here (nodes + edges).
// The actual runnable code (including .compile()) goes into Step 7 inside createGraph below.
// Graph shape: START → extract → respond → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 10, Step 7): Build and compile the full graph with checkpointer (persistence requires it!)
	// Use the structure you planned in Step 6 above, then call .compile({ checkpointer: checkpointer as any })
	throw new Error("Not implemented — complete Lesson 10!");
}
