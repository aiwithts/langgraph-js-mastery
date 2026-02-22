// TODO (Lesson 07, Step 2): Define your extraction schemas using Zod
// You'll need: import { z } from "zod";
//
// Define:
//   ContactSchema: z.object({ name, email (optional, string.email()), phone?, company? })
//   EventSchema: z.object({ title, date (YYYY-MM-DD), time?, location? })
//   ActionItemSchema: z.object({ task, assignee?, priority: z.enum(["low","medium","high"]) })
//   ExtractionResultSchema: z.object({
//     contacts: z.array(ContactSchema).default([]),
//     events: z.array(EventSchema).default([]),
//     actionItems: z.array(ActionItemSchema).default([]),
//   })
//
// Export: export type ExtractionResult = z.infer<typeof ExtractionResultSchema>;

export const ExtractionResultSchema: any = null; // TODO: replace with z.object(...)
export type ExtractionResult = any; // TODO: replace with z.infer<typeof ExtractionResultSchema>
