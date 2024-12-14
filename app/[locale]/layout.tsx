import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../app/globals.css";
import { Layout } from "@/components/craft";
import { ThemeProvider } from "@/components/theme-provider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";

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

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}
export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;

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
