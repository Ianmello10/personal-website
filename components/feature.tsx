"use client";

import Link from "next/link";
import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface PropsWeather {
  loc: string;
  condition: string;
  temp: number;
}

function TypingText({
  text,
  onComplete,
  speed = 80,
}: {
  text: string;
  onComplete?: () => void;
  speed?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete && currentIndex === text.length) {
      onComplete();
    }
  }, [currentIndex, text, onComplete, speed]);

  return <span>{displayText}</span>;
}

function Terminal({ props }: { props: PropsWeather }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTypingCommand, setIsTypingCommand] = useState(true);
  const [weather] = useState("30°C");
  const [time, setTime] = useState("");

  const commands = [
    { command: "whoami", output: "I'm Ian full-stack developer" },
    {
      command: "ls skills/",
      output:
        "react.js  typescript  node.js  postgresql  git  tailwind  next.js",
    },
    { command: "cat status.txt", output: "Available for new projects ✨" },
    {
      command: "curl wttr.in/saopaulo?format=3",
      output: `${props.loc}, ${props.condition} , ${props.temp}°C`,
    },
    {
      command: "date",
      output: `${new Date().toLocaleString()}`,
    },
    {
      command: "git status",
      output: "On branch main\nYour branch is up to date",
    },
  ];

  // Reinicia o terminal
  const resetTerminal = useCallback(() => {
    setCurrentStep(0);
    setIsTypingCommand(true);
  }, []);

  const handleCommandComplete = useCallback(() => {
    setIsTypingCommand(false);
  }, []);

  const handleOutputComplete = useCallback(() => {
    const nextStep = () => {
      if (currentStep < commands.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setIsTypingCommand(true);
      } else {
        setTimeout(resetTerminal, 1000); // Tempo menor para reiniciar
      }
    };

    setTimeout(nextStep, 500); // Tempo entre comandos reduzido
  }, [currentStep, commands.length, resetTerminal]);

  return (
    <motion.div
      className="w-full max-w-2xl bg-black/95 rounded-lg overflow-hidden font-mono text-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center justify-between bg-zinc-900 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-gray-400 text-xs">terminal</div>
        <div className="text-gray-400 text-xs">{weather}</div>
      </div>

      <div className="p-4 min-h-96 overflow-hidden pb-10">
        <div className="space-y-3">
          {commands.slice(0, currentStep).map((cmd, index) => (
            <div key={`completed-${index}`} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-green-400">$</span>
                <span className="text-white">{cmd.command}</span>
              </div>
              <div className="text-gray-300 ml-4 whitespace-pre-line">
                {cmd.output}
              </div>
            </div>
          ))}

          {currentStep < commands.length && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-green-400">$</span>
                <span className="text-white">
                  {isTypingCommand ? (
                    <TypingText
                      key={`command-${currentStep}`}
                      text={commands[currentStep].command}
                      onComplete={handleCommandComplete}
                      speed={100}
                    />
                  ) : (
                    commands[currentStep].command
                  )}
                </span>
              </div>

              {!isTypingCommand && (
                <div className="text-gray-300 ml-4 whitespace-pre-line">
                  <TypingText
                    key={`output-${currentStep}`}
                    text={commands[currentStep].output}
                    onComplete={handleOutputComplete}
                    speed={60}
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-green-400">$</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="text-white"
            >
              _
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Feature = ({ props }: { props: PropsWeather }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative"
    >
      <Section className="py-16 md:py-24">
        <Container className="grid items-center md:grid-cols-2 gap-12 md:gap-16 max-w-screen-2xl">
          {/* Content Section */}
          <motion.div
            variants={itemVariants}
            className="space-y-8 order-2 md:order-1"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <Badge
                variant="secondary"
                className="gap-2 px-3 py-1.5 text-sm font-medium"
              >
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75" />
                  <div className="relative h-2 w-2 rounded-full bg-green-500" />
                </div>
                Available for work
              </Badge>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Full Stack
                <br />
                <span className="text-muted-foreground">Developer</span>
              </h1>

              <p className="text-lg text-muted-foreground font-mono">
                Building modern web applications
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              Specialized in React ecosystem, backend architecture, and creating
              seamless user experiences from concept to deployment.
            </motion.p>

            {/* Tech Stack */}
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "PostgreSQL",
                  "Git",
                ].map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.3 }}
                  >
                    <Badge variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download CV
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={"/projects"}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 bg-transparent"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Projects
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-1"
            >
              {[
                {
                  icon: Github,
                  href: "https://github.com/Ianmello10",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/lucas-i-67041b272/",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:your-email@example.com",
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={href} aria-label={label}>
                      <Icon className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Terminal Section */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center order-1 md:order-2"
          >
            <Terminal props={props} />
          </motion.div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default Feature;
