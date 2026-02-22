"use client";

import { Loader2 } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { GraphInfo } from "@/types";

interface GraphSelectorProps {
	graphs: GraphInfo[];
	selectedGraphId: string | null;
	onSelect: (graphId: string) => void;
	loading?: boolean;
	disabled?: boolean;
}

export function GraphSelector({
	graphs,
	selectedGraphId,
	onSelect,
	loading = false,
	disabled = false,
}: GraphSelectorProps) {
	if (loading) {
		return (
			<div className="flex items-center gap-2 text-muted-foreground">
				<Loader2 className="h-4 w-4 animate-spin" />
				<span className="text-sm">Loading graphs...</span>
			</div>
		);
	}

	const selectedGraph = graphs.find((g) => g.id === selectedGraphId);

	return (
		<Select value={selectedGraphId ?? undefined} onValueChange={onSelect} disabled={disabled}>
			<SelectTrigger className="w-[200px]">
				<SelectValue placeholder="Select a graph...">{selectedGraph?.name}</SelectValue>
			</SelectTrigger>
			<SelectContent className="w-[320px]">
				{graphs.map((graph) => (
					<SelectItem key={graph.id} value={graph.id} className="py-2">
						<div className="flex flex-col gap-0.5">
							<span className="font-medium">{graph.name}</span>
							<span className="text-xs text-muted-foreground line-clamp-1">
								{graph.description}
							</span>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
