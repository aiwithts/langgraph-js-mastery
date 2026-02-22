"use client";

import { ChatContainer } from "@/components/chat/ChatContainer";

export default function Home() {
	return (
		<div className="container py-8">
			<div className="mb-6 text-center">
				<h1 className="text-3xl font-bold tracking-tight">LangGraph Training Ground</h1>
				<p className="text-muted-foreground mt-2">
					Experiment with LangGraph.js agents and multi-agent systems
				</p>
			</div>
			<ChatContainer />
		</div>
	);
}
