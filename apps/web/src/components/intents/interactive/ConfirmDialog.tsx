"use client";

import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<div className="flex items-center gap-3">
					<Icon className={cn("h-6 w-6", config.iconColor)} />
					<CardTitle className="text-lg">{intent.title}</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<p className="text-muted-foreground">{intent.message}</p>

				{intent.details && intent.details.length > 0 && (
					<div className="bg-muted/50 rounded-lg p-4 space-y-2">
						{intent.details.map((detail) => (
							<div key={detail.label} className="flex justify-between text-sm">
								<span className="text-muted-foreground">{detail.label}</span>
								<span className="font-medium">{detail.value}</span>
							</div>
						))}
					</div>
				)}
			</CardContent>
			<CardFooter className="flex justify-end gap-2">
				<Button variant="outline" onClick={handleCancel}>
					Cancel
				</Button>
				<Button variant={config.buttonVariant} onClick={handleConfirm}>
					Confirm
				</Button>
			</CardFooter>
		</Card>
	);
}
