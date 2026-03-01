// TODO (Lesson 08, Step 3): Define prompts for all three modes
// You'll need:
//   import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
//
// CLASSIFY_PROMPT: a string describing the three modes for classification
//   - "explain": user is asking questions
//   - "extract": user is providing data to parse
//   - "create": user wants content generated
//
// EXPLAIN_PROMPT: ChatPromptTemplate with MessagesPlaceholder("messages")
//   System: be a concise teacher, use bold titles and code examples
//
// CREATE_PROMPT: ChatPromptTemplate with MessagesPlaceholder("messages")
//   System: be a versatile creator, match format to request type

export const CLASSIFY_PROMPT = ""; // TODO: replace with classification system prompt string
export const EXPLAIN_PROMPT: any = null; // TODO: replace with ChatPromptTemplate
export const CREATE_PROMPT: any = null; // TODO: replace with ChatPromptTemplate
