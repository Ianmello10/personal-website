import { Container, Section } from "@/components/craft";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllPosts } from "./utils/posts-utils";
import PageTransition from "@/components/animate";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export const revalidate = 3600;
export const dynamic = "force-static";

export default async function Page() {
  const allPosts = await getAllPosts();

  return (
    <PageTransition>
      <Section className="overflow-hidden flex-grow min-h-screen">
        <Container className="not-prose max-w-screen-2xl">
          <h1 className="text-4xl font-bold mb-2">Latest Posts</h1>
          <p className="text-muted-foreground mb-8">
            Thoughts, tutorials, and insights about web development and
            technology.
          </p>

          <div className="w-full gap-4 mt-6 flex-col grid gap-x-4 md:mt-10 justify-items-center md:justify-items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="w-full group"
              >
                <Card className="flex w-full h-fit flex-col border p-4 shadow-sm ease-in-out duration-300 rounded-lg items-start justify-between hover:shadow-md hover:-translate-y-1 hover:border-primary/20 transition-all cursor-pointer">
                  <CardHeader className="p-0 w-full">
                    {/* Meta info */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(
                          post.frontmatter.publishDate
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-200">
                      {post.frontmatter.title}
                    </h2>
                  </CardHeader>

                  {/* Tags */}
                  <div className="flex mt-3 gap-2 items-center w-full flex-wrap">
                    {post.frontmatter.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        variant="outline"
                        key={index}
                        className="flex items-center justify-center h-5 w-auto px-2 py-0 text-xs hover:bg-primary/10 hover:border-primary/30 transition-colors duration-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {post.frontmatter.tags.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="text-xs px-2 py-0 h-5"
                      >
                        +{post.frontmatter.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mt-4 block line-clamp-3">
                    {post.frontmatter.description}
                  </p>

                  {/* Read More Button */}
                  <div className="w-full mt-6">
                    <Button
                      variant="ghost"
                      className="w-fit flex items-center justify-center gap-2 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-200"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
