"use client";

import { useCallback, useEffect, useState } from "react";
import type { GraphInfo } from "@/types";

export function useGraphs() {
	const [graphs, setGraphs] = useState<GraphInfo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchGraphs = useCallback(async () => {
		try {
			setLoading(true);
			const res = await fetch("/api/graphs");
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			const data = await res.json();
			setGraphs(data.graphs ?? []);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch graphs");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchGraphs();
	}, [fetchGraphs]);

	return {
		graphs,
		loading,
		error,
		refetch: fetchGraphs,
	};
}

export function useGraph(id: string | null) {
	const [graph, setGraph] = useState<GraphInfo | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) {
			setGraph(null);
			return;
		}

		let cancelled = false;
		(async () => {
			try {
				setLoading(true);
				const res = await fetch(`/api/graphs/${id}`);
				if (!res.ok) {
					setGraph(null);
					return;
				}
				const data = await res.json();
				if (!cancelled) setGraph(data);
			} catch (err) {
				if (!cancelled) setError(err instanceof Error ? err.message : "Failed to fetch graph");
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [id]);

	return { graph, loading, error };
}
