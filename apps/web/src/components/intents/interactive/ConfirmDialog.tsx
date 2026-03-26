"use client";

import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ConfirmationIntent, IntentResponse } from "@/types";

interface ConfirmDialogProps {
	intent: ConfirmationIntent;
	onRespond: (response: IntentResponse) => void;
}

const severityConfig = {
	info: {
		icon: Info,
		iconColor: "text-blue-600",
		buttonVariant: "default" as const,
	},
	warning: {
		icon: AlertTriangle,
		iconColor: "text-yellow-600",
		buttonVariant: "default" as const,
	},
	danger: {
		icon: AlertCircle,
		iconColor: "text-red-600",
		buttonVariant: "destructive" as const,
	},
};

export function ConfirmDialog({ intent, onRespond }: ConfirmDialogProps) {
	const config = severityConfig[intent.severity] || severityConfig.info;
	const Icon = config.icon;

	const handleConfirm = () => {
		onRespond({
			intentId: intent.id,
			action: "submit",
		});
	};

	const handleCancel = () => {
		onRespond({
			intentId: intent.id,
			action: "cancel",
		});
	};

	return (
		<div className="w-full space-y-3">
			<div className="flex items-center gap-2">
				<Icon className={cn("h-5 w-5 shrink-0", config.iconColor)} />
				<span className="font-semibold text-base">{intent.title}</span>
			</div>

			<p className="text-sm text-muted-foreground leading-relaxed">{intent.message}</p>

			{intent.details && intent.details.length > 0 && (
				<div className="bg-muted/50 rounded-md p-3 space-y-1.5">
					{intent.details.map((detail) => (
						<div key={detail.label} className="flex justify-between text-sm">
							<span className="text-muted-foreground">{detail.label}</span>
							<span className="font-medium">{detail.value}</span>
						</div>
					))}
				</div>
			)}

			<div className="flex gap-2 pt-1">
				<Button variant="outline" size="sm" onClick={handleCancel}>
					Cancel
				</Button>
				<Button variant={config.buttonVariant} size="sm" onClick={handleConfirm}>
					Confirm
				</Button>
			</div>
		</div>
	);
}
