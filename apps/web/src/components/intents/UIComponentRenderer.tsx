"use client";

import type { UIComponent } from "@/types";
import { AlertBanner, ForecastCard, WeatherWidget } from "./display";

// Components for lessons 25-27 (config.writer pattern)
// These map to the component names used in the lesson graphs

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentRegistry: Record<string, React.ComponentType<any>> = {
	// Lesson 25: Generative UI Fundamentals
	weather: WeatherWidget, // WeatherCard in lesson -> WeatherWidget
	WeatherCard: WeatherWidget,
	stock: StockCard,
	StockCard: StockCard,

	// Lesson 26: Interactive Generative UI
	optionSelector: OptionSelector,
	OptionSelector: OptionSelector,
	bookingForm: BookingForm,
	BookingForm: BookingForm,
	confirmationCard: ConfirmationCard,
	ConfirmationCard: ConfirmationCard,

	// Lesson 27: Human-in-the-Loop UI
	approvalCard: ApprovalCard,
	ApprovalCard: ApprovalCard,
	resultCard: ResultCard,
	ResultCard: ResultCard,

	// Also support display components from lesson 28
	WeatherWidget: WeatherWidget,
	ForecastCard: ForecastCard,
	AlertBanner: AlertBanner,
};

// ============================================
// Lesson 25 Components
// ============================================

interface StockCardProps {
	symbol: string;
	price: number;
	change: number;
	changePercent: number;
}

function StockCard({ symbol, price, change, changePercent }: StockCardProps) {
	const isPositive = change >= 0;

	return (
		<div className="bg-card border rounded-xl p-4 max-w-sm shadow-sm">
			<div className="flex items-center justify-between">
				<h3 className="text-xl font-bold">{symbol}</h3>
				<span
					className={`text-sm px-2 py-1 rounded ${
						isPositive
							? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
							: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
					}`}
				>
					{isPositive ? "↑" : "↓"} {Math.abs(changePercent).toFixed(2)}%
				</span>
			</div>
			<p className="text-2xl font-semibold mt-2">${price.toFixed(2)}</p>
			<p
				className={`text-sm ${
					isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
				}`}
			>
				{isPositive ? "+" : ""}
				{change.toFixed(2)} today
			</p>
		</div>
	);
}

// ============================================
// Lesson 26 Components
// ============================================

interface OptionItem {
	id: string;
	title: string;
	subtitle?: string;
	badge?: string;
	icon?: string;
}

interface OptionSelectorProps {
	title: string;
	subtitle?: string;
	options: OptionItem[];
	onSelect?: (optionId: string) => void;
}

function OptionSelector({ title, subtitle, options, onSelect }: OptionSelectorProps) {
	return (
		<div className="bg-card border rounded-xl p-4 max-w-md">
			<h3 className="font-semibold text-lg">{title}</h3>
			{subtitle && <p className="text-sm text-muted-foreground mb-3">{subtitle}</p>}
			<div className="space-y-2">
				{options.map((option) => (
					<button
						key={option.id}
						onClick={() => onSelect?.(option.id)}
						className="w-full text-left p-3 border rounded-lg hover:bg-accent hover:border-primary/50 transition-colors"
					>
						<div className="flex items-center gap-3">
							{option.icon && <span className="text-2xl">{option.icon}</span>}
							<div className="flex-1">
								<h4 className="font-medium">{option.title}</h4>
								{option.subtitle && (
									<p className="text-sm text-muted-foreground">{option.subtitle}</p>
								)}
							</div>
							{option.badge && (
								<span className="text-sm text-yellow-600 dark:text-yellow-400">{option.badge}</span>
							)}
						</div>
					</button>
				))}
			</div>
		</div>
	);
}

interface FormField {
	name: string;
	type: "text" | "number" | "select" | "textarea";
	label: string;
	required?: boolean;
	options?: string[];
	min?: number;
	max?: number;
	default?: string | number;
	placeholder?: string;
}

interface BookingFormProps {
	title: string;
	subtitle?: string;
	fields: FormField[];
	submitLabel?: string;
	onSubmit?: (data: Record<string, unknown>) => void;
}

function BookingForm({
	title,
	subtitle,
	fields,
	submitLabel = "Submit",
	onSubmit,
}: BookingFormProps) {
	return (
		<div className="bg-card border rounded-xl p-4 max-w-md">
			<h3 className="font-semibold text-lg">{title}</h3>
			{subtitle && <p className="text-sm text-muted-foreground mb-3">{subtitle}</p>}
			<form
				className="space-y-4"
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const data = Object.fromEntries(formData.entries());
					onSubmit?.(data);
				}}
			>
				{fields.map((field) => (
					<div key={field.name}>
						<label className="block text-sm font-medium mb-1">{field.label}</label>
						{field.type === "select" ? (
							<select
								name={field.name}
								required={field.required}
								defaultValue={field.default as string}
								className="w-full border rounded-lg p-2 bg-background"
							>
								<option value="">Select...</option>
								{field.options?.map((opt) => (
									<option key={opt} value={opt}>
										{opt}
									</option>
								))}
							</select>
						) : field.type === "textarea" ? (
							<textarea
								name={field.name}
								required={field.required}
								placeholder={field.placeholder}
								className="w-full border rounded-lg p-2 bg-background"
								rows={3}
							/>
						) : (
							<input
								type={field.type}
								name={field.name}
								required={field.required}
								min={field.min}
								max={field.max}
								defaultValue={field.default}
								placeholder={field.placeholder}
								className="w-full border rounded-lg p-2 bg-background"
							/>
						)}
					</div>
				))}
				<button
					type="submit"
					className="w-full bg-primary text-primary-foreground rounded-lg py-2 font-medium hover:bg-primary/90 transition-colors"
				>
					{submitLabel}
				</button>
			</form>
		</div>
	);
}

interface ConfirmationDetail {
	label: string;
	value: string;
}

interface ConfirmationCardProps {
	title: string;
	icon?: string;
	details: ConfirmationDetail[];
	footer?: string;
}

function ConfirmationCard({ title, icon = "✅", details, footer }: ConfirmationCardProps) {
	return (
		<div className="bg-card border border-green-200 dark:border-green-800 rounded-xl p-4 max-w-md">
			<div className="flex items-center gap-2 mb-3">
				<span className="text-2xl">{icon}</span>
				<h3 className="font-semibold text-lg">{title}</h3>
			</div>
			<div className="space-y-2 bg-muted/50 rounded-lg p-3">
				{details.map((detail, i) => (
					<div key={i} className="flex justify-between text-sm">
						<span className="text-muted-foreground">{detail.label}</span>
						<span className="font-medium">{detail.value}</span>
					</div>
				))}
			</div>
			{footer && <p className="text-sm text-muted-foreground mt-3">{footer}</p>}
		</div>
	);
}

// ============================================
// Lesson 27 Components
// ============================================

interface ApprovalDetail {
	label: string;
	value: string;
}

interface ApprovalCardProps {
	title: string;
	description: string;
	actionType: "destructive" | "modification" | "creation" | "financial";
	details: ApprovalDetail[];
	warnings?: string[];
	preview?: string;
	interruptId?: string;
	onApprove?: () => void;
	onReject?: (reason?: string) => void;
}

function ApprovalCard({
	title,
	description,
	actionType,
	details,
	warnings,
	preview,
	onApprove,
	onReject,
}: ApprovalCardProps) {
	const typeStyles = {
		destructive: "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30",
		modification: "border-yellow-300 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30",
		creation: "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30",
		financial: "border-purple-300 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/30",
	};

	const typeIcons = {
		destructive: "⚠️",
		modification: "✏️",
		creation: "➕",
		financial: "💰",
	};

	return (
		<div className={`border-2 rounded-xl p-4 max-w-md ${typeStyles[actionType]}`}>
			<div className="flex items-start gap-3">
				<span className="text-2xl">{typeIcons[actionType]}</span>
				<div className="flex-1">
					<h3 className="font-semibold text-lg">{title}</h3>
					<p className="text-muted-foreground mt-1">{description}</p>
				</div>
			</div>

			<div className="mt-4 space-y-2 bg-background/50 rounded-lg p-3">
				{details.map((detail, i) => (
					<div key={i} className="flex justify-between text-sm">
						<span className="text-muted-foreground">{detail.label}</span>
						<span className="font-medium">{detail.value}</span>
					</div>
				))}
			</div>

			{preview && (
				<div className="mt-3 p-3 bg-background/50 rounded-lg text-sm">
					<p className="text-muted-foreground">{preview}</p>
				</div>
			)}

			{warnings && warnings.length > 0 && (
				<div className="mt-3 text-sm text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 rounded-lg p-2">
					{warnings.map((warning, i) => (
						<div key={i} className="flex items-center gap-2">
							<span>⚠️</span>
							<span>{warning}</span>
						</div>
					))}
				</div>
			)}

			{(onApprove || onReject) && (
				<div className="mt-4 flex gap-2">
					<button
						onClick={onApprove}
						className="flex-1 bg-green-600 text-white rounded-lg py-2 font-medium hover:bg-green-700 transition-colors"
					>
						✓ Approve
					</button>
					<button
						onClick={() => onReject?.()}
						className="flex-1 border border-border rounded-lg py-2 font-medium hover:bg-accent transition-colors"
					>
						✗ Reject
					</button>
				</div>
			)}
		</div>
	);
}

interface ResultCardProps {
	title: string;
	icon?: string;
	status: "success" | "cancelled" | "error";
	message: string;
	details?: ApprovalDetail[];
}

function ResultCard({ title, icon, status, message, details }: ResultCardProps) {
	const statusStyles = {
		success: "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30",
		cancelled: "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/30",
		error: "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30",
	};

	const defaultIcons = {
		success: "✅",
		cancelled: "❌",
		error: "⚠️",
	};

	return (
		<div className={`border rounded-xl p-4 max-w-md ${statusStyles[status]}`}>
			<div className="flex items-center gap-2 mb-2">
				<span className="text-2xl">{icon || defaultIcons[status]}</span>
				<h3 className="font-semibold text-lg">{title}</h3>
			</div>
			<p className="text-muted-foreground">{message}</p>
			{details && details.length > 0 && (
				<div className="mt-3 space-y-2 bg-background/50 rounded-lg p-3">
					{details.map((detail, i) => (
						<div key={i} className="flex justify-between text-sm">
							<span className="text-muted-foreground">{detail.label}</span>
							<span className="font-medium">{detail.value}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

// ============================================
// UIComponentRenderer
// ============================================

interface UIComponentRendererProps {
	components: UIComponent[];
	onAction?: (actionType: string, data: unknown) => void;
}

export function UIComponentRenderer({ components, onAction }: UIComponentRendererProps) {
	if (!components || components.length === 0) {
		return null;
	}

	return (
		<div className="space-y-3 my-3">
			{components.map((component) => {
				const Component = componentRegistry[component.component];

				if (!Component) {
					console.warn(`Unknown UI component: ${component.component}`);
					return (
						<div
							key={component.id}
							className="p-3 bg-muted rounded-lg text-sm text-muted-foreground"
						>
							Unknown component: {component.component}
						</div>
					);
				}

				// Add action handlers for interactive components
				const props = {
					...component.props,
					onSelect: (optionId: string) => onAction?.("select_option", { optionId }),
					onSubmit: (formData: Record<string, unknown>) => onAction?.("submit_form", { formData }),
					onApprove: () => onAction?.("approve", { approved: true }),
					onReject: (reason?: string) => onAction?.("reject", { approved: false, reason }),
				};

				return <Component key={component.id} {...props} />;
			})}
		</div>
	);
}
