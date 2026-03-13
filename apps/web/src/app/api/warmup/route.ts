/**
 * GET /api/warmup
 *
 * Pre-warms all expensive server resources in one request:
 *   - Graph registry   — all 36 graphs registered + validated
 *   - PostgreSQL pool  — connection established, kept alive
 *   - Checkpointer     — LangGraph checkpoint tables created (setup)
 *   - Threads table    — ensureInitialized() run via getLatestThread
 *
 * ChatContainer calls this endpoint on mount so compilation and DB
 * initialization happen in the background, not on the user's first message.
 */

import "@/server/graphs/index";
import { getCheckpointer } from "@/server/lib/checkpointer";
import { getAllGraphs } from "@/server/lib/registry";
import { getLatestThread } from "@/server/lib/threads";

export async function GET() {
	// Initialize pool + create LangGraph checkpoint tables (idempotent)
	await getCheckpointer();

	// Create threads table via ensureInitialized (called internally)
	await getLatestThread("__warmup__");

	return Response.json({ ready: true, graphs: getAllGraphs().length });
}