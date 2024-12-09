import { Container, Section, Article } from "@/components/craft";
import type { Metadata } from "next/types";
import { notFound } from "next/navigation";
import { getPostBySlug } from "../utils/posts-utils";
import Toc from "@/components/toc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageTransition from "@/components/animate";
import { Suspense } from "react";

//export const revalidate = 3600;
//export const dynamicParams = true;
//export const dynamic = "force-static";

export async function generateMetadata({
	params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	if (!slug) {
		throw new Error("The post is not valid");
	}

	const post = await getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	return {
		title: post.frontmatter.title,
		description: post.frontmatter.description,
		openGraph: {
			title: post.frontmatter.title,
			type: "article",
			images: [
				{
					url: "",
					width: 1200,
					height: 630,
				},
			],
		},
		twitter: {
			title: post.frontmatter.title,
		},
	};
}
const PagePost = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	const post = await getPostBySlug(slug);
	return (
		<PageTransition>
			<Section className="overflow-visible flex-grow py-8">
				<Container className="max-w-screen-2xl  mx-auto px-4">
					<div className="w-full flex flex-col lg:flex-row justify-between ">
						{/* Artigo principal */}
						<Article className="prose  dark:prose-invert lg:w-9/12 w-full max-w-none">
							<div className="flex flex-col ">
								<Link href="/blog" className=" text-sm opacity-80 block  py-2">
									<ArrowLeft className="w-6 h-6 " />
								</Link>
								<div className=" flex flex-col mt-5">
									<h1 className="text-md">{post.frontmatter.title}</h1>

									<span className="text-gray-500 text-sm opacity-80 block -mt-7 ">
										{String(post.frontmatter.publishDate)}
									</span>
								</div>
							</div>
							{post.content}
						</Article>

						{/* Sidebar com TOC */}

						<Toc toc={post.toc} />
					</div>
				</Container>
			</Section>
		</PageTransition>
	);
};

export default PagePost;
