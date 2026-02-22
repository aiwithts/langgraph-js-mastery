"use client";

import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThreadControlsProps {
	onNewThread: () => void;
	onClearThread: () => void;
	hasThread?: boolean;
	loading?: boolean;
	disabled?: boolean;
}

export function ThreadControls({
	onNewThread,
	onClearThread,
	hasThread = false,
	loading = false,
	disabled = false,
}: ThreadControlsProps) {
	return (
		<div className="flex items-center gap-2">
			<Button variant="outline" size="sm" onClick={onNewThread} disabled={loading || disabled}>
				{loading ? (
					<Loader2 className="h-4 w-4 mr-2 animate-spin" />
				) : (
					<Plus className="h-4 w-4 mr-2" />
				)}
				New Thread
			</Button>
			{hasThread && (
				<Button variant="ghost" size="sm" onClick={onClearThread} disabled={loading || disabled}>
					<Trash2 className="h-4 w-4 mr-2" />
					Clear
				</Button>
			)}
		</div>
	);
}
