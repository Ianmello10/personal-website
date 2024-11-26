import NavBar from "@/components/nav-bar";
import HeroSection from "@/components/hero-section";
import Feature from "@/components/feature";
import Footer from "@/components/footer";
import { cookies } from "next/headers";

export default async function Home() {
	const ck = await cookies();
	const ckValue = ck.get("NEXT_LOCALE")?.value;

	return (
		<div className="min-h-screen  flex flex-col w-full  ">
			<NavBar cookieValue={ckValue} />

			<Feature />
			<HeroSection />
			<Footer />
		</div>
	);
}
