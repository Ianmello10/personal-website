import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../app/globals.css";
import { Layout, Main } from "@/components/craft";
import { ThemeProvider } from "@/components/theme-provider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const geistSans = localFont({
	src: "../fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "../fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Ian - Software developer",
	description:
		"Software developer focused on creating functional and intuitive websites and applications, taking care of the entire process, from the visual to the internal functioning. Love simplicity and nature.",

	openGraph: {
		title: "Ian - Software developer",
		description:
			"Software developer focused on creating functional and intuitive websites and applications, taking care of the entire process, from the visual to the internal functioning. Love simplicity and nature.",
		type: "website",
	},
};
export default async function RootLayout({
	children,
	params: { locale },
}: Readonly<{
	children: React.ReactNode;
	params: { locale: string };
}>) {
	const messages = await getMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			<Layout locale={locale}>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</body>
			</Layout>
		</NextIntlClientProvider>
	);
}
