import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 11, Step 1): Add your imports
// You'll need:
//   import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";
// For embeddings (requires OpenAI key):
//   import { OpenAIEmbeddings } from "@langchain/openai";

// TODO (Lesson 11, Step 2): Define your example bank
// Create an array of at least 4 examples: { input: string; output: string }
// These are formatted Q&A pairs that demonstrate the expected response style.
// const EXAMPLE_BANK = [
//   { input: "What is a variable?", output: "**Variables**\n\n..." },
//   { input: "What is a function?", output: "**Functions**\n\n..." },
//   // more examples...
// ];

// TODO (Lesson 11, Step 3): Implement cosine similarity helper
// function cosineSimilarity(a: number[], b: number[]): number
// Formula: dot(a,b) / (magnitude(a) * magnitude(b))

// TODO (Lesson 11, Step 4): Implement selectExamples function
// async function selectExamples(query: string, k: number = 2): Promise<{input:string,output:string}[]>
// - Create OpenAIEmbeddings and embed both query and all example inputs
// - Compute cosine similarity between query embedding and each example embedding
// - Return the top-k most similar examples

// TODO (Lesson 11, Step 5): Define ExampleSelectorState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add: selectedExamples: Annotation<{input:string,output:string}[]>
//      reducer replaces, default []

// TODO (Lesson 11, Step 6): Define selectExamplesNode
// - Get the last user message
// - Call selectExamples(userQuery, 2)
// - Return: { selectedExamples: examples }

// TODO (Lesson 11, Step 7): Define respondNode
// - Build a ChatPromptTemplate using the selected examples as few-shot context
// - Use FewShotChatMessagePromptTemplate with the selected examples
// - Include MessagesPlaceholder("messages") for conversation history
// - Invoke LLM and return: { messages: [response] }

// TODO (Lesson 11, Step 8): Build graph: START → selectExamples → respond → END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 11, Step 9): Compile and return
	throw new Error("Not implemented — complete Lesson 11!");
}
