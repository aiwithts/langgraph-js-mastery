import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 30, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { END, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 30, Step 2): Define simulated weather data
// interface WeatherData { temperature: number; unit: string; condition: string; humidity: number; windSpeed: number; location: string; forecast: Array<{day: string; high: number; low: number; condition: string}> }
//
// async function getWeatherData(location: string): Promise<WeatherData>
// Return mock data — no real API needed for this lesson.
// Example: { temperature: 22, unit: "C", condition: "Partly Cloudy", humidity: 65, windSpeed: 12, location, forecast: [...] }

// TODO (Lesson 30, Step 3): Define weatherNode
// - Use LLM with structuredOutput to extract the location from the user's message:
//   { location: z.string().describe("City or location name") }
// - OR: use simple text parsing (look for common city names in the message)
// - Fetch weather data: const weather = await getWeatherData(location)
// - Dispatch display intent:
//   config.writer?.({
//     type: "ui",
//     id: `weather-${Date.now()}`,
//     component: "WeatherCard",
//     props: weather,
//   });
// - Send text summary: "Here's the current weather for [location]: [condition], [temperature]°[unit]"
// - Return: { messages: [textSummary] }

// TODO (Lesson 30, Step 4): Build graph: START → weather → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 30, Step 5): Compile and return
	throw new Error("Not implemented — complete Lesson 30!");
}
