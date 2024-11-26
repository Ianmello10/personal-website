import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import { Heading } from "mdast";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import { slug } from "github-slugger";
import type { Toc } from "@/@types/md";

export const extractTocContent = async (content: string) => {
	const { content: skipMatter } = matter(content);

	const tree = unified().use(remarkParse).use(rehypeSlug).parse(skipMatter);

	const toc: Array<Toc> = [];

	visit(tree, "heading", (node: Heading) => {
		if (node.depth == 2) {
			const textNode = node.children.find((child) => child.type === "text");

			toc.push({
				level: node.depth,
				title: textNode?.value,
				slug: slug(textNode?.value as string),
			});
		}
	});

	return toc;
};
