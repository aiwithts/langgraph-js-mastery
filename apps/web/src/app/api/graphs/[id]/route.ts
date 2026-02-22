import { NextResponse } from "next/server";
import "@/server/graphs/index";
import { getGraph } from "@/server/lib/registry";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const graph = getGraph(id);

	if (!graph) {
		return NextResponse.json({ error: "Graph not found" }, { status: 404 });
	}

	return NextResponse.json({
		id: graph.id,
		name: graph.name,
		description: graph.description,
	});
}
