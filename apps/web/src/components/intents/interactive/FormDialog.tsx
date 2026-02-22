"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { FormIntent, IntentResponse } from "@/types";

interface FormDialogProps {
	intent: FormIntent;
	onRespond: (response: IntentResponse) => void;
}

export function FormDialog({ intent, onRespond }: FormDialogProps) {
	const [formData, setFormData] = useState<Record<string, unknown>>({});

	const handleChange = (name: string, value: unknown) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onRespond({
			intentId: intent.id,
			action: "submit",
			data: formData,
		});
	};

	const handleCancel = () => {
		onRespond({
			intentId: intent.id,
			action: "cancel",
		});
	};

	const isValid = intent.fields
		.filter((f) => f.required)
		.every((f) => formData[f.name] !== undefined && formData[f.name] !== "");

	return (
		<Card className="w-full max-w-md mx-auto">
			<form onSubmit={handleSubmit}>
				<CardHeader>
					<CardTitle className="text-lg">{intent.title}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{intent.fields.map((field) => (
						<div key={field.name} className="space-y-2">
							<label className="text-sm font-medium">
								{field.label}
								{field.required && <span className="text-destructive ml-1">*</span>}
							</label>

							{field.type === "select" && field.options ? (
								<Select
									value={(formData[field.name] as string) || ""}
									onValueChange={(value) => handleChange(field.name, value)}
								>
									<SelectTrigger>
										<SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
									</SelectTrigger>
									<SelectContent>
										{field.options.map((option) => (
											<SelectItem key={option} value={option}>
												{option}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							) : field.type === "number" ? (
								<Input
									type="number"
									min={field.min}
									max={field.max}
									value={(formData[field.name] as number) || ""}
									onChange={(e) =>
										handleChange(field.name, e.target.value ? Number(e.target.value) : "")
									}
									placeholder={`Enter ${field.label.toLowerCase()}`}
								/>
							) : (
								<Input
									type="text"
									value={(formData[field.name] as string) || ""}
									onChange={(e) => handleChange(field.name, e.target.value)}
									placeholder={`Enter ${field.label.toLowerCase()}`}
								/>
							)}
						</div>
					))}
				</CardContent>
				<CardFooter className="flex justify-end gap-2">
					<Button type="button" variant="outline" onClick={handleCancel}>
						Cancel
					</Button>
					<Button type="submit" disabled={!isValid}>
						{intent.submitLabel || "Submit"}
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
