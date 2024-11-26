import NavBar from "@/components/nav-bar";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
	title: "Blog",
	description: "Blog",
};

export default async function DashboardLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	const ck = await cookies();

	const ckValue = ck.get("NEXT_LOCALE")?.value;
	return (
		<section className=" ">
			<NavBar cookieValue={ckValue} />

			{children}
		</section>
	);
}

