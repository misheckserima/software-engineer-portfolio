
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface SkillCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const SkillCard = ({ title, description, icon: Icon }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="skill-card group transition-all duration-300 ease-in-out transform hover:-translate-y-2 text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`mx-auto p-4 rounded-full 
          ${isHovered ? 'bg-primary/60' : 'bg-primary/20'} 
          transition-colors duration-300 mb-4`}
      >
        <Icon 
          className={`h-8 w-8 
            ${isHovered ? 'text-secondary-foreground' : 'text-secondary'} 
            transition-all duration-300
            ${isHovered ? 'scale-110' : 'scale-100'}`} 
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default SkillCard;
