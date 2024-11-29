"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Briefcase,
  FolderGit2,
} from "lucide-react";

interface PortfolioData {
  basicInfo: {
    name: string;
    imageUrl: string;
    bio: string;
    skills: string[];
    socialMedia: {
      github: string;
      linkedin: string;
      twitter: string;
    };
  };
  experiences: { company: string; position: string; description: string }[];
  projects: { name: string; link: string; description: string }[];
}

export default function PortfolioPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    const basicInfo = JSON.parse(
      localStorage.getItem("portfolioBasicInfo") || "{}"
    );
    const experiences = JSON.parse(
      localStorage.getItem("portfolioExperiences") || "[]"
    );
    const projects = JSON.parse(
      localStorage.getItem("portfolioProjects") || "[]"
    );
    setPortfolioData({ basicInfo, experiences, projects });
  }, []);

  if (!portfolioData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-foreground">
      <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {portfolioData.basicInfo.name}
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center">
              <Link href="/form">
                <Button className="gradient-button">
                  <span>Edit Portfolio</span>
                </Button>
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
          <Card className="glass md:sticky md:top-20 md:h-fit">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src={portfolioData.basicInfo.imageUrl}
                  alt={portfolioData.basicInfo.name}
                  className="w-32 h-32 rounded-full mb-4 border-2 border-pink-500"
                />
                <h1 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {portfolioData.basicInfo.name}
                </h1>
                <p className="text-gray-400 mb-4">
                  {portfolioData.basicInfo.bio}
                </p>
                <div className="flex space-x-4 mb-4">
                  {portfolioData.basicInfo.socialMedia.github && (
                    <a
                      href={portfolioData.basicInfo.socialMedia.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  {portfolioData.basicInfo.socialMedia.linkedin && (
                    <a
                      href={portfolioData.basicInfo.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  {portfolioData.basicInfo.socialMedia.twitter && (
                    <a
                      href={portfolioData.basicInfo.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300"
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {portfolioData.basicInfo.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card className="glass overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
                  <h2 className="text-xl font-semibold mb-2 flex items-center text-white">
                    <Briefcase className="mr-2" /> Experience
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  {portfolioData.experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="relative pl-6 pb-4 border-l-2 border-pink-500 last:border-l-0"
                    >
                      <div className="absolute w-4 h-4 bg-pink-500 rounded-full -left-[9px] top-1"></div>
                      <h3 className="font-semibold text-pink-400">
                        {exp.position}
                      </h3>
                      <p className="text-sm text-gray-400">{exp.company}</p>
                      <p className="mt-2 text-gray-300">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="glass overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4">
                  <h2 className="text-xl font-semibold mb-2 flex items-center text-white">
                    <FolderGit2 className="mr-2" /> Projects
                  </h2>
                </div>
                <div className="p-4 grid gap-4 md:grid-cols-2">
                  {portfolioData.projects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <h3 className="font-semibold text-cyan-400 flex items-center justify-between">
                        {project.name}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </h3>
                      <p className="mt-2 text-gray-300 text-sm">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
