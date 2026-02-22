import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "LangGraph Training Ground",
	description: "A training ground for LangGraph.js and LangChain.js experimentation",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="min-h-screen bg-background">{children}</main>
			</body>
		</html>
	);
}
