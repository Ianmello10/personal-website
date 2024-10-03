"use client";

import { Container } from "@/components/craft";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { useTranslations } from "next-intl";
import logo from "../public/images/foi2.png";

import React from "react";
import DropdownLocale from "./dropdown-locale";
import { Link } from "@/i18n/routing";
type ComponentList = {
	title: string;
	href: string;
};

type PropsCookie = {
	cookieValue: string | undefined;
};

export default function NavBar({ cookieValue }: PropsCookie) {
	const t = useTranslations("Homepage");

	const components: ComponentList[] = [
		{ title: t("title"), href: "/" },
		{ title: t("blog"), href: "/blog" },
	];
	return (
		<Container className="not-prose max-w-screen-2xl w-full">
			<nav className="flex items-center justify-between  h-16   border-[1px]  px-4 rounded-md">
				<div className="flex items-center">
					<h1 className="text-xl font-bold ">Ian</h1>
					<Image src={logo} alt="Logo" width={40} height={40}  priority={true}/>
				</div>
				{listItems(components, { cookieValue })}

			</nav>
		</Container>
	);
}
const listItems = (
	components: ComponentList[],
	{ cookieValue }: PropsCookie,
) => {
	return (
		<ul className="list-none flex  items-center gap-x-2 text-sm ">
			{components.map((component) => (
				<li key={component.href}>
					<Link href={component.href}>{component.title}</Link>
				</li>
			))}
			<ModeToggle />
			<DropdownLocale cookieValue={cookieValue} />
		</ul>
	);
};
