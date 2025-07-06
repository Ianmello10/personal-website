import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Layout } from "@/components/craft";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </Layout>
  );
}
