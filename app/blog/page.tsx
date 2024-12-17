import { Container, Section } from "@/components/craft";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllPosts } from "./utils/posts-utils";
import PageTransition from "@/components/animate";

export const revalidate = 3600;
export const dynamic = "force-static";

export default async function Page() {
	const allPosts = await getAllPosts();

	return (
		<PageTransition>
			<Section className="overflow-hidden flex-grow">
				<Container className="not-prose max-w-screen-2xl  ">
					<h1 className="text-4xl">Latest Posts</h1>

					<div
						className="w-full  gap-4 mt-6  flex-col grid  gap-x-4 
						md:mt-10  justify-items-center md:justify-items-start grid-cols-1 
						sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  "
					>
						{allPosts.map((post) => (
							<Card
								className="flex w-full md:w-full h-fit flex-col  border-[1px] p-4 
									shadow-sm  
									ease-in-out duration-300   
									rounded-md items-start  justify-between"
								key={post.slug}
							>
								<CardHeader className="p-0">
									<h1 className="text-lg ">{post.frontmatter.title}</h1>
								</CardHeader>
								<div className="flex mt-2  gap-2 items-center w-full ">
									{post.frontmatter.tags.map((tag, index) => (
										<Badge
											variant="outline"
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={index}
											className="flex items-center justify-ce'nter h-5 w-auto   px-2    py-0"
										>
											<p className="text-xs ">{tag}</p>
										</Badge>
									))}
								</div>
								<p className="text-gray-500 text-sm opacity-80 mt-4 block">
									{post.frontmatter.description}
								</p>

								<Link href={`/blog/${post.slug}`}>
									<Button className="w-fit mt-6 flex items-center justify-center">
										Read More
									</Button>
								</Link>
							</Card>
						))}
					</div>
				</Container>
			</Section>
		</PageTransition>
	);
}
