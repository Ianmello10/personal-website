import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog",
	description: "Blog",
};
export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className=" ">
        {/* Include shared UI here e.g. a header or sidebar */}
   
        {children}
      </section>
    )
  }