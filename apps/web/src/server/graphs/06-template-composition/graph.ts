import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 06, Step 1): Add your imports
// You'll need:
//   import type { ChatPromptTemplate } from "@langchain/core/prompts";
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";
//   import { CODE_PROMPT, CONCEPT_PROMPT, DEBUG_PROMPT } from "./prompts";

// TODO (Lesson 06, Step 3): Define routeByContent function
// Inspect the last message content (lowercase)
// Return "code" if it contains code keywords (code, function, implement, write, typescript, class)
// Return "debug" if it contains debug keywords (error, bug, fix, broken, issue, not working)
// Default: return "concept"
// Signature: function routeByContent(state: typeof MessagesAnnotation.State): "code" | "concept" | "debug"

// TODO (Lesson 06, Step 4): Create a node factory
// function createNode(prompt: ChatPromptTemplate) {
//   return async function(state: typeof MessagesAnnotation.State) {
//     const llm = createLLM({ temperature: 0.7 });
//     const formatted = await prompt.formatMessages({ messages: state.messages });
//     const response = await llm.invoke(formatted);
//     return { messages: [response] };
//   };
// }

// TODO (Lesson 06, Step 5): Build the graph
// Nodes: code, concept, debug (each created by createNode with its prompt)
// Use addConditionalEdges(START, routeByContent, { code: "code", concept: "concept", debug: "debug" })
// Each node edges to END

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 06, Step 6): Compile and return
	throw new Error("Not implemented — complete Lesson 06!");
}
