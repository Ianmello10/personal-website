"use client";

import { Container } from "@/components/craft";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import logo from "../public/images/foi2.png";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
type ComponentList = {
	title: string;
	href: string;
};

export default function NavBar() {
	const router = usePathname();

	const isBlog = router.includes("blog");
	const isHome = !router.includes("blog");

	const components: ComponentList[] = [
		{ title: isHome ? "" : "Home", href: "/" },
		{ title: isBlog ? "" : "Blog", href: "/blog" },
	];
	return (
		<Container className="not-prose max-w-screen-2xl w-full">
			<nav className="flex items-center justify-between  h-16   border-[1px]  px-4 rounded-md">
				<div className="flex items-center">
					<h1 className="text-xl font-bold ">Ian</h1>
					<Image src={logo} alt="Logo" width={40} height={40} priority={true} />
				</div>
				{listItems(components)}
			</nav>
		</Container>
	);
}
const listItems = (components: ComponentList[]) => {
	return (
		<ul className="list-none flex  items-center gap-x-2 text-sm ">
			{components.map((component) => (
				<li key={component.href}>
					<Link href={component.href}>{component.title}</Link>
				</li>
			))}
			<ModeToggle />
		</ul>
	);
};
