/**
 * Next.js Instrumentation Hook
 *
 * Runs once when the server process starts. Importing the graph registry here
 * warms the Turbopack module cache so subsequent API route compilations are
 * noticeably faster — each route would otherwise compile all 36 graphs and
 * their dependencies (LangChain, LangGraph, Anthropic SDK, pg) from scratch.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		await import("./server/graphs/index");
	}
}