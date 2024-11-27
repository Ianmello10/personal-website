import { Container } from "@/components/craft";

export default function NotFound() {
	return (
		<Container className="flex justify-start flex-col  max-w-screen-2xl w-full mt-4">
			<h2 className="text-3xl text-center">Post Not Found 😢</h2>
			<p className="text-center mt-4 text-md">
				Could not find requested resource
			</p>
		</Container>
	);
}
