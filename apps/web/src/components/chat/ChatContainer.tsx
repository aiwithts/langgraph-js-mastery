"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GraphSelector } from "@/components/GraphSelector";
import { InteractiveIntentHandler } from "@/components/intents";
import { ThreadControls } from "@/components/ThreadControls";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useChat } from "@/lib/hooks/useChat";
import { useGraphs } from "@/lib/hooks/useGraphs";
import { useCreateThread, useLatestThread, useMessages } from "@/lib/hooks/useThreads";
import type { ChatMessage } from "@/types";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

export function ChatContainer() {
	const [selectedGraphId, setSelectedGraphId] = useState<string | null>(null);
	const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
	const [isServerReady, setIsServerReady] = useState(false);
	const warmupCalledRef = useRef(false);

	// Pre-warm the server on mount: compiles route modules + initialises the DB
	// pool, checkpointer tables, and threads table in the background.
	// This avoids the 20-40 s cold-start hit when the user sends their first message.
	useEffect(() => {
		if (warmupCalledRef.current) return;
		warmupCalledRef.current = true;

		fetch("/api/warmup")
			.then(() => setIsServerReady(true))
			.catch(() => setIsServerReady(true)); // Don't block on warmup failure
	}, []);

	// Fetch graphs
	const { graphs, loading: graphsLoading, error: graphsError } = useGraphs();

	// Resolve the selected graph's endpoint info
	const selectedGraph = graphs.find((g) => g.id === selectedGraphId);
	const isPersistent = selectedGraph?.persistent ?? false;

	// Fetch latest thread for selected graph
	const {
		thread: latestThread,
		loading: threadLoading,
		refetch: refetchThread,
	} = useLatestThread(selectedGraphId);

	// Create thread mutation
	const { createThread, loading: creatingThread } = useCreateThread();

	// Fetch messages for current thread
	const { messages: savedMessages, loading: messagesLoading } = useMessages(currentThreadId);

	// Chat hook for sending messages
	const {
		messages,
		isLoading,
		error: chatError,
		pendingIntent,
		sendMessage,
		resumeWithResponse,
		cancelRequest,
		clearMessages,
		loadMessages,
	} = useChat({
		graphId: selectedGraphId,
		endpoint: selectedGraph?.endpoint,
		resumeEndpoint: selectedGraph?.resumeEndpoint,
		threadId: currentThreadId,
		persistent: isPersistent,
	});

	// Auto-select first graph if none selected
	useEffect(() => {
		if (graphs.length > 0 && !selectedGraphId) {
			setSelectedGraphId(graphs[0]!.id);
		}
	}, [graphs, selectedGraphId]);

	// Set current thread when latest thread is loaded (persistent graphs only)
	useEffect(() => {
		if (!isPersistent) return;
		if (latestThread && latestThread.graphId === selectedGraphId) {
			setCurrentThreadId(latestThread.id);
			// useMessages fetches automatically when currentThreadId changes — no
			// manual refetch needed here.
		}
	}, [latestThread, selectedGraphId, isPersistent]);

	// Load saved messages when thread changes (persistent graphs only)
	useEffect(() => {
		if (!isPersistent) return;
		if (savedMessages.length > 0) {
			const chatMessages: ChatMessage[] = savedMessages.map((msg) => ({
				id: msg.id,
				role: msg.role as "user" | "assistant",
				content: msg.content,
				timestamp: new Date(msg.timestamp),
			}));
			loadMessages(chatMessages);
		}
	}, [savedMessages, loadMessages, isPersistent]);

	// Handle graph selection change
	const handleGraphSelect = useCallback(
		(graphId: string) => {
			// Cancel any SSE stream in progress so old-graph tokens don't bleed
			// into the new graph's message list after clearMessages() resets it.
			cancelRequest();
			setSelectedGraphId(graphId);
			setCurrentThreadId(null);
			clearMessages();
			// useLatestThread re-fetches automatically when selectedGraphId changes
		},
		[cancelRequest, clearMessages],
	);

	// Handle new thread / clear chat
	const handleNewThread = useCallback(async () => {
		if (!selectedGraphId) return;

		if (!isPersistent) {
			// Stateless: just clear local message history
			clearMessages();
			return;
		}

		const thread = await createThread(selectedGraphId);
		if (thread) {
			setCurrentThreadId(thread.id);
			clearMessages();
		}
	}, [selectedGraphId, isPersistent, createThread, clearMessages]);

	// Send a message — for persistent graphs, auto-create a thread if none exists
	const handleSendMessage = useCallback(
		async (content: string) => {
			if (!selectedGraphId) return;

			if (!isPersistent) {
				// Stateless: send directly — no thread management needed
				sendMessage(content);
				return;
			}

			// Persistent: create thread if needed
			if (!currentThreadId) {
				const thread = await createThread(selectedGraphId);
				if (thread) {
					setCurrentThreadId(thread.id);
					// Pass threadId directly to avoid closure issues
					sendMessage(content, thread.id);
					return;
				}
			}

			sendMessage(content);
		},
		[selectedGraphId, isPersistent, currentThreadId, createThread, sendMessage],
	);

	return (
		<Card className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
			<CardHeader className="border-b shrink-0">
				<div className="flex items-center justify-between gap-4">
					<GraphSelector
						graphs={graphs}
						selectedGraphId={selectedGraphId}
						onSelect={handleGraphSelect}
						loading={graphsLoading}
					/>
					{messages.length > 0 && (
						<ThreadControls
							label={isPersistent ? "New Thread" : "Clear Chat"}
							onNewThread={handleNewThread}
							loading={isPersistent ? creatingThread : false}
							disabled={!selectedGraphId}
						/>
					)}
				</div>
				{!isServerReady && !graphsLoading && (
					<div className="flex items-center gap-2 text-muted-foreground text-sm mt-2">
						<Loader2 className="h-3 w-3 animate-spin" />
						<span>Warming up server routes…</span>
					</div>
				)}
				{graphsError && (
					<div className="flex items-center gap-2 text-destructive text-sm mt-2">
						<AlertCircle className="h-4 w-4" />
						<span>{graphsError}</span>
					</div>
				)}
				{chatError && (
					<div className="flex items-center gap-2 text-destructive text-sm mt-2">
						<AlertCircle className="h-4 w-4" />
						<span>{chatError}</span>
					</div>
				)}
			</CardHeader>
			<CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
				<MessageList messages={messages} isLoading={isLoading} />
				{/* Show interactive intent handler when graph is interrupted */}
				{pendingIntent && (
					<div className="px-4 py-3 border-t bg-muted/30">
						<InteractiveIntentHandler intent={pendingIntent} onRespond={resumeWithResponse} />
					</div>
				)}
				<MessageInput
					onSend={handleSendMessage}
					onCancel={cancelRequest}
					isLoading={isLoading}
					disabled={!selectedGraphId || graphsLoading || !!pendingIntent}
					placeholder={
						!selectedGraphId
							? "Select a graph to start chatting..."
							: !isServerReady
								? "Warming up server routes, please wait..."
								: pendingIntent
									? "Please respond to the prompt above..."
									: "Type a message..."
					}
				/>
			</CardContent>
		</Card>
	);
}
