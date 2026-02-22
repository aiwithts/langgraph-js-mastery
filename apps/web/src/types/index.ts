// ============================================
// Graph metadata
// ============================================

export interface GraphInfo {
	id: string;
	name: string;
	description: string;
}

// ============================================
// Thread types
// ============================================

export interface Thread {
	id: string;
	graphId: string;
	createdAt: string;
	updatedAt: string;
}

// ============================================
// Message types
// ============================================

export type MessageRole = "user" | "assistant" | "system" | "tool";

export interface ToolCall {
	id: string;
	name: string;
	args: Record<string, unknown>;
	result?: string;
}

export interface Message {
	id: string;
	role: MessageRole;
	content: string;
	timestamp: string;
	toolCalls?: ToolCall[];
}

// ============================================
// Display Intents (Lesson 28)
// ============================================

export interface DisplayIntent {
	id: string;
	component: string;
	props: Record<string, unknown>;
}

// ============================================
// Interactive Intents (Lesson 29)
// ============================================

export interface SelectionIntent {
	kind: "selection";
	id: string;
	prompt: string;
	options: Array<{ value: string; label: string }>;
	multiple?: boolean;
}

export interface FormIntent {
	kind: "form";
	id: string;
	title: string;
	fields: Array<{
		name: string;
		type: "text" | "number" | "select";
		label: string;
		required?: boolean;
		options?: string[];
		min?: number;
		max?: number;
	}>;
	submitLabel?: string;
}

export interface ConfirmationIntent {
	kind: "confirmation";
	id: string;
	title: string;
	message: string;
	severity: "info" | "warning" | "danger";
	details?: Array<{ label: string; value: string }>;
}

export type InteractiveIntent = SelectionIntent | FormIntent | ConfirmationIntent;

export interface IntentResponse {
	intentId: string;
	action: "submit" | "cancel";
	data?: unknown;
}

// ============================================
// UI Events (Lessons 25-27: config.writer pattern)
// ============================================

export interface UIEvent {
	type: "ui";
	id: string;
	component: string;
	props: Record<string, unknown>;
	merge?: boolean;
}

// ============================================
// SSE Event types
// ============================================

export type SSEEventType =
	| "message_delta"
	| "message_complete"
	| "tool_call_start"
	| "tool_call_result"
	| "state_update"
	| "interrupt"
	| "ui"
	| "error"
	| "done";

export interface SSEMessageDelta {
	type: "message_delta";
	content: string;
	role: MessageRole;
}

export interface SSEMessageComplete {
	type: "message_complete";
	id: string;
	content: string;
	role: MessageRole;
	displayIntents?: DisplayIntent[];
}

export interface SSEToolCallStart {
	type: "tool_call_start";
	id: string;
	name: string;
	args: Record<string, unknown>;
}

export interface SSEToolCallResult {
	type: "tool_call_result";
	id: string;
	result: string;
}

export interface SSEStateUpdate {
	type: "state_update";
	node: string;
	state: Record<string, unknown>;
}

export interface SSEInterrupt {
	type: "interrupt";
	intent: InteractiveIntent;
}

export interface SSEError {
	type: "error";
	message: string;
	code?: string;
}

export interface SSEDone {
	type: "done";
	threadId: string;
	checkpointId?: string;
}

export type SSEEvent =
	| SSEMessageDelta
	| SSEMessageComplete
	| SSEToolCallStart
	| SSEToolCallResult
	| SSEStateUpdate
	| SSEInterrupt
	| UIEvent
	| SSEError
	| SSEDone;

// ============================================
// Request types
// ============================================

export interface InvokeRequest {
	threadId: string;
	message: string;
	config?: Record<string, unknown>;
}

export interface ResumeRequest {
	threadId: string;
	response: IntentResponse;
}

// ============================================
// API Response types
// ============================================

export interface GraphsResponse {
	graphs: GraphInfo[];
}

export interface ThreadsResponse {
	threads: Thread[];
}

export interface MessagesResponse {
	messages: Message[];
}

// ============================================
// UI-specific types (client-side)
// ============================================

export interface UIComponent {
	id: string;
	component: string;
	props: Record<string, unknown>;
}

export interface ChatMessage {
	id: string;
	role: "user" | "assistant" | "tool";
	content: string;
	timestamp: Date;
	isStreaming?: boolean;
	toolCalls?: {
		id: string;
		name: string;
		args: Record<string, unknown>;
		result?: string;
	}[];
	displayIntents?: {
		id: string;
		component: string;
		props: Record<string, unknown>;
	}[];
	uiComponents?: UIComponent[];
}

export interface ChatState {
	messages: ChatMessage[];
	isLoading: boolean;
	error: string | null;
	pendingIntent?: InteractiveIntent;
}
