// TODO (Lesson 04, Step 2): Create a ChatPromptTemplate for the assistant
// You'll need:
//   import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
//
// Create: ASSISTANT_PROMPT = ChatPromptTemplate.fromMessages([
//   ["system", `You are an expert-level {speciality} assistant.
//     Your role is to help users learn and understand {speciality} concepts.
//     Guidelines: be concise but thorough, use examples, encourage questions.
//     Always stay focused on {speciality} topics.`],
//   new MessagesPlaceholder("messages"),
// ]);
//
// The {speciality} placeholder gets filled at runtime from state.

export const ASSISTANT_PROMPT: any = null; // TODO: replace with ChatPromptTemplate
