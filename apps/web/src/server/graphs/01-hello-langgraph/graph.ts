import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 01, Step 1): Add your imports
// You'll need:
//   import { AIMessage } from "@langchain/core/messages";
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";

// TODO (Lesson 01, Step 2): Define a `greetNode` function
// - Accept: state: typeof MessagesAnnotation.State
// - Get the last message from state.messages (use state.messages.at(-1))
// - Create: new AIMessage(`Hello! You said: "${lastMessage.content}"`)
// - Return: { messages: [response] }

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
// TODO (Lesson 01, Step 3): Build the workflow
// 1. Create a new StateGraph with MessagesAnnotation
// 2. Add your greetNode with .addNode('greet', greetNode)
// 3. Add edge from START to 'greet'
// 4. Add edge from 'greet' to END
// 5. Compile with the checkpointer and return the compiled graph
throw new Error("Not implemented — complete Lesson 01!");
}
