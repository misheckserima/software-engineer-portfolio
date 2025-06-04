import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  category?: string;
}

const ProjectCard = ({ title, description, image, tags, liveUrl, githubUrl, category }: ProjectCardProps) => {
  return (
    <div className="project-card bg-gray-800 backdrop-blur-md border-gray-700 shadow-xl shadow-gray-900/20 hover:shadow-blue-500/20 group transition-all duration-300">
      <div className="h-[250px] overflow-hidden relative bg-gray-900">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-110" 
          style={{ objectPosition: 'center center', transform: 'scale(1.02)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        
        <div className="mb-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-gray-700 text-cyan-300 border border-gray-600 hover:bg-gray-600">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-3">
          {liveUrl && (
            <Button asChild variant="outline" size="sm" className="text-cyan-300 border-gray-600 hover:bg-gray-700 hover:text-cyan-200">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button asChild variant="outline" size="sm" className="text-cyan-300 border-gray-600 hover:bg-gray-700 hover:text-cyan-200">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
