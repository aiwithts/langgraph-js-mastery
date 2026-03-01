import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "14-advanced-rag",
	name: "Hybrid Retrieval RAG Assistant",
	description: "RAG assistant using hybrid BM25 and vector search for more accurate, grounded answers.",
	endpoint: "/api/stream",
};
