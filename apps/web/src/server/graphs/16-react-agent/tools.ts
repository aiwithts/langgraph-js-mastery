// TODO (Lesson 16, Step 2): Define your hand-coded tools using the tool() decorator
// You'll need:
//   import { tool } from "@langchain/core/tools";
//   import { z } from "zod";
//
// Implement these 3 tools:
//
// searchTool: simulates web search
//   name: "search"
//   description: "Search for factual information. Use when you need data or facts."
//   schema: z.object({ query: z.string().describe("The search query") })
//   implementation: return hardcoded responses for known queries (e.g., city populations)
//     If unknown, return a generic "Search results for X: information found but unavailable"
//
// calculatorTool: evaluates math expressions safely
//   name: "calculator"
//   description: "Evaluate mathematical expressions. Use for any arithmetic or calculations."
//   schema: z.object({ expression: z.string().describe("Math expression like '2 + 3 * 4'") })
//   implementation: use Function() to evaluate, catch errors and return error message
//
// timeTool: returns current date/time in a timezone
//   name: "get_time"
//   description: "Get the current date and time in a specified timezone."
//   schema: z.object({ timezone: z.string().describe("IANA timezone like 'America/New_York'") })
//   implementation: format new Date() with toLocaleString and the provided timezone

export const handCodedTools: any[] = []; // TODO: replace with [searchTool, calculatorTool, timeTool]
