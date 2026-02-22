import { NextResponse } from "next/server";
import "@/server/graphs/index";
import { hasGraph } from "@/server/lib/registry";
import { createThread, getThreadsByGraph } from "@/server/lib/threads";

// GET /api/graphs/:id/threads - List all threads for a graph
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id: graphId } = await params;

	if (!hasGraph(graphId)) {
		return NextResponse.json({ error: "Graph not found" }, { status: 404 });
	}

	try {
		const threads = await getThreadsByGraph(graphId);
		return NextResponse.json({ threads });
	} catch (error) {
		console.error("Error fetching threads:", error);
		return NextResponse.json({ error: "Failed to fetch threads" }, { status: 500 });
	}
}

// POST /api/graphs/:id/threads - Create a new thread
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id: graphId } = await params;

	if (!hasGraph(graphId)) {
		return NextResponse.json({ error: "Graph not found" }, { status: 404 });
	}

	try {
		const thread = await createThread(graphId);
		return NextResponse.json({ thread }, { status: 201 });
	} catch (error) {
		console.error("Error creating thread:", error);
		return NextResponse.json({ error: "Failed to create thread" }, { status: 500 });
	}
}
