// TODO (Lesson 13, Step 3): Set up a MemoryVectorStore for semantic retrieval
// You'll need:
//   import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
//   import { Document } from "@langchain/core/documents";
//   import { OpenAIEmbeddings } from "@langchain/openai";
//   import { KNOWLEDGE_BASE } from "./knowledge";
//
// Implement:
//   let vectorStoreInstance: MemoryVectorStore | null = null; // singleton cache
//
//   export async function getVectorStore(): Promise<MemoryVectorStore>
//   - Creates Documents from KNOWLEDGE_BASE
//   - Builds MemoryVectorStore using OpenAIEmbeddings (model: "text-embedding-3-small")
//   - Caches the instance (don't re-embed on every call)
//
//   export async function getRetriever(k: number = 3)
//   - Gets the vector store and returns store.asRetriever({ k })

export async function getRetriever(k: number = 3): Promise<any> {
	throw new Error("Not implemented — complete Lesson 13! Set up your vector store in vector-store.ts");
}
