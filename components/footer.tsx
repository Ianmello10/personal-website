import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { Section, Container } from "./craft";

export default function Footer() {
	return (
		<footer className="not-prose mt-24  py-0   ">
			<Section className=" md:py-0">
				<Container className="grid gap-6  max-w-screen-2xl py-0 ">
					<div className="grid gap-6">
						<Link href="/">
							<h3 className="sr-only">Ian/devoper</h3>
						</Link>
						<p>
							<Balancer>Building cool stuff</Balancer>
						</p>

						<p className="text-muted-foreground">
							© <a href="https://github.com/Ianmello10">Ian/devoper</a>. All
							rights reserved. 2024 - present.
						</p>
					</div>
				</Container>
			</Section>
		</footer>
	);
}
