"use client";

import type { IntentResponse, InteractiveIntent } from "@/types";
import { ConfirmDialog, FormDialog, SelectionDialog } from "./interactive";

interface InteractiveIntentHandlerProps {
	intent: InteractiveIntent;
	onRespond: (response: IntentResponse) => void;
}

export function InteractiveIntentHandler({ intent, onRespond }: InteractiveIntentHandlerProps) {
	switch (intent.kind) {
		case "selection":
			return <SelectionDialog intent={intent} onRespond={onRespond} />;

		case "form":
			return <FormDialog intent={intent} onRespond={onRespond} />;

		case "confirmation":
			return <ConfirmDialog intent={intent} onRespond={onRespond} />;

		default:
			console.warn("Unknown interactive intent kind:", (intent as { kind: string }).kind);
			return (
				<div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
					Unknown intent type: {(intent as { kind: string }).kind}
				</div>
			);
	}
}
