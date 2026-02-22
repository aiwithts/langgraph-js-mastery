import { NextResponse } from "next/server";
import "@/server/graphs/index";
import { getAllGraphs } from "@/server/lib/registry";

export async function GET() {
	const graphs = getAllGraphs();
	return NextResponse.json({ graphs });
}
