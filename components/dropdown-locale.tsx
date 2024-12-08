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
import React, { useEffect } from "react";
import { Languages } from "lucide-react";

type PropsDropdownLocale = {
	cookieValue: string | undefined;
};

const DropdownLocale = ({ cookieValue }: PropsDropdownLocale) => {
	const [position, setPosition] = React.useState(cookieValue);
	const router = useRouter();

	useEffect(() => {
		setPosition(cookieValue);
	}, [cookieValue]);

	const handleLocaleChange = (value: string) => {
		if (value === "pt" || value === "en") {
			setPosition(value);
			router.replace("/", { locale: value });
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Languages className="w-5 h-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-auto">
				<DropdownMenuRadioGroup
					value={position}
					onValueChange={handleLocaleChange}
				>
					<DropdownMenuRadioItem value="pt">Pt</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="en">En</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownLocale;
