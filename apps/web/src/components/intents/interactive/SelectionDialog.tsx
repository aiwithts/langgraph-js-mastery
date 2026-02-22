"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { IntentResponse, SelectionIntent } from "@/types";

interface SelectionDialogProps {
	intent: SelectionIntent;
	onRespond: (response: IntentResponse) => void;
}

export function SelectionDialog({ intent, onRespond }: SelectionDialogProps) {
	const [selected, setSelected] = useState<string | null>(null);

	const handleSubmit = () => {
		if (selected) {
			onRespond({
				intentId: intent.id,
				action: "submit",
				data: selected,
			});
		}
	};

	const handleCancel = () => {
		onRespond({
			intentId: intent.id,
			action: "cancel",
		});
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-lg">{intent.prompt}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				{intent.options.map((option) => (
					<button
						key={option.value}
						onClick={() => setSelected(option.value)}
						className={cn(
							"w-full flex items-center justify-between p-3 rounded-lg border transition-colors text-left",
							selected === option.value
								? "border-primary bg-primary/5"
								: "border-border hover:bg-muted/50",
						)}
					>
						<span>{option.label}</span>
						{selected === option.value && <Check className="h-4 w-4 text-primary" />}
					</button>
				))}
			</CardContent>
			<CardFooter className="flex justify-end gap-2">
				<Button variant="outline" onClick={handleCancel}>
					Cancel
				</Button>
				<Button onClick={handleSubmit} disabled={!selected}>
					Continue
				</Button>
			</CardFooter>
		</Card>
	);
}
