"use client";

import { useCallback, useEffect, useState } from "react";
import type { Message, Thread } from "@/types";

export function useThreads(graphId: string | null) {
	const [threads, setThreads] = useState<Thread[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchThreads = useCallback(async () => {
		if (!graphId) return;
		try {
			setLoading(true);
			const res = await fetch(`/api/graphs/${graphId}/threads`);
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			const data = await res.json();
			setThreads(data.threads ?? []);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch threads");
		} finally {
			setLoading(false);
		}
	}, [graphId]);

	useEffect(() => {
		if (graphId) fetchThreads();
		else setThreads([]);
	}, [graphId, fetchThreads]);

	return { threads, loading, error, refetch: fetchThreads };
}

export function useLatestThread(graphId: string | null) {
	const [thread, setThread] = useState<Thread | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchLatest = useCallback(async () => {
		if (!graphId) return;
		try {
			setLoading(true);
			const res = await fetch(`/api/graphs/${graphId}/threads/latest`);
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			const data = await res.json();
			setThread(data.thread ?? null);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch latest thread");
		} finally {
			setLoading(false);
		}
	}, [graphId]);

	useEffect(() => {
		if (graphId) fetchLatest();
		else setThread(null);
	}, [graphId, fetchLatest]);

	return { thread, loading, error, refetch: fetchLatest };
}

export function useMessages(threadId: string | null) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchMessages = useCallback(async () => {
		if (!threadId) return;
		try {
			setLoading(true);
			const res = await fetch(`/api/threads/${threadId}/messages`);
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			const data = await res.json();
			setMessages(data.messages ?? []);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch messages");
		} finally {
			setLoading(false);
		}
	}, [threadId]);

	useEffect(() => {
		if (threadId) fetchMessages();
		else setMessages([]);
	}, [threadId, fetchMessages]);

	return { messages, loading, error, refetch: fetchMessages };
}

export function useCreateThread() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const createThread = useCallback(async (graphId: string): Promise<Thread | undefined> => {
		try {
			setLoading(true);
			const res = await fetch(`/api/graphs/${graphId}/threads`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			const data = await res.json();
			return data.thread;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to create thread");
			return undefined;
		} finally {
			setLoading(false);
		}
	}, []);

	return { createThread, loading, error };
}

export function useDeleteThread() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const deleteThread = useCallback(async (id: string): Promise<boolean> => {
		try {
			setLoading(true);
			const res = await fetch(`/api/threads/${id}`, { method: "DELETE" });
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			const data = await res.json();
			return data.success ?? false;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to delete thread");
			return false;
		} finally {
			setLoading(false);
		}
	}, []);

	return { deleteThread, loading, error };
}
