export interface Toc {
	level: number;
	title?: string;
	slug: string;
}

export interface PostMetadata {
	title: string;
	description: string;
	publishDate: Date;
	slug: string;
	tags: string[];
	toc: Toc[];
}

export interface Post {
	frontmatter: PostMetadata;
	content: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
	slug: string;
	toc: Toc[];
}
