"use client";

import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThreadControlsProps {
	onNewThread: () => void;
	label?: string;
	loading?: boolean;
	disabled?: boolean;
}

export function ThreadControls({
	onNewThread,
	label = "New Thread",
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
				{label}
			</Button>
		</div>
	);
}
