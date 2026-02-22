"use client";

import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertBannerProps {
	severity: "warning" | "watch" | "advisory" | "info";
	title: string;
	message: string;
	expires?: string;
}

const severityConfig = {
	warning: {
		icon: AlertTriangle,
		bg: "bg-red-50 dark:bg-red-950",
		border: "border-red-200 dark:border-red-800",
		text: "text-red-800 dark:text-red-200",
		iconColor: "text-red-600",
	},
	watch: {
		icon: AlertCircle,
		bg: "bg-orange-50 dark:bg-orange-950",
		border: "border-orange-200 dark:border-orange-800",
		text: "text-orange-800 dark:text-orange-200",
		iconColor: "text-orange-600",
	},
	advisory: {
		icon: Info,
		bg: "bg-yellow-50 dark:bg-yellow-950",
		border: "border-yellow-200 dark:border-yellow-800",
		text: "text-yellow-800 dark:text-yellow-200",
		iconColor: "text-yellow-600",
	},
	info: {
		icon: Info,
		bg: "bg-blue-50 dark:bg-blue-950",
		border: "border-blue-200 dark:border-blue-800",
		text: "text-blue-800 dark:text-blue-200",
		iconColor: "text-blue-600",
	},
};

export function AlertBanner({ severity, title, message, expires }: AlertBannerProps) {
	const config = severityConfig[severity] || severityConfig.info;
	const Icon = config.icon;

	return (
		<div className={cn("flex items-start gap-3 p-4 rounded-lg border", config.bg, config.border)}>
			<Icon className={cn("h-5 w-5 mt-0.5 shrink-0", config.iconColor)} />
			<div className="flex-1">
				<p className={cn("font-medium", config.text)}>{title}</p>
				<p className={cn("text-sm mt-1", config.text, "opacity-90")}>{message}</p>
				{expires && (
					<p className={cn("text-xs mt-2", config.text, "opacity-75")}>Expires: {expires}</p>
				)}
			</div>
		</div>
	);
}
