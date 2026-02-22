"use client";

import { Bot, Loader2, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { DisplayIntentRenderer, UIComponentRenderer } from "@/components/intents";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

interface MessageProps {
	message: ChatMessage;
}

export function Message({ message }: MessageProps) {
	const isUser = message.role === "user";

	return (
		<div className={cn("flex gap-3 px-4 py-3", isUser ? "bg-muted/50" : "bg-background")}>
			<Avatar className="h-8 w-8 shrink-0">
				<AvatarFallback
					className={cn(isUser ? "bg-primary text-primary-foreground" : "bg-secondary")}
				>
					{isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1 space-y-2 overflow-hidden">
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium">{isUser ? "You" : "Assistant"}</span>
					{message.isStreaming && (
						<Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
					)}
				</div>
				<div className="prose prose-sm dark:prose-invert max-w-none">
					<ReactMarkdown
						components={{
							pre: ({ children }) => (
								<pre className="bg-muted rounded-lg p-3 overflow-x-auto">{children}</pre>
							),
							code: ({ className, children, ...props }) => {
								const isInline = !className;
								return isInline ? (
									<code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
										{children}
									</code>
								) : (
									<code className={className} {...props}>
										{children}
									</code>
								);
							},
						}}
					>
						{message.content || (message.isStreaming ? "Thinking..." : "")}
					</ReactMarkdown>
				</div>
				{/* Render display intents for assistant messages (lesson 28) */}
				{!isUser && message.displayIntents && message.displayIntents.length > 0 && (
					<DisplayIntentRenderer intents={message.displayIntents} />
				)}
				{/* Render UI components for assistant messages (lessons 25-27) */}
				{!isUser && message.uiComponents && message.uiComponents.length > 0 && (
					<UIComponentRenderer components={message.uiComponents} />
				)}
			</div>
		</div>
	);
}
