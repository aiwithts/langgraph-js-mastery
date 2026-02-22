import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 31, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 31, Step 2): Define TradingState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add:
//   intent: Annotation<string> — reducer replaces, default ""  (buy/sell/info)
//   selectedAsset: Annotation<string | null> — reducer replaces, default null

// TODO (Lesson 31, Step 3): Define intentDetectionNode
// Detect the user's trading intent: buy, sell, or get market info
// Use LLM with structuredOutput: { intent: z.enum(["buy", "sell", "info"]) }
// Return: { intent: result.intent }

// TODO (Lesson 31, Step 4): Define assetSelectionNode
// Dispatch a SelectionIntent for the user to pick an asset:
//   config.writer?.({
//     type: "ui",
//     id: "asset-selector",
//     component: "SelectionCard",
//     props: {
//       prompt: `Select an asset to ${state.intent}:`,
//       options: [
//         { value: "BTC", label: "Bitcoin (BTC)" },
//         { value: "ETH", label: "Ethereum (ETH)" },
//         { value: "SOL", label: "Solana (SOL)" },
//         { value: "AAPL", label: "Apple (AAPL)" },
//       ],
//     },
//   });
// Return: { messages: [selectionPromptMessage] }

// TODO (Lesson 31, Step 5): Define tradeFormNode
// Dispatch a FormIntent for trade configuration:
//   config.writer?.({
//     type: "ui",
//     id: "trade-form",
//     component: "TradeForm",
//     props: {
//       title: `Configure ${state.intent.toUpperCase()} Order`,
//       asset: state.selectedAsset,
//       fields: [
//         { name: "amount", type: "number", label: "Amount", required: true, min: 0.001 },
//         { name: "orderType", type: "select", label: "Order Type", options: ["Market", "Limit", "Stop"], required: true },
//         { name: "price", type: "number", label: "Limit Price (optional)" },
//       ],
//       submitLabel: `Place ${state.intent.toUpperCase()} Order`,
//     },
//   });

// TODO (Lesson 31, Step 6): Define marketInfoNode
// For "info" intent: dispatch a market data display intent
// Show mock price data for major assets

// TODO (Lesson 31, Step 7): Build graph
// START → detectIntent → (route by intent) → assetSelection → END
//                                           → marketInfo → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 31, Step 8): Compile and return
	throw new Error("Not implemented — complete Lesson 31!");
}
