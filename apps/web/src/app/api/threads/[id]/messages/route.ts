import { NextResponse } from "next/server";
import { getThreadMessages } from "@/server/lib/threads";

// GET /api/threads/:id/messages - Get messages for a thread
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id: threadId } = await params;

	try {
		const messages = await getThreadMessages(threadId);
		return NextResponse.json({ messages });
	} catch (error) {
		console.error("Error retrieving messages:", error);
		return NextResponse.json({ messages: [] });
	}
}
