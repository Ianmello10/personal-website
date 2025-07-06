import { Container, Section, Article } from "@/components/craft";
import type { Metadata } from "next/types";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "../utils/posts-utils";
import Toc from "@/components/toc";
import ProgressBar from "@/components/progress-bar";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import PageTransition from "@/components/animate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const revalidate = 604800;
export const dynamicParams = true;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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

const formatDate = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
};

type TocItem = { level: number };

const calculateReadTime = (toc: TocItem[]): string => {
  const majorSections = toc.filter((item) => item.level <= 2).length;
  const estimatedMinutes = Math.max(Math.ceil(majorSections * 2.2), 3);
  return `${estimatedMinutes} min read`;
};

const PagePost = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <PageTransition>
      {/* Progress Bar - Fixed at top */}
      <ProgressBar toc={post.toc} />

      <Section className="overflow-visible flex-grow py-4 md:py-8">
        <Container className="max-w-6xl mx-auto px-4">
          <Article className="prose dark:prose-invert w-full max-w-none prose-lg">
            <div className="flex flex-col">
              {/* Back Button */}
              <Link href="/blog" className="mb-6 md:mb-8">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 px-2 w-auto text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Button>
              </Link>

              {/* Article Header */}
              <header className="mb-6 md:mb-8 not-prose">
                {/* Tags */}
                {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.frontmatter.tags.map((tag: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight mb-4">
                  {post.frontmatter.title}
                </h1>

                {/* Description */}
                {post.frontmatter.description && (
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                    {post.frontmatter.description}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.frontmatter.publishDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{calculateReadTime(post.toc)}</span>
                  </div>
                  {post.toc && post.toc.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span>{post.toc.length} sections</span>
                    </div>
                  )}
                </div>

                <Separator className="mb-6 md:mb-8" />
              </header>

              {/* Inline TOC */}
              <div className="mb-4 md:mb-12 not-prose">
                <Toc toc={post.toc} />
              </div>

              {/* Article Content */}
              <div className="prose-headings:scroll-mt-24 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-primary prose-blockquote:border-l-4 prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-img:rounded-lg prose-img:shadow-md">
                {post.content}
              </div>

              {/* Article Footer */}
              <footer className="mt-8 md:mt-12 pt-6 md:pt-8 border-t not-prose">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    <p>
                      Published on {formatDate(post.frontmatter.publishDate)}
                    </p>
                  </div>
                  <Link href="/blog">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      More Posts
                    </Button>
                  </Link>
                </div>
              </footer>
            </div>
          </Article>
        </Container>
      </Section>
    </PageTransition>
  );
};

export default PagePost;
