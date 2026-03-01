// TODO (Lesson 08, Step 2a): Define IntentSchema for classification
// You'll need: import { z } from "zod";
//
// IntentSchema: z.object({
//   mode: z.enum(["explain", "extract", "create"]).describe("The detected user intent"),
//   confidence: z.number().min(0).max(1).describe("Confidence score 0-1"),
//   reasoning: z.string().describe("Brief reasoning for the classification"),
// })
//
// Also define ExtractionResultSchema (contacts, events, actionItems arrays)

export const IntentSchema: any = null; // TODO: replace with z.object(...)
export const ExtractionResultSchema: any = null; // TODO: replace with z.object(...)
export type ExtractionResult = any;
