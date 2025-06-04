import { useState } from "react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  // List of all projects to show
  const allProjects = [
    {
      id: 1,
      title: "Software Engineer Portfolio",
      description: "A personal portfolio built to showcase technical skills, projects, and experience.",
      image: "/projectpics/portfolio.png",
      tags: ["React", "Vite", "TailwindCSS", "Lottie", "Framer Motion"],
      category: "Web Development",
      liveUrl: "https://software-engineer-portfolio-omega.vercel.app/",
      githubUrl: "https://github.com/misheckserima/software-engineer-portfolio"
    },
    {
      id: 2,
      title: "Nova Tech E-Commerce",
      description: "A scalable e-commerce platform for selling tech gadgets and accessories online.",
      image: "/projectpics/technov.png",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "TailwindCSS"],
      category: "Web Development",
      liveUrl: "https://nova-tech-ecommerce.vercel.app",
      githubUrl: "https://github.com/misheckserima/nova-tech-ecommerce"
    },
    {
      id: 3,
      title: "AI Resume Builder",
      description: "An AI-powered tool that helps users generate professional resumes easily.",
      image: "/projectpics/airesume.png",
      tags: ["React", "OpenAI API", "Node.js", "MongoDB"],
      category: "Web Development",
      liveUrl: "https://ai-resume-builder-one-iota.vercel.app/",
      githubUrl: "https://github.com/misheckserima/ai-resume-builder"
    },
    {
      id: 4,
      title: "NewVersion Hair Salon",
      description: "A modern website built for a professional hair salon to increase bookings and visibility.",
      image: "/projectpics/newversion.png",
      tags: ["HTML", "CSS", "React", "Node.js"],
      category: "Web Development",
      liveUrl: "https://new-version-hair-salon.vercel.app",
      githubUrl: "https://github.com/misheckserima/new-version-hair-salon"
    },
    {
      id: 5,
      title: "AI Stock Management System",
      description: "An intelligent inventory management solution powered by AI analytics.",
      image: "/projectpics/aistockwise.png",
      tags: ["Python", "React", "Node.js", "MongoDB", "AI/ML"],
      category: "Web Development",
      liveUrl: "https://ai-stock-management.vercel.app",
      githubUrl: "https://github.com/misheckserima/ai-stock-management"
    },
    {
      id: 6,
      title: "Software Engineer Blog",
      description: "A complete blog site for sharing engineering insights, projects, and tutorials.",
      image: "/projectpics/blog.png",
      tags: ["React", "Markdown", "Node.js", "TailwindCSS"],
      category: "Web Development",
      liveUrl: "https://software-engineer-blog.vercel.app",
      githubUrl: "https://github.com/misheckserima/software-engineer-blog"
    },
  ];
  
  // Show all projects since they're all web projects
  const filteredProjects = allProjects;

  return (
    <Layout>
      {/* Main container */}
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          {/* Page title */}
          <h1 className="text-4xl font-bold mb-8 text-gray-900 inline-block">My Projects</h1>
          
          {/* Show how many projects are displayed */}
          <div className="mb-8 text-center">
            <Badge variant="outline" className="text-sm font-normal text-gray-600 border-gray-200">
              Showing {filteredProjects.length} projects
            </Badge>
          </div>
          
          {/* Grid of project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  liveUrl={project.liveUrl}
                  githubUrl={project.githubUrl}
                  category={project.category}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
