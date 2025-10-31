import type { AppProps } from "next/app";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Career Prep Platform</title>
				<meta
					name="description"
					content="Mentorship, mock interviews, and employer-backed projects that help students launch their careers."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Component {...pageProps} />
			</div>
		</>
	);
}
