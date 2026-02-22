"use client";

import { Loader2, Send, Square } from "lucide-react";
import { type FormEvent, type KeyboardEvent, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
	onSend: (message: string) => void;
	onCancel?: () => void;
	isLoading?: boolean;
	disabled?: boolean;
	placeholder?: string;
}

export function MessageInput({
	onSend,
	onCancel,
	isLoading = false,
	disabled = false,
	placeholder = "Type a message...",
}: MessageInputProps) {
	const [input, setInput] = useState("");

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			if (input.trim() && !isLoading && !disabled) {
				onSend(input.trim());
				setInput("");
			}
		},
		[input, isLoading, disabled, onSend],
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				if (input.trim() && !isLoading && !disabled) {
					onSend(input.trim());
					setInput("");
				}
			}
		},
		[input, isLoading, disabled, onSend],
	);

	return (
		<form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
			<Input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				disabled={disabled}
				className="flex-1"
				autoFocus
			/>
			{isLoading ? (
				<Button type="button" variant="destructive" size="icon" onClick={onCancel}>
					<Square className="h-4 w-4" />
				</Button>
			) : (
				<Button type="submit" size="icon" disabled={!input.trim() || disabled}>
					{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
				</Button>
			)}
		</form>
	);
}
