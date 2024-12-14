import NavBar from "@/components/nav-bar";
import HeroSection from "@/components/hero-section";
import Feature from "@/components/feature";
import Footer from "@/components/footer";

export default async function Home() {
	return (
		<div className="min-h-screen  flex flex-col w-full  ">
			<NavBar />

			<Feature />
			<HeroSection />
			<Footer />
		</div>
	);
}
