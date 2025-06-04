import { ArrowRight, Code, Cpu, Database, Code2, Server, Terminal, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
  }, []);
  
  return (
    <div className="relative min-h-screen text-slate-800 overflow-hidden">
      {/* Background with image and custom gradient overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-[url('/profileimages/background.png')] bg-cover bg-center"
          style={{
            opacity: 0.08,
            filter: 'brightness(0.8) contrast(1.2)'
          }}
        />
        
        {/* Horizontal Lines Effect */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute left-0 right-0 h-px bg-white/40"
              style={{
                top: `${(i + 1) * 12.5}%`,
                boxShadow: '0 0 8px 1px rgba(255,255,255,0.4)'
              }}
            />
          ))}
        </div>
        
        {/* Gradient with purple shifted right */}
        <div className="absolute inset-0 bg-gradient-to-r 
          from-white/80 via-white/60 80%,
          to-purple-300/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r 
          from-transparent 60%,
          via-purple-900/30 85%,
          to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60"></div>
        
        {/* Tech circuit pattern overlay - Enhanced visibility */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-gradient-to-r from-primary via-secondary to-primary"
                style={{
                  height: '1.5px',
                  width: `${25 + Math.random() * 40}%`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.7 + Math.random() * 0.3,
                  boxShadow: '0 0 8px 1px var(--primary)',
                  filter: 'drop-shadow(0 0 2px var(--primary))'
                }}
              />
            ))}
            
            {[...Array(13)].map((_, i) => (
              <div 
                key={i + 100}
                className="absolute rounded-full bg-gradient-to-r from-primary to-secondary"
                style={{
                  height: '5px',
                  width: '5px',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.9 + Math.random() * 0.1,
                  boxShadow: '0 0 12px 2px var(--primary)',
                  filter: 'drop-shadow(0 0 3px var(--primary))'
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Main content container */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 text-center md:text-left">
            {/* Main heading with animation */}
            <div className="mb-1">
              <div 
                className={`text-2xl sm:text-3xl font-cursive text-slate-700 transition-all duration-700 transform ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-[20px] opacity-0'
                }`}
                style={{
                  fontFamily: '"Dancing Script", cursive, system-ui, -apple-system, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                Hi, I'm <span className="text-blue-600">Misheck Serima</span>
              </div>
            </div>
            <h1 
              className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-2 transition-all duration-700 transform ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-[20px] opacity-0'
              }`}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Software Engineer
              </span>
            </h1>
            
            {/* Description text with animation */}
            <p 
              className={`text-lg md:text-xl text-slate-600 mb-8 transition-all duration-700 delay-300 transform ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-[20px] opacity-0'
              }`}
            >
              I create modern web applications and digital experiences that help businesses grow and succeed in the digital age.
            </p>

            {/* Tech Stack Icons - Reduced and simplified */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8 opacity-90">
              {[
                { icon: <Code className="h-3.5 w-3.5 text-blue-500" />, name: 'Frontend' },
                { icon: <Server className="h-3.5 w-3.5 text-purple-500" />, name: 'Backend' },
                { icon: <Database className="h-3.5 w-3.5 text-cyan-500" />, name: 'Database' },
                { icon: <Cpu className="h-3.5 w-3.5 text-pink-500" />, name: 'DevOps' },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/60 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-200"
                >
                  {item.icon}
                  <span className="text-[11px] font-medium text-slate-600">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Quote before buttons */}
            <div className="w-full mb-8 text-center md:text-left">
              <p className="text-sm text-slate-500 italic">
                "The best way to predict the future is to implement it."
                <span className="block text-xs mt-1">- David Heinemeier Hansson</span>
              </p>
            </div>
            
            {/* Action buttons with animation */}
            <div 
              className={`flex flex-wrap justify-center md:justify-start gap-4 transition-all duration-700 delay-700 transform ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-[20px] opacity-0'
              }`}
            >
              {/* Contact button */}
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg shadow-blue-600/20">
                <Link to="/contact">
                  Get in touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {/* Projects button */}
              <Button asChild size="lg" variant="outline" className="border-2 border-pink-500/70 text-pink-600 hover:bg-pink-50 shadow-lg shadow-pink-500/20 bg-white/80">
                <Link to="/projects">
                  View projects
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Profile image section */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <div 
              className={`relative transition-all duration-1000 delay-300 transform ${
                isLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              }`}
            >
              {/* Profile image container with glow effect */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/80 backdrop-blur-md p-4 flex items-center justify-center border border-blue-200 animate-pulse-slow shadow-2xl shadow-blue-500/20">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500/60 to-purple-500/60">
                  <img 
                    src="/profileimages/profile.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-gradient-to-tr from-pink-400/20 to-purple-400/20 blur-xl"></div>
              
              {/* Code decoration elements - Symbols only */}
              <div className="absolute -top-6 -right-2 text-pink-500/90 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="font-fira-mono text-2xl">{"{"}</div>
              </div>
              <div className="absolute top-1/4 -left-6 text-blue-500/90 animate-float" style={{ animationDelay: '1s' }}>
                <div className="font-fira-mono text-2xl">{"}"}</div>
              </div>
              <div className="absolute bottom-8 right-8 text-purple-500/90 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="font-fira-mono text-3xl">{"</>"}</div>
              </div>
              <div className="absolute top-3/4 -right-6 text-cyan-500/90 animate-float" style={{ animationDelay: '0.8s' }}>
                <div className="font-fira-mono text-2xl">{"["}</div>
              </div>
              <div className="absolute bottom-1/4 -left-4 text-emerald-500/90 animate-float" style={{ animationDelay: '1.2s' }}>
                <div className="font-fira-mono text-2xl">{"]"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f8fafc" fillOpacity="0.9" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
