import { globby } from "globby";
import fs from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "node:path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { extractTocContent } from "./extract-toc";
import type { PostMetadata, Post } from "@/@types/md";
import { cwd } from "node:process";

export const getAllPosts = async (): Promise<Post[]> => {
	const pathFiles = await globby(path.join(cwd(), "/app/posts/*.md"));
	console.log(pathFiles);

	if (!pathFiles.length) {
		console.error(pathFiles);
		throw new Error("No posts found");
	}

	const filesWithOutExtensions = pathFiles.map((file) => path.parse(file).name);

	const posts = filesWithOutExtensions.map((v) => getPostBySlug(v));

	const postList = [];

	for await (const post of posts) {
		postList.push(post);
	}

	const orderedPosts = postList
		.map((post) => post)
		.sort(
			(a, b) =>
				new Date(b.frontmatter.publishDate).getTime() -
				new Date(a.frontmatter.publishDate).getTime(),
		);

	return orderedPosts;
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
	const filePath = await globby([`app/posts/${slug}.md`]);
	const contentFilePath = fs.readFileSync(filePath[0], "utf-8");
	const toc = await extractTocContent(contentFilePath);

	const { frontmatter, content } = await compileMDX<PostMetadata>({
		source: contentFilePath,
		options: {
			mdxOptions: {
				remarkPlugins: [],
				rehypePlugins: [
					[
						rehypePrettyCode,
						{
							theme: "vitesse-dark",
						},
					],
					[rehypeSlug],
				],
			},

			parseFrontmatter: true,
		},
	});

	return {
		frontmatter,
		content,
		slug,
		toc,
	};
};
