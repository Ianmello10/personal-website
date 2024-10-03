"use client";
import Link from "next/link";
import Image from "next/image";

// UI component imports
import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Asset imports
const url =
	"https://images.unsplash.com/photo-1527630098712-677c67b995af?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Feature = () => {
	const t = useTranslations("Homepage.Feature");

	return (
		<motion.div
			initial={{ opacity: 0, x: -150 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, y: 50 }}
			transition={{ duration: 0.6, ease: "easeInOut" }}
		>
			<Section>
				<Container className="grid items-stretch md:grid-cols-2 md:gap-12 max-w-screen-2xl " >
					<div className="flex flex-col gap-6 py-8">
            <div className="flex items-center" >  
						<h1 
            className="text-3xl !my-0">{t("title")}

            </h1>
            <span className="block w-2 h-2 rounded-full bg-green-500 ml-2 animate-pulse -mt-2  " />
              
           
           </div>
						<p className="font-light leading-[1.4] opacity-70">
							{t("description")}
						</p>
						<div className="not-prose flex items-center gap-2">
							<Button
								variant="ghost"
								type="button"
								className="w-fit hover:-mt-2 transition-all ease-in-out"
								asChild
							>
								<Link href="https://github.com/Ianmello10">
									<Github />
								</Link>
							</Button>
							<Button
								type="button"
								className="w-fit hover:-mt-2 transition-all ease-in-out"
								variant="ghost"
								asChild
							>
								<Link href="https://www.linkedin.com/in/lucas-i-67041b272/">
									<Linkedin />
								</Link>
							</Button>
							<Button
								type="button"
								className="w-fit hover:-mt-2 transition-all ease-in-out"
								variant="ghost"
								asChild
							>
								<Link href="">
									<Phone />
								</Link>
							</Button>
						</div>
					</div>
					<div className="not-prose relative flex h-96 overflow-hidden rounded-lg border">
						<Image
							src={url}
							alt="Forest image"
							priority={true}
							width={1920}
							height={1080}
							className="fill object-cover"
						/>
					</div>
				</Container>
			</Section>
		</motion.div>
	);
};

export default Feature;
