"use client";

import { MessageSquare } from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatMessage } from "@/types";
import { Message } from "./Message";

interface MessageListProps {
	messages: ChatMessage[];
	isLoading?: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
	const bottomRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to bottom when messages change or during loading
	useLayoutEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isLoading]);

	if (messages.length === 0) {
		return (
			<div className="flex-1 flex items-center justify-center">
				<div className="text-center text-muted-foreground">
					<MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
					<p className="text-lg font-medium">No messages yet</p>
					<p className="text-sm">Start a conversation by typing a message below.</p>
				</div>
			</div>
		);
	}

	return (
		<ScrollArea className="flex-1">
			<div className="divide-y">
				{messages.map((message) => (
					<Message key={message.id} message={message} />
				))}
				<div ref={bottomRef} />
			</div>
		</ScrollArea>
	);
}
