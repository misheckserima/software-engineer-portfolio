import { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import type { CarouselApi } from "@/components/ui/carousel";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  videoUrl: string;
}

const ProjectSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const featuredProjects: Project[] = [
    {
      id: 1,
      title: "AI Resume Builder",
      description: "An AI-powered tool that helps users generate professional resumes easily.",
      image: "/projectpics/airesume.png",
      tags: ["React", "OpenAI API", "Node.js", "MongoDB"],
      videoUrl: "/projectvidz/airesume.mp4"
    },
    {
      id: 2,
      title: "AI Stock Management System",
      description: "An intelligent inventory management solution powered by AI analytics.",
      image: "/projectpics/aistockwise.png",
      tags: ["Python", "React", "Node.js", "MongoDB", "AI/ML"],
      videoUrl: "/projectvidz/aistock.mp4"
    },
    {
      id: 3,
      title: "Software Engineer Blog",
      description: "A complete blog site for sharing engineering insights and tutorials.",
      image: "/projectpics/blog.png",
      tags: ["React", "Markdown", "Node.js", "TailwindCSS"],
      videoUrl: "/projectvidz/blog.mp4"
    },
    {
      id: 4,
      title: "TechNov E-Commerce",
      description: "A scalable e-commerce platform for selling tech gadgets and accessories online.",
      image: "/projectpics/technov.png",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "TailwindCSS"],
      videoUrl: "/projectvidz/novatech.mp4"
    },
    {
      id: 5,
      title: "NewVersion Hair Salon",
      description: "A modern website built for a professional hair salon to increase bookings and visibility.",
      image: "/projectpics/newversion.png",
      tags: ["HTML", "CSS", "React", "Node.js"],
      videoUrl: "/projectvidz/newversion2.mp4"
    }
  ];

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
      setVideoEnded(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    });
  }, [api]);

  const handleCarouselChange = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
    setCurrentIndex(index);
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <div className="relative animate-fade-in">
      <Carousel 
        className="w-full max-w-5xl mx-auto"
        setApi={setApi}
      >
        <CarouselContent>
          {featuredProjects.map((project) => (
            <CarouselItem key={project.id}>
              <div className="p-1">
                <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                  <div className="aspect-video w-full relative flex items-center justify-center p-2">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
                    <div className="absolute top-4 left-4 font-fira text-xs text-cyan-400 z-20 animate-pulse-slow">PLAYING_DEMO_{project.id}.mp4</div>
                    
                    {/* Watermark */}
                    <div className="absolute bottom-8 right-8 font-fira text-3xl text-white/10 select-none z-20 transform rotate-[-10deg]">
                      CLICK NEXT →
                    </div>
                    
                    <video 
                      ref={videoRef}
                      src={project.videoUrl} 
                      autoPlay
                      muted 
                      playsInline
                      onEnded={handleVideoEnd}
                      className="w-[96%] h-[96%] object-cover rounded-lg"
                    />
                    
                    {videoEnded && (
                      <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/70">
                        <div className="text-center">
                          <p className="text-cyan-400 font-fira text-lg mb-2">Demo Complete</p>
                          <p className="text-slate-300">Click Next to Watch More Project Demos</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 relative">
                    <h3 className="font-bold text-2xl mb-2 text-cyan-300">{project.title}</h3>
                    <p className="text-slate-300 mb-4">{project.description}</p>
                    
                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-slate-700 text-cyan-300 border-cyan-800/50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-12 bg-slate-800 border-slate-700 text-cyan-400 hover:bg-slate-700 hover:text-cyan-300" />
        <CarouselNext className="-right-12 bg-slate-800 border-slate-700 text-cyan-400 hover:bg-slate-700 hover:text-cyan-300" />
      </Carousel>
      
      <div className="flex justify-center mt-4 gap-2">
        {featuredProjects.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index ? "w-8 bg-cyan-400" : "w-2 bg-slate-600"
            }`}
            onClick={() => handleCarouselChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectSlideshow;
