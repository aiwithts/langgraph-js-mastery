import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 13, Step 1): Add your imports
// You'll need:
//   import { type BaseMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, InMemoryStore, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { OpenAIEmbeddings } from "@langchain/openai";
//   import { z } from "zod";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 13, Step 2): Define MemoryExtraction schema
// A Zod object with a `memories` array. Each item has:
//   - content: string describing the specific fact or preference
//   - type: enum of "preference" | "fact" | "project"
// Allow an empty array when no memorable information is found.

// TODO (Lesson 13, Step 3): Define MemoryState
// Use Annotation.Root with ...MessagesAnnotation.spec
// Add: relevantMemories: Annotation<string> — reducer replaces, default ""

// TODO (Lesson 13, Step 4): Define extractAndStoreNode
// - Get userId from config.configurable?.user_id ?? "default-user"
// - Get the store from config.store (throw if missing)
// - Use LLM with MemoryExtraction schema to extract facts from the last message
// - Pass { tags: ["langsmith:nostream"] } to llm.invoke — suppresses streaming, keeps LangSmith trace
// - Store each memory: store.put([userId, "memories"], generateMemoryId(), memory)
// - Return: {}

// TODO (Lesson 13, Step 5): Define retrieveMemoriesNode
// - Get userId and store from config
// - Search the store: store.search([userId, "memories"], { query: lastMessage.content, limit: 10 })
// - Format results into a string
// - Return: { relevantMemories: formattedString }

// TODO (Lesson 13, Step 6): Define chatNode
// - Build system prompt using state.relevantMemories (if any)
// - Be a great conversation partner, use memories to personalize
// - Return: { messages: [response] }

// TODO (Lesson 13, Step 7): Create the InMemoryStore with embeddings at module level (outside createGraph)
// Use: new InMemoryStore({ index: { dims: 1536, embeddings: new OpenAIEmbeddings(...) } })

// Step 8 reference — sequential pipeline you will wire inside createGraph in Step 9:
// new StateGraph(MemoryState)
//   .addNode("extract", extractAndStoreNode)
//   .addNode("retrieve", retrieveMemoriesNode)
//   .addNode("chat", chatNode)
//   .addEdge(START, "extract")
//   .addEdge("extract", "retrieve")
//   .addEdge("retrieve", "chat")
//   .addEdge("chat", END)

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 13, Step 9): Compile and return with store
	throw new Error("Not implemented — complete Lesson 13!");
}
