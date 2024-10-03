"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "@/i18n/routing";
import React from "react";
import { Languages } from "lucide-react";

type PropsDropdownLocale = {
	cookieValue: string | undefined;
};

const DropdownLocale = ({ cookieValue }: PropsDropdownLocale) => {
	const [position, setPosition] = React.useState(cookieValue);

	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Languages className="w-5 h-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-auto">
				<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
					<DropdownMenuRadioItem
						onClick={() => router.replace("/", { locale: "pt" })}
						value="pt"
					>
						Pt
					</DropdownMenuRadioItem>

					<DropdownMenuRadioItem
						onClick={() => router.replace("/", { locale: "en" })}
						value="en"
					>
						En
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownLocale;
