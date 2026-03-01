"use client";

import { AlertCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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

	// Fetch graphs
	const { graphs, loading: graphsLoading, error: graphsError } = useGraphs();

	// Resolve the selected graph's endpoint info
	const selectedGraph = graphs.find((g) => g.id === selectedGraphId);

	// Fetch latest thread for selected graph
	const {
		thread: latestThread,
		loading: threadLoading,
		refetch: refetchThread,
	} = useLatestThread(selectedGraphId);

	// Create thread mutation
	const { createThread, loading: creatingThread } = useCreateThread();

	// Fetch messages for current thread
	const {
		messages: savedMessages,
		loading: messagesLoading,
		refetch: refetchMessages,
	} = useMessages(currentThreadId);

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
	});

	// Auto-select first graph if none selected
	useEffect(() => {
		if (graphs.length > 0 && !selectedGraphId) {
			setSelectedGraphId(graphs[0]!.id);
		}
	}, [graphs, selectedGraphId]);

	// Set current thread when latest thread is loaded
	useEffect(() => {
		if (latestThread) {
			setCurrentThreadId(latestThread.id);
			// Refetch messages for the loaded thread
			setTimeout(() => refetchMessages(), 0);
		}
	}, [latestThread, refetchMessages]);

	// Load saved messages when thread changes
	useEffect(() => {
		if (savedMessages.length > 0) {
			const chatMessages: ChatMessage[] = savedMessages.map((msg) => ({
				id: msg.id,
				role: msg.role as "user" | "assistant",
				content: msg.content,
				timestamp: new Date(msg.timestamp),
			}));
			loadMessages(chatMessages);
		}
	}, [savedMessages, loadMessages]);

	// Handle graph selection change
	const handleGraphSelect = useCallback(
		async (graphId: string) => {
			setSelectedGraphId(graphId);
			setCurrentThreadId(null);
			clearMessages();
			// Refetch thread for new graph after state updates
			setTimeout(() => refetchThread(), 0);
		},
		[clearMessages, refetchThread],
	);

	// Handle new thread creation
	const handleNewThread = useCallback(async () => {
		if (!selectedGraphId) return;

		const thread = await createThread(selectedGraphId);
		if (thread) {
			setCurrentThreadId(thread.id);
			clearMessages();
		}
	}, [selectedGraphId, createThread, clearMessages]);

	// Handle clear thread
	const handleClearThread = useCallback(() => {
		clearMessages();
	}, [clearMessages]);

	// Auto-create thread if none exists when trying to send
	const handleSendMessage = useCallback(
		async (content: string) => {
			if (!selectedGraphId) return;

			// Create thread if needed
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
		[selectedGraphId, currentThreadId, createThread, sendMessage],
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
					<ThreadControls
						onNewThread={handleNewThread}
						onClearThread={handleClearThread}
						hasThread={!!currentThreadId}
						loading={creatingThread}
						disabled={!selectedGraphId}
					/>
				</div>
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
							: pendingIntent
								? "Please respond to the prompt above..."
								: "Type a message..."
					}
				/>
			</CardContent>
		</Card>
	);
}
