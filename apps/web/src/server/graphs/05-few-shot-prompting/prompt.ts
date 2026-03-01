// TODO (Lesson 05, Step 2): Create few-shot examples and the prompt template
// You'll need:
//   import { ChatPromptTemplate, FewShotChatMessagePromptTemplate } from "@langchain/core/prompts";
//
// Step A: Define the per-example template:
//   const examplePrompt = ChatPromptTemplate.fromMessages([["human", "{input}"], ["ai", "{output}"]]);
//
// Step B: Define 2-3 examples (each: { input: string; output: string })
//   Show formatted explanations with **Bold Title**, description, key points, and code block.
//
// Step C: Create fewShotPrompt = new FewShotChatMessagePromptTemplate({
//   examplePrompt, examples, inputVariables: []
// });
//
// Step D: Define SYSTEM_MESSAGE — instructions for the formatting style the LLM must follow.

export const fewShotPrompt: any = null; // TODO: replace with FewShotChatMessagePromptTemplate
export const SYSTEM_MESSAGE = ""; // TODO: replace with your formatting instructions
