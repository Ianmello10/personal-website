"use client";
import React from "react";

// Layout Components
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

// Icons

import {
	DeviconPlainNodejsWordmark,
	DeviconPlainFigma,
	DeviconDocker,
	DeviconPlainPostgresqlWordmark,
	DeviconPlainMongodbWordmark,
	DeviconPlainRedisWordmark,
	DeviconReactWordmark,
} from "./icons";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type FeatureText = {
	icon: JSX.Element;
};

const featureText: FeatureText[] = [
	{
		icon: (
			<DeviconPlainFigma className="h-12 w-12  fill-gray-800 dark:fill-gray-50" />
		),
	},
	{
		icon: (
			<DeviconReactWordmark className="h-16 w-16   fill-gray-800 dark:fill-gray-50" />
		),
	},
	{
		icon: (
			<DeviconPlainNodejsWordmark className="h-20 w-20 fill-gray-800 dark:fill-gray-50" />
		),
	},
	{
		icon: (
			<DeviconDocker className="h-16 w-16 fill-gray-800 dark:fill-gray-50" />
		),
	},
	{
		icon: (
			<DeviconPlainPostgresqlWordmark className="h-16 w-16  fill-gray-800 dark:fill-gray-50" />
		),
	},
	{
		icon: (
			<DeviconPlainMongodbWordmark className="h-20 w-16 fill-gray-800 dark:fill-gray-50" />
		),
	},
	{
		icon: (
			<DeviconPlainRedisWordmark className="h-16 w-16 fill-gray-800 dark:fill-gray-50" />
		),
	},
];
const HeroDescription = () => {
	const t = useTranslations("Homepage");

	return (
		<Section className="  overflow-hidden flex-grow">
			<motion.div
				initial={{ opacity: 0, x: 200 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: 0 }}
				transition={{ duration: 0.6, ease: "easeInOut" }}
				style={{
					top: 0,
					left: 0,
					right: 0,
				}}
			>
				<Container className="not-prose max-w-screen-2xl   ">
					<div className="flex flex-col gap-2 	">
						<h3 className="text-3xl">
							<Balancer>{t("Hero.heroTitle")}</Balancer>
						</h3>
						<h4 className="text-xl font-light opacity-70">
							<Balancer>{t("Hero.heroDescription")}</Balancer>
						</h4>

						<div className="w-full mt-6  flex-col grid gap-4 gap-x-4 md:mt-12  justify-items-center md:justify-items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:w-[75%] ">
							{featureText.map(({ icon }, index) => (
								<div
									className="flex w-full md:w-full h-36 flex-col  border-[1px] p-4 shadow-md hover:shadow-lg dark:hover:shadow-[#202020] ease-in-out duration-300 bg-[#ffffff] dark:bg-[#161616] rounded-md items-center justify-center"
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
								>
									{icon}
								</div>
							))}
						</div>
					</div>
				</Container>
			</motion.div>
		</Section>
	);
};

export default HeroDescription;
