import type { EnsembleRetriever } from "@langchain/classic/retrievers/ensemble";

// TODO (Lesson 15, Step 3): Build a singleton-cached hybrid retriever in getRetriever().
// Use the imports listed below. Cache the result in a module-level variable so it is
// only initialised once.
//
// You'll need:
//   import { EnsembleRetriever } from "@langchain/classic/retrievers/ensemble";
//   import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
//   import { BM25Retriever } from "@langchain/community/retrievers/bm25";
//   import { Document } from "@langchain/core/documents";
//   import { OpenAIEmbeddings } from "@langchain/openai";
//   import { KNOWLEDGE_BASE } from "./knowledge";

export async function getRetriever(k: number = 3): Promise<EnsembleRetriever> {
	throw new Error("Not implemented — complete Lesson 15! Set up your hybrid retriever in vector-store.ts");
}
