import type { CompiledGraph } from "../../types";
import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 35, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 35, Step 2): Define TradingState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   intent: Annotation<string> — reducer replaces, default ""  (buy/sell/info)
//   selectedAsset: Annotation<string | null> — reducer replaces, default null

// TODO (Lesson 35, Step 3): Define intentDetectionNode
// Signature: async function intentDetectionNode(state: typeof TradingState.State, config: LangGraphRunnableConfig)
// Detect the user's trading intent: buy, sell, or get market info
// Use LLM with structuredOutput: { intent: z.enum(["buy", "sell", "info"]) }
// IMPORTANT: intentDetectionNode is an internal classifier — suppress streaming so its tokens don't
// reach the client. Pass { ...config, tags: ["langsmith:nostream"] } as the second arg to .invoke():
//   const result = await llm.invoke([...messages], { ...config, tags: ["langsmith:nostream"] });
// Return: { intent: result.intent }

// TODO (Lesson 35, Step 4): Define assetSelectionNode
// Dispatch a SelectionCard UI event for the user to pick an asset.
// Emit via config.writer?.({ type: "ui", id: "asset-selector", component: "SelectionCard", props: {...} })
// Include four options: BTC, ETH, SOL, AAPL and a prompt referencing state.intent.
// Return: { messages: [selectionPromptMessage] }

// TODO (Lesson 35, Step 5): Define tradeFormNode
// Dispatch a TradeForm UI event for trade configuration.
// Emit via config.writer?.({ type: "ui", id: "trade-form", component: "TradeForm", props: {...} })
// Include asset: state.selectedAsset, three fields (amount, orderType, price), and submitLabel referencing state.intent.
// Return: { messages: [] }

// TODO (Lesson 35, Step 6): Define marketInfoNode
// For "info" intent: dispatch a market data display intent
// Show mock price data for major assets

// TODO (Lesson 35, Step 7): Build graph
// START → detectIntent → (route by intent) → assetSelection → END
//                                           → tradeForm     → END  (when selectedAsset !== null)
//                                           → marketInfo    → END
// routeByIntent should check selectedAsset !== null first, then state.intent

export function createGraph(checkpointer?: PostgresSaver): CompiledGraph {
	// TODO (Lesson 35, Step 8): Compile and return
	throw new Error("Not implemented — complete Lesson 35!");
}
