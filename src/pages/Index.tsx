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
import { Link, useNavigate } from "react-router-dom";
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
      liveUrl: "https://new-version-hair-salon.vercel.app",
      githubUrl: "https://github.com/misheckserima/new-version-hair-salon"
    },
    {
      id: 2,
      title: "AI Stock Management System",
      description: "An intelligent inventory management solution powered by AI analytics.",
      image: "/projectpics/aistockwise.png",
      tags: ["Python", "React", "Node.js", "MongoDB", "AI/ML"],
      category: "Web Development",
      liveUrl: "https://ai-stock-management.vercel.app",
      githubUrl: "https://github.com/misheckserima/ai-stock-management"
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
      title: "Software Engineer Portfolio",
      description: "A personal portfolio built to showcase technical skills, projects, and experience.",
      image: "/projectpics/portfolio.png",
      tags: ["React", "Vite", "TailwindCSS", "Lottie", "Framer Motion"],
      category: "Web Development",
      liveUrl: "https://software-engineer-portfolio-omega.vercel.app/",
      githubUrl: "https://github.com/misheckserima/software-engineer-portfolio"
    },
    {
      id: 5,
      title: "Nova Tech E-Commerce",
      description: "A scalable e-commerce platform for selling tech gadgets and accessories online.",
      image: "/projectpics/technov.png",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "TailwindCSS"],
      category: "Web Development",
      liveUrl: "https://nova-tech-ecommerce.vercel.app",
      githubUrl: "https://github.com/misheckserima/nova-tech-ecommerce"
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
    }
  ];

  // Get first 3 projects for the home page
  const featuredProjects = allProjects.slice(0, 3);
  
  // Initialize navigation
  const navigate = useNavigate();

  // Tech animation elements
  const codeSymbols = ['{ }', '</>', '=""', '()', '[]', '=>', '++', '/**/'];
  
  // Function to handle resume download
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/misheckresume.pdf';
    link.download = 'Misheck_Serima_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      
      {/* Resume Download Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Interested in My Work?</h2>
            <p className="text-lg text-gray-600 mb-8">
              I'm currently open to new opportunities and would love to connect with potential employers, 
              collaborators, or anyone interested in my work. Feel free to download my resume or reach out 
              through the contact form.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={handleDownloadResume}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Download Resume
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 px-8 py-6 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/contact">
                  Contact Me
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
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
            
            <p className="mt-6 text-center text-gray-600">
              Check out more skills in the Skills tab
            </p>
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
