import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { Section, Container } from "./craft";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="not-prose   bg-gradient-to-b from-background to-muted/20">
      <Section className="py-10 md:py-10">
        <Container className="max-w-screen-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link href="/" className="group">
                <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                  Ian/developer
                </h3>
              </Link>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                <Balancer>
                  Building cool stuff with passion and precision
                </Balancer>
              </p>
            </div>

            {/* Right Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <Link
                href="https://github.com/Ianmello10"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">GitHub</span>
              </Link>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 - present{" "}
                <Link
                  href="https://github.com/Ianmello10"
                  className="font-medium hover:text-foreground transition-colors"
                >
                  Ian/developer
                </Link>
                . All rights reserved.
              </p>

              <p className="text-xs text-muted-foreground/80">
                Made with ❤️ and Next.js
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
