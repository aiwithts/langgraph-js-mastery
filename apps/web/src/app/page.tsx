"use client";

import { ChatContainer } from "@/components/chat/ChatContainer";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function Home() {
	return (
		<div className="min-h-screen bg-background px-4 py-8">
			<div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Logo />
					<p className="text-muted-foreground text-sm">LangGraph.js Training Ground</p>
				</div>
				<ThemeToggle />
			</div>
			<ChatContainer />
		</div>
	);
}
