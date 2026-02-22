"use client";

import { Cloud, CloudFog, CloudRain, Snowflake, Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherWidgetProps {
	city: string;
	temp: number;
	condition: string;
	humidity?: number;
}

const conditionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
	sunny: Sun,
	clear: Sun,
	cloudy: Cloud,
	rainy: CloudRain,
	rain: CloudRain,
	snow: Snowflake,
	humid: CloudFog,
	fog: CloudFog,
};

export function WeatherWidget({ city, temp, condition, humidity }: WeatherWidgetProps) {
	const Icon = conditionIcons[condition.toLowerCase()] || Sun;

	return (
		<Card className="w-full max-w-xs bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
			<CardContent className="p-4">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm opacity-90">{city}</p>
						<p className="text-4xl font-bold">{temp}°F</p>
						<p className="text-sm capitalize opacity-90">{condition}</p>
						{humidity !== undefined && (
							<p className="text-xs opacity-75 mt-1">Humidity: {humidity}%</p>
						)}
					</div>
					<Icon className="h-16 w-16 opacity-90" />
				</div>
			</CardContent>
		</Card>
	);
}
