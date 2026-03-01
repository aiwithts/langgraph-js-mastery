// TODO (Lesson 15, Step 2): Define at least 3 custom tools using the tool() decorator
// You'll need:
//   import { tool } from "@langchain/core/tools";
//   import { z } from "zod";
//
// Each tool needs:
//   1. An async implementation function
//   2. A name (the LLM uses this to reference the tool)
//   3. A description (the LLM reads this to decide when to call the tool)
//   4. A schema: z.object({ ... }) defining parameters
//
// Suggested tools to implement:
//
// calculatorTool: evaluates math expressions
//   schema: z.object({ expression: z.string().describe("Math expression like '2 + 3 * 4'") })
//   implementation: safely evaluate the expression and return the result
//
// searchTool: simulates web search
//   schema: z.object({ query: z.string().describe("Search query") })
//   implementation: return mock results for known queries
//
// timeTool: returns current time in a timezone
//   schema: z.object({ timezone: z.string().describe("IANA timezone like 'America/New_York'") })
//   implementation: use Date and toLocaleString with the timezone

export const myTools: any[] = []; // TODO: replace with [calculatorTool, searchTool, timeTool]
