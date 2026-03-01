import type { GraphInfo } from "@/types";

export const config: GraphInfo = {
	id: "09-thread-persistence",
	name: "Persistent Memory Tester",
	description: "Extracts personal facts from messages and remembers them across sessions using thread-based checkpointing.",
	endpoint: "/api/stream",
};
