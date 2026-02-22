"use client";

import type { DisplayIntent } from "@/types";
import { AlertBanner, ForecastCard, WeatherWidget } from "./display";

interface DisplayIntentRendererProps {
	intents: DisplayIntent[];
}

// Component registry - maps component names to React components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentRegistry: Record<string, React.ComponentType<any>> = {
	WeatherWidget,
	ForecastCard,
	AlertBanner,
};

export function DisplayIntentRenderer({ intents }: DisplayIntentRendererProps) {
	if (!intents || intents.length === 0) {
		return null;
	}

	return (
		<div className="space-y-3 my-3">
			{intents.map((intent) => {
				const Component = componentRegistry[intent.component];

				if (!Component) {
					console.warn(`Unknown display intent component: ${intent.component}`);
					return (
						<div key={intent.id} className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
							Unknown component: {intent.component}
						</div>
					);
				}

				return <Component key={intent.id} {...intent.props} />;
			})}
		</div>
	);
}
