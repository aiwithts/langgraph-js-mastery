/**
 * Type-Safe UI Emitter for Generative UI
 * =======================================
 *
 * This module provides a type-safe helper for emitting UI events from graph nodes.
 * It's similar to the `typedUi` utility from `@langchain/langgraph-sdk/react-ui/server`
 * but works with standalone deployments (without LangGraph Platform).
 *
 * ## Why Use This?
 *
 * Instead of manually calling `config.writer` with untyped objects:
 *
 * ```typescript
 * // No type safety
 * config.writer?.({ type: 'ui', component: 'weather', props: { city: 123 } });
 * ```
 *
 * You get full type safety with autocomplete:
 *
 * ```typescript
 * // Type-safe with autocomplete
 * const ui = createUIEmitter(UIComponents, config);
 * ui.push('weather', { city: 'Tokyo', temperature: 22 }); // Props are typed!
 * ```
 *
 * ## Usage
 *
 * 1. Define your component map with prop types:
 *
 * ```typescript
 * const UIComponents = {
 *   weather: {} as { city: string; temperature: number; condition: string },
 *   stock: {} as { symbol: string; price: number; change: number },
 * };
 * ```
 *
 * 2. Create the emitter in your node and push events:
 *
 * ```typescript
 * async function weatherNode(state: State, config: LangGraphRunnableConfig) {
 *   const ui = createUIEmitter(UIComponents, config);
 *
 *   ui.push('weather', {
 *     city: 'Tokyo',
 *     temperature: 22,
 *     condition: 'Sunny',
 *   });
 *
 *   // For streaming updates, use the same ID with merge: true
 *   const id = ui.push('stock', { symbol: 'AAPL', price: 185, change: 0 });
 *   ui.update(id, 'stock', { price: 186, change: 1 });
 *
 *   return { messages: [new AIMessage('Here is the data.')] };
 * }
 * ```
 *
 * @see Lesson 26: Generative UI Fundamentals
 */

import type { LangGraphRunnableConfig } from "@langchain/langgraph";

/**
 * UI event structure sent to the frontend.
 */
export interface UIEvent {
	type: "ui";
	id: string;
	component: string;
	props: Record<string, unknown>;
	merge?: boolean;
	messageId?: string;
}

/**
 * Options for pushing a UI event.
 */
export interface PushOptions {
	/** Custom ID for the component (auto-generated if not provided) */
	id?: string;
	/** Whether to merge props with an existing component (for streaming updates) */
	merge?: boolean;
	/** Associate this UI event with a specific message ID */
	messageId?: string;
}

/**
 * Type-safe UI emitter instance.
 */
export interface UIEmitter<T extends Record<string, unknown>> {
	push<K extends keyof T>(componentName: K, props: T[K], options?: PushOptions): string;
	update<K extends keyof T>(id: string, componentName: K, props: Partial<T[K]>): void;
	delete(id: string): void;
}

/**
 * Create a type-safe UI emitter for graph nodes.
 */
export function createUIEmitter<T extends Record<string, unknown>>(
	_componentMap: T,
	config: LangGraphRunnableConfig,
): UIEmitter<T> {
	const writer = config.writer;

	return {
		push<K extends keyof T>(componentName: K, props: T[K], options?: PushOptions): string {
			const id =
				options?.id ||
				`${String(componentName)}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

			const event: UIEvent = {
				type: "ui",
				id,
				component: String(componentName),
				props: props as Record<string, unknown>,
				merge: options?.merge,
				messageId: options?.messageId,
			};

			writer?.(event);

			return id;
		},

		update<K extends keyof T>(id: string, componentName: K, props: Partial<T[K]>): void {
			const event: UIEvent = {
				type: "ui",
				id,
				component: String(componentName),
				props: props as Record<string, unknown>,
				merge: true,
			};

			writer?.(event);
		},

		delete(id: string): void {
			writer?.({
				type: "ui",
				id,
				component: "__delete__",
				props: {},
			});
		},
	};
}

/**
 * Convenience type for defining a component map.
 */
export type ComponentMap<T extends Record<string, Record<string, unknown>>> = {
	[K in keyof T]: T[K];
};
