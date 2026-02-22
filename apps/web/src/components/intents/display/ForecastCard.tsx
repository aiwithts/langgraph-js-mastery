"use client";

import { Cloud, CloudFog, CloudRain, Snowflake, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ForecastDay {
	day: string;
	high: number;
	low: number;
	condition?: string;
}

interface ForecastCardProps {
	city: string;
	days: ForecastDay[];
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

export function ForecastCard({ city, days }: ForecastCardProps) {
	return (
		<Card className="w-full max-w-md">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg">{city} - 5 Day Forecast</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-5 gap-2">
					{days.map((day) => {
						const Icon = conditionIcons[day.condition?.toLowerCase() || "sunny"] || Sun;
						return (
							<div key={day.day} className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
								<span className="text-xs font-medium text-muted-foreground">{day.day}</span>
								<Icon className="h-6 w-6 my-1 text-blue-500" />
								<span className="text-sm font-bold">{day.high}°</span>
								<span className="text-xs text-muted-foreground">{day.low}°</span>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
