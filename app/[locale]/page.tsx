import NavBar from "@/components/nav-bar";
import HeroSection from "@/components/hero-section";
import Feature from "@/components/feature";
import Footer from "@/components/footer";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";

export default function Home() {
	const ck = cookies();

	const ckValue = ck.get("NEXT_LOCALE")?.value;
	const t = useTranslations("Homepage");

	return (
		<div className="min-h-screen  flex flex-col w-full  ">
			<NavBar cookieValue={ckValue} />

			<Feature />
			<HeroSection />
			<Footer />
		</div>
	);
}
