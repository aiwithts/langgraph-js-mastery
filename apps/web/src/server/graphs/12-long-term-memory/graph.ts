import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 12, Step 1): Add your imports
// You'll need:
//   import { type BaseMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, InMemoryStore, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { OpenAIEmbeddings } from "@langchain/openai";
//   import { z } from "zod";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 12, Step 2): Define MemoryExtraction schema
// z.object({
//   memories: z.array(z.object({
//     content: z.string().describe("A specific fact or preference about the user"),
//     type: z.enum(["preference", "fact", "project"]),
//   })).describe("Memories to store. Empty array if nothing memorable."),
// })

// TODO (Lesson 12, Step 3): Define MemoryState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add: relevantMemories: Annotation<string> — reducer replaces, default ""

// TODO (Lesson 12, Step 4): Define extractAndStoreNode
// - Get userId from config.configurable?.user_id ?? "default-user"
// - Get the store from config.store (throw if missing)
// - Use LLM with MemoryExtraction schema to extract facts from the last message
// - Store each memory: store.put([userId, "memories"], generateMemoryId(), memory)
// - Return: {}
// Helper: function generateMemoryId() { return `memory-${Date.now()}-${Math.random().toString(36).slice(2,8)}`; }

// TODO (Lesson 12, Step 5): Define retrieveMemoriesNode
// - Get userId and store from config
// - Search the store: store.search([userId, "memories"], { query: lastMessage.content, limit: 10 })
// - Format results into a string
// - Return: { relevantMemories: formattedString }

// TODO (Lesson 12, Step 6): Define chatNode
// - Build system prompt using state.relevantMemories (if any)
// - Be a great conversation partner, use memories to personalize
// - Return: { messages: [response] }

// TODO (Lesson 12, Step 7): Create the InMemoryStore with embeddings
// const memoryStore = new InMemoryStore({
//   index: { dims: 1536, embeddings: new OpenAIEmbeddings({ model: "text-embedding-3-small" }) },
// });

// TODO (Lesson 12, Step 8): Build graph: START → extract → retrieve → chat → END
// Compile with { checkpointer, store: memoryStore }

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 12, Step 9): Compile and return with store
	throw new Error("Not implemented — complete Lesson 12!");
}
