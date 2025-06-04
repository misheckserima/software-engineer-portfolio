// Import layout and component dependencies
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";
import ProjectSlideshow from "@/components/ProjectSlideshow";
import ReviewsSection from "@/components/ReviewsSection";

// Import UI components
import { Button } from "@/components/ui/button";

// Import icons from Lucide
import { Code, Database, Globe, Server, Smartphone } from "lucide-react";

// Import routing and state management
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Main Index page component
const Index = () => {
  // State to track if component has loaded
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set loaded state when component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // List of skills to display
  const featuredSkills = [
    {
      title: "Web Development",
      description: "Creating responsive and dynamic websites with modern frameworks",
      icon: Globe
    },
    {
      title: "Mobile Development",
      description: "Building native and cross-platform mobile applications",
      icon: Smartphone
    },
    {
      title: "Systems Software",
      description: "Developing efficient backend systems and infrastructure",
      icon: Server
    },
    {
      title: "Database Management",
      description: "Designing and optimizing database solutions",
      icon: Database
    },
  ];

  // List of featured projects
  const allProjects = [
    {
      id: 1,
      title: "NewVersion Hair Salon",
      description: "A modern website built for a professional hair salon to increase bookings and visibility.",
      image: "/projectpics/newversion.png",
      tags: ["HTML", "CSS", "React", "Node.js"],
      category: "Web Development",
      liveUrl: "https://newversionhairsalon.com",
      githubUrl: "https://github.com/username/hair-salon"
    },
    {
      id: 2,
      title: "AI Stock Management System",
      description: "An intelligent inventory management solution powered by AI analytics.",
      image: "/projectpics/aistockwise.png",
      tags: ["Python", "React", "Node.js", "MongoDB", "AI/ML"],
      category: "Web Development",
      liveUrl: "https://aistock.example.com",
      githubUrl: "https://github.com/username/ai-stock-system"
    },
    {
      id: 3,
      title: "AI Resume Builder",
      description: "An AI-powered tool that helps users generate professional resumes easily.",
      image: "/projectpics/airesume.png",
      tags: ["React", "OpenAI API", "Node.js", "MongoDB"],
      category: "Web Development",
      liveUrl: "https://airesumebuilder.example.com",
      githubUrl: "https://github.com/username/ai-resume-builder"
    },
    {
      id: 4,
      title: "Software Engineer Portfolio",
      description: "A personal portfolio built to showcase technical skills, projects, and experience.",
      image: "/projectpics/portfolio.png",
      tags: ["React", "Vite", "TailwindCSS", "Lottie", "Framer Motion"],
      category: "Web Development",
      githubUrl: "https://github.com/username/portfolio"
    },
    {
      id: 5,
      title: "TechNov E-Commerce",
      description: "A scalable e-commerce platform for selling tech gadgets and accessories online.",
      image: "/projectpics/technov.png",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "TailwindCSS"],
      category: "Web Development",
      liveUrl: "https://technov.example.com",
      githubUrl: "https://github.com/username/technov-ecommerce"
    },
    {
      id: 6,
      title: "Software Engineer Blog",
      description: "A complete blog site for sharing engineering insights, projects, and tutorials.",
      image: "/projectpics/blog.png",
      tags: ["React", "Markdown", "Node.js", "TailwindCSS"],
      category: "Web Development",
      liveUrl: "https://blog.example.com",
      githubUrl: "https://github.com/username/tech-blog"
    }
  ];

  // Get first 3 projects for the home page
  const featuredProjects = allProjects.slice(0, 3);

  // Tech animation elements
  const codeSymbols = ['{ }', '</>', '=""', '()', '[]', '=>', '++', '/**/'];
  
  return (
    <Layout>
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100">
        {/* Animated tech background elements */}
        <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
          {codeSymbols.map((symbol, i) => (
            <div 
              key={i}
              className="absolute font-fira text-2xl text-blue-600 opacity-30 animate-float"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 5}s`
              }}
            >
              {symbol}
            </div>
          ))}
        </div>
        
        <Hero />
        
        {/* Featured Project Slideshow */}
        <section className="section bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Featured Work</h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Browse through my latest projects with video previews
              </p>
            </div>
            <ProjectSlideshow />
          </div>
        </section>
        
        {/* Skills Section */}
        <section className="section bg-white relative">
          <div className="container mx-auto px-4 py-12">
            <div className="absolute inset-0 bg-gradient-radial from-blue-50/30 to-transparent opacity-20"></div>
            
            <div className="mb-12 text-center relative">
              <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">My Skills</h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                I have experience with a variety of technologies across multiple domains
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {featuredSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className={`transition-all duration-700 transform ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`} 
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                >
                  <SkillCard 
                    title={skill.title}
                    description={skill.description}
                    icon={skill.icon}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Link to="/skills">
                  View all skills
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section className="section bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">More Projects</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Check out some of my recent work
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`transition-all duration-700 transform ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`} 
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  <ProjectCard
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
            
            <div className="mt-10 text-center">
              <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                <Link to="/projects">
                  View All Projects
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Reviews Section */}
        <ReviewsSection />
        
        {/* Contact CTA */}
        <section className="section bg-white text-slate-800 text-center relative overflow-hidden">
          {/* Tech circuit pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute bg-blue-500"
                  style={{
                    height: '1px',
                    width: `${20 + Math.random() * 30}%`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: 0.3 + Math.random() * 0.7,
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                  }}
                />
              ))}
              
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i + 100}
                  className="absolute rounded-full bg-pink-500"
                  style={{
                    height: '4px',
                    width: '4px',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: 0.5 + Math.random() * 0.5,
                    boxShadow: '0 0 10px rgba(236, 72, 153, 0.8)'
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-16 max-w-3xl relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Let's work together</h2>
            <p className="text-lg mb-8 text-slate-600">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Link to="/contact">
                Get in touch
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
