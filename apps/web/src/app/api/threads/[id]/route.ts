import { NextResponse } from "next/server";
import { deleteThread } from "@/server/lib/threads";

// DELETE /api/threads/:id - Delete a thread
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id: threadId } = await params;

	try {
		const success = await deleteThread(threadId);
		if (!success) {
			return NextResponse.json({ error: "Thread not found" }, { status: 404 });
		}
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting thread:", error);
		return NextResponse.json({ error: "Failed to delete thread" }, { status: 500 });
	}
}
