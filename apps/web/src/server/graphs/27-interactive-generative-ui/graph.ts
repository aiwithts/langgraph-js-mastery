import type { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

// TODO (Lesson 27, Step 1): Add your imports
// You'll need:
//   import { AIMessage, SystemMessage } from "@langchain/core/messages";
//   import { Annotation, END, type LangGraphRunnableConfig, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
//   import { createLLM } from "../../lib/llm";

// TODO (Lesson 27, Step 2): Define BookingState
// Annotation.Root({ ...MessagesAnnotation.spec })
// Add: bookingData: Annotation<Record<string, unknown> | null> — reducer replaces, default null

// TODO (Lesson 27, Step 3): Define intentDetectionNode
// - Analyze the user's request to detect booking intent
// - If booking intent detected, dispatch a form UI event:
//   config.writer?.({
//     type: "ui",
//     id: "booking-form",
//     component: "BookingForm",
//     props: {
//       title: "Book Your Reservation",
//       fields: [
//         { name: "name", type: "text", label: "Your Name", required: true },
//         { name: "date", type: "text", label: "Date (YYYY-MM-DD)", required: true },
//         { name: "time", type: "text", label: "Time (HH:MM)", required: true },
//         { name: "partySize", type: "number", label: "Party Size", required: true, min: 1, max: 20 },
//         { name: "requests", type: "text", label: "Special Requests" },
//       ],
//       submitLabel: "Confirm Reservation",
//     },
//   });
// - Add a message asking the user to fill in the form
// - Return: { messages: [formMessage] }

// TODO (Lesson 27, Step 4): Define processBookingNode
// - Process state.bookingData (submitted form data)
// - Confirm the booking with a summary message
// - Return: { messages: [confirmationMessage] }

// TODO (Lesson 27, Step 5): Define routeByBookingData
// If state.bookingData is not null → "processBooking"
// Else → "detectIntent"

// TODO (Lesson 27, Step 6): Build graph
// START → (route: if bookingData exists → processBooking, else → detectIntent) → END

export function createGraph(checkpointer?: PostgresSaver) {
	// TODO (Lesson 27, Step 7): Compile and return
	throw new Error("Not implemented — complete Lesson 27!");
}
