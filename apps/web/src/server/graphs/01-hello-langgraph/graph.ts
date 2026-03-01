import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 01, Step 1, Task 1): Add your imports
// You'll need:
//   import { AIMessage } from "@langchain/core/messages";
//   import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";

// TODO (Lesson 01, Step 1, Task 2): Define a `greetNode` function
// 1. Get the last message from state.messages
// 2. Extract its content (handle both string and non-string content)
// 3. Create an AIMessage with a greeting that includes the user's input
// 4. Return { messages: [yourAIMessage] }

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
// TODO (Lesson 01, Step 1, Task 3): Build the workflow
// 1. Create a new StateGraph with MessagesAnnotation
// 2. Add your greetNode with .addNode('greet', greetNode)
// 3. Add edge from START to 'greet'
// 4. Add edge from 'greet' to END
// 5. Compile and return: workflow.compile()
throw new Error("Not implemented — complete Lesson 01!");
}
