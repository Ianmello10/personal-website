"use client";

import { Container } from "@/components/craft";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import logo from "../public/images/foi2.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

type ComponentList = {
  title: string;
  href: string;
};

export default function NavBar() {
  const router = usePathname();
  const isBlog = router.includes("blog");
  const isHome = !router.includes("blog");

  const components: ComponentList[] = [
    { title: isHome ? "" : "Home", href: "/" },
    { title: isBlog ? "" : "Blog", href: "/blog" },
  ];

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
      className="sticky top-4 z-50 w-full "
    >
      <Container className="not-prose max-w-screen-2xl w-full ">
        <motion.nav
          className="flex items-center justify-between h-14 bg-background/80 backdrop-blur-md border border-border/50 px-6 rounded-full shadow-sm"
          whileHover={{ boxShadow: "0 8px 12px rgba(0, 0, 0, 0.03)" }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo Section */}
          <motion.div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                className="relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="Logo"
                  width={32}
                  height={32}
                  priority={true}
                  className=" transition-all duration-300"
                />
              </motion.div>
              <h1 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors duration-200">
                Ian
              </h1>
            </Link>
          </motion.div>

          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            {listItems(components)}
            <div className="ml-2 pl-2 border-l border-border/50">
              <ModeToggle />
            </div>
          </div>
        </motion.nav>
      </Container>
    </motion.div>
  );
}

const listItems = (components: ComponentList[]) => {
  const pathname = usePathname();

  return (
    <ul className="list-none flex items-center gap-1">
      {components
        .filter((component) => component.title !== "")
        .map((component) => {
          const isActive = pathname === component.href;

          return (
            <motion.li
              key={component.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={component.href}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                  ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }
                `}
              >
                {component.title}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-primary/5 rounded-full border border-primary/20"
                    layoutId="activeTab"
                    transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] }}
                  />
                )}
              </Link>
            </motion.li>
          );
        })}
    </ul>
  );
};
