/**
 * useChat Hook - Client-Side SSE Stream Consumer
 * ===============================================
 *
 * This React hook handles the client side of streaming AI responses.
 * It consumes SSE (Server-Sent Events) from the agent service and
 * updates React state as tokens arrive.
 *
 * ## How It Works
 *
 * ```
 * 1. User types message
 *          │
 *          ▼
 * 2. sendMessage() called
 *          │
 *          ├─► Add user message to state
 *          ├─► Create placeholder assistant message (isStreaming: true)
 *          │
 *          ▼
 * 3. POST to /graphs/:id/invoke
 *          │
 *          ▼
 * 4. Read SSE stream with fetch + ReadableStream
 *          │
 *          ├─► message_delta → Append to assistant message content
 *          ├─► ui → Add UI component to message
 *          ├─► interrupt → Set pendingIntent for HITL
 *          ├─► message_complete → Finalize message
 *          └─► done → Mark streaming complete
 * ```
 *
 * ## Key Patterns
 *
 * ### Progressive Content Updates
 * Each `message_delta` event appends to `accumulatedContent`, and React
 * state is updated to show the growing response in real-time.
 *
 * ### Cancellation Support
 * Uses `AbortController` to allow users to cancel in-flight requests.
 * The `cancelRequest()` function aborts the fetch.
 *
 * ### Human-in-the-Loop
 * When an `interrupt` event arrives, `pendingIntent` is set, signaling
 * the UI to show an interactive component. The `resumeWithResponse()`
 * function sends the user's response back to continue the graph.
 *
 * @see src/app/api/invoke/route.ts — invoke endpoint (L01)
 * @see src/app/api/stream/route.ts — streaming endpoint (L03)
 * @see src/app/api/stream-hitl/route.ts — HITL endpoint (L18)
 */

"use client";

import { useCallback, useRef, useState } from "react";
import type {
	ChatMessage,
	DisplayIntent,
	IntentResponse,
	InteractiveIntent,
	UIComponent,
} from "@/types";

interface UseChatOptions {
	/** The graph to invoke (from the dropdown) */
	graphId: string | null;
	/** Endpoint URL for sending messages (e.g. "/api/stream") */
	endpoint: string | undefined;
	/** Endpoint URL for resuming interrupted graphs (e.g. "/api/resume") */
	resumeEndpoint?: string | undefined;
	/** Thread ID for conversation persistence */
	threadId: string | null;
	/** Callback when a message is fully received */
	onMessageComplete?: (message: ChatMessage) => void;
}

/**
 * React hook for streaming chat with LangGraph.
 *
 * @returns Object with:
 * - `messages` - Array of chat messages (user and assistant)
 * - `isLoading` - True while waiting for/streaming response
 * - `error` - Error message if something went wrong
 * - `pendingIntent` - Interactive intent waiting for user response (HITL)
 * - `sendMessage` - Function to send a new message
 * - `resumeWithResponse` - Function to respond to an interrupt
 * - `cancelRequest` - Function to cancel in-flight request
 * - `clearMessages` - Function to clear chat history
 * - `loadMessages` - Function to load existing messages
 */
export function useChat({ graphId, endpoint, resumeEndpoint, threadId, onMessageComplete }: UseChatOptions) {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [pendingIntent, setPendingIntent] = useState<InteractiveIntent | null>(null);
	const abortControllerRef = useRef<AbortController | null>(null);

	// Use refs to always have latest values (avoids stale closure issues)
	const threadIdRef = useRef(threadId);
	threadIdRef.current = threadId;
	const graphIdRef = useRef(graphId);
	graphIdRef.current = graphId;
	const endpointRef = useRef(endpoint);
	endpointRef.current = endpoint;
	const resumeEndpointRef = useRef(resumeEndpoint);
	resumeEndpointRef.current = resumeEndpoint;

	const sendMessage = useCallback(
		async (content: string, overrideThreadId?: string) => {
			const effectiveThreadId = overrideThreadId ?? threadIdRef.current;
			const effectiveGraphId = graphIdRef.current;
			const effectiveEndpoint = endpointRef.current;
			if (!effectiveGraphId || !effectiveThreadId || !effectiveEndpoint || !content.trim()) {
				return;
			}

			// Clear any pending intent
			setPendingIntent(null);

			// Add user message
			const userMessage: ChatMessage = {
				id: `user-${Date.now()}`,
				role: "user",
				content: content.trim(),
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, userMessage]);
			setIsLoading(true);
			setError(null);

			// Create placeholder for assistant message
			const assistantMessageId = `assistant-${Date.now()}`;
			const assistantMessage: ChatMessage = {
				id: assistantMessageId,
				role: "assistant",
				content: "",
				timestamp: new Date(),
				isStreaming: true,
			};

			setMessages((prev) => [...prev, assistantMessage]);

			// Create abort controller for cancellation
			abortControllerRef.current = new AbortController();

			try {
				const response = await fetch(effectiveEndpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "text/event-stream",
					},
					body: JSON.stringify({
						graphId: effectiveGraphId,
						threadId: effectiveThreadId,
						message: content.trim(),
					}),
					signal: abortControllerRef.current.signal,
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				// ─────────────────────────────────────────────────────────────────
				// SSE Stream Reading
				// ─────────────────────────────────────────────────────────────────
				// We use fetch + ReadableStream instead of EventSource because:
				// 1. EventSource only supports GET requests (we need POST)
				// 2. We need to send a JSON body with the message
				// 3. We have more control over error handling and cancellation
				// ─────────────────────────────────────────────────────────────────

				const reader = response.body?.getReader();
				if (!reader) {
					throw new Error("No response body");
				}

				const decoder = new TextDecoder();
				let buffer = ""; // Buffer for incomplete lines
				let accumulatedContent = ""; // Full response content so far
				let displayIntents: DisplayIntent[] = []; // Display intents from message_complete
				let uiComponents: UIComponent[] = []; // UI components from config.writer

				// Read the stream chunk by chunk
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					// Decode bytes to text and add to buffer
					buffer += decoder.decode(value, { stream: true });

					// SSE messages are newline-separated
					// Split and keep incomplete line in buffer
					const lines = buffer.split("\n");
					buffer = lines.pop() || "";

					// Process complete lines
					for (const line of lines) {
						// SSE format: "event: <type>\n" followed by "data: <json>\n\n"
						if (line.startsWith("event:")) {
							// Event type line - we get the type from the data payload instead
							continue;
						}

						if (line.startsWith("data:")) {
							try {
								// Parse the JSON payload after "data: "
								const data = JSON.parse(line.slice(5).trim());

								// Handle different event types from the server
								switch (data.type) {
									// ─── Token Delta ───────────────────────────────────
									// Each chunk of the LLM response as it's generated.
									// We accumulate content and update the message in state.
									case "message_delta":
										accumulatedContent += data.content;
										setMessages((prev) =>
											prev.map((msg) =>
												msg.id === assistantMessageId
													? { ...msg, content: accumulatedContent }
													: msg,
											),
										);
										break;

									// ─── UI Component Event ────────────────────────────
									// Custom UI components from config.writer in graph nodes.
									// Used for generative UI (lessons 25-27).
									case "ui":
										{
											const uiComponent: UIComponent = {
												id: data.id,
												component: data.component,
												props: data.props || {},
											};
											// Check if this is an update to an existing component (same id)
											const existingIndex = uiComponents.findIndex((c) => c.id === data.id);
											if (existingIndex >= 0 && data.merge) {
												// Merge props with existing component
												uiComponents[existingIndex] = {
													...uiComponents[existingIndex],
													props: { ...uiComponents[existingIndex]!.props, ...data.props },
												};
											} else if (existingIndex >= 0) {
												// Replace existing component
												uiComponents[existingIndex] = uiComponent;
											} else {
												// Add new component
												uiComponents = [...uiComponents, uiComponent];
											}
											// Update the message with current UI components
											setMessages((prev) =>
												prev.map((msg) =>
													msg.id === assistantMessageId
														? { ...msg, uiComponents: [...uiComponents] }
														: msg,
												),
											);
										}
										break;

									// ─── Message Complete ──────────────────────────────
									// Sent when the full response is ready. Contains the
									// final message ID, content, and any display intents.
									case "message_complete":
										if (data.displayIntents) {
											displayIntents = data.displayIntents;
										}
										setMessages((prev) =>
											prev.map((msg) =>
												msg.id === assistantMessageId
													? {
															...msg,
															id: data.id,
															content: data.content || accumulatedContent,
															isStreaming: false,
															displayIntents:
																displayIntents.length > 0 ? displayIntents : undefined,
															uiComponents: uiComponents.length > 0 ? uiComponents : undefined,
														}
													: msg,
											),
										);
										break;

									// ─── Interrupt (Human-in-the-Loop) ─────────────────
									// Graph paused and waiting for user input.
									// Set pendingIntent so the UI can render an interactive
									// component (confirm dialog, form, etc.)
									case "interrupt":
										setPendingIntent(data.intent);
										setMessages((prev) =>
											prev.map((msg) =>
												msg.id === assistantMessageId
													? {
															...msg,
															isStreaming: false,
															content: accumulatedContent || msg.content,
															uiComponents: uiComponents.length > 0 ? uiComponents : undefined,
														}
													: msg,
											),
										);
										break;

									// ─── Error ─────────────────────────────────────────
									case "error":
										setError(data.message);
										break;

									// ─── Done ──────────────────────────────────────────
									// Stream complete, connection will close.
									case "done":
										break;
								}
							} catch (e) {
								// Ignore parse errors for incomplete data
							}
						}
					}
				}

				// Mark streaming as complete if not already done
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === assistantMessageId && msg.isStreaming
							? {
									...msg,
									isStreaming: false,
									content: accumulatedContent || msg.content,
									uiComponents: uiComponents.length > 0 ? uiComponents : msg.uiComponents,
								}
							: msg,
					),
				);

				// Notify completion
				if (onMessageComplete) {
					const finalMessage = {
						...assistantMessage,
						content: accumulatedContent,
						isStreaming: false,
						displayIntents: displayIntents.length > 0 ? displayIntents : undefined,
						uiComponents: uiComponents.length > 0 ? uiComponents : undefined,
					};
					onMessageComplete(finalMessage);
				}
			} catch (err) {
				if (err instanceof Error && err.name === "AbortError") {
					// Request was cancelled
					setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessageId));
				} else {
					setError(err instanceof Error ? err.message : "Unknown error occurred");
					setMessages((prev) =>
						prev.map((msg) =>
							msg.id === assistantMessageId
								? { ...msg, content: "Error: Failed to get response", isStreaming: false }
								: msg,
						),
					);
				}
			} finally {
				setIsLoading(false);
				abortControllerRef.current = null;
			}
		},
		[onMessageComplete],
	);

	// Resume an interrupted graph with user's response
	const resumeWithResponse = useCallback(async (response: IntentResponse) => {
		const effectiveThreadId = threadIdRef.current;
		const effectiveGraphId = graphIdRef.current;
		const effectiveResumeEndpoint = resumeEndpointRef.current;
		if (!effectiveGraphId || !effectiveThreadId || !effectiveResumeEndpoint) {
			return;
		}

		setPendingIntent(null);
		setIsLoading(true);
		setError(null);

		// Create placeholder for assistant message
		const assistantMessageId = `assistant-${Date.now()}`;
		const assistantMessage: ChatMessage = {
			id: assistantMessageId,
			role: "assistant",
			content: "",
			timestamp: new Date(),
			isStreaming: true,
		};

		setMessages((prev) => [...prev, assistantMessage]);

		abortControllerRef.current = new AbortController();

		try {
			const fetchResponse = await fetch(effectiveResumeEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "text/event-stream",
				},
				body: JSON.stringify({
					graphId: effectiveGraphId,
					threadId: effectiveThreadId,
					response,
				}),
				signal: abortControllerRef.current.signal,
			});

			if (!fetchResponse.ok) {
				throw new Error(`HTTP error! status: ${fetchResponse.status}`);
			}

			const reader = fetchResponse.body?.getReader();
			if (!reader) {
				throw new Error("No response body");
			}

			const decoder = new TextDecoder();
			let buffer = "";
			let accumulatedContent = "";
			let displayIntents: DisplayIntent[] = [];
			let uiComponents: UIComponent[] = [];

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split("\n");
				buffer = lines.pop() || "";

				for (const line of lines) {
					if (line.startsWith("event:")) continue;

					if (line.startsWith("data:")) {
						try {
							const data = JSON.parse(line.slice(5).trim());

							switch (data.type) {
								case "message_delta":
									accumulatedContent += data.content;
									setMessages((prev) =>
										prev.map((msg) =>
											msg.id === assistantMessageId ? { ...msg, content: accumulatedContent } : msg,
										),
									);
									break;

								case "ui":
									// Handle UI events from config.writer (lessons 25-27)
									{
										const uiComponent: UIComponent = {
											id: data.id,
											component: data.component,
											props: data.props || {},
										};
										const existingIndex = uiComponents.findIndex((c) => c.id === data.id);
										if (existingIndex >= 0 && data.merge) {
											uiComponents[existingIndex] = {
												...uiComponents[existingIndex],
												props: { ...uiComponents[existingIndex]!.props, ...data.props },
											};
										} else if (existingIndex >= 0) {
											uiComponents[existingIndex] = uiComponent;
										} else {
											uiComponents = [...uiComponents, uiComponent];
										}
										setMessages((prev) =>
											prev.map((msg) =>
												msg.id === assistantMessageId
													? { ...msg, uiComponents: [...uiComponents] }
													: msg,
											),
										);
									}
									break;

								case "message_complete":
									if (data.displayIntents) {
										displayIntents = data.displayIntents;
									}
									setMessages((prev) =>
										prev.map((msg) =>
											msg.id === assistantMessageId
												? {
														...msg,
														id: data.id,
														content: data.content || accumulatedContent,
														isStreaming: false,
														displayIntents: displayIntents.length > 0 ? displayIntents : undefined,
														uiComponents: uiComponents.length > 0 ? uiComponents : undefined,
													}
												: msg,
										),
									);
									break;

								case "interrupt":
									// Another interrupt - continue the flow
									setPendingIntent(data.intent);
									setMessages((prev) =>
										prev.map((msg) =>
											msg.id === assistantMessageId
												? {
														...msg,
														isStreaming: false,
														content: accumulatedContent || msg.content,
														uiComponents: uiComponents.length > 0 ? uiComponents : undefined,
													}
												: msg,
										),
									);
									break;

								case "error":
									setError(data.message);
									break;
							}
						} catch (e) {
							// Ignore parse errors
						}
					}
				}
			}

			// Mark streaming complete
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === assistantMessageId && msg.isStreaming
						? {
								...msg,
								isStreaming: false,
								content: accumulatedContent || msg.content,
								uiComponents: uiComponents.length > 0 ? uiComponents : msg.uiComponents,
							}
						: msg,
				),
			);
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") {
				setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessageId));
			} else {
				setError(err instanceof Error ? err.message : "Unknown error occurred");
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === assistantMessageId
							? { ...msg, content: "Error: Failed to resume", isStreaming: false }
							: msg,
					),
				);
			}
		} finally {
			setIsLoading(false);
			abortControllerRef.current = null;
		}
	}, []);

	const cancelRequest = useCallback(() => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
	}, []);

	const clearMessages = useCallback(() => {
		setMessages([]);
		setError(null);
		setPendingIntent(null);
	}, []);

	const loadMessages = useCallback((loadedMessages: ChatMessage[]) => {
		setMessages(loadedMessages);
	}, []);

	return {
		messages,
		isLoading,
		error,
		pendingIntent,
		sendMessage,
		resumeWithResponse,
		cancelRequest,
		clearMessages,
		loadMessages,
	};
}
