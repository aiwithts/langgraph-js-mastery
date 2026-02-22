import { NextResponse } from "next/server";
import "@/server/graphs/index";
import { hasGraph } from "@/server/lib/registry";
import { getLatestThread } from "@/server/lib/threads";

// GET /api/graphs/:id/threads/latest - Get the most recent thread for a graph
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id: graphId } = await params;

	if (!hasGraph(graphId)) {
		return NextResponse.json({ error: "Graph not found" }, { status: 404 });
	}

	try {
		const thread = await getLatestThread(graphId);
		return NextResponse.json({ thread });
	} catch (error) {
		console.error("Error fetching latest thread:", error);
		return NextResponse.json({ error: "Failed to fetch latest thread" }, { status: 500 });
	}
}
