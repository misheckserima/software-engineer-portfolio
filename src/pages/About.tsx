import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, File, Github } from "lucide-react";

const About = () => {
  const educationTimeline = [
    {
      year: "2022 - Present",
      title: "HBSc in Software Engineering",
      institution: "Bindura University of Science Education"
    },
    {
      year: "2020 - 2022",
      title: "A Level High School",
      institution: "Oxford High Scool"
    },
    {
      year: "2017 - 2020",
      title: "O Level High School",
      institution: "Wilmar High School"
    }
  ];

  const experienceTimeline = [
    {
      title: "System Software Assistant",
      company: "ZESA Holdings",
      period: "2-Month Contract from February - March, 2025",
      location: "Harare, Zimbabwe",
      description: "Assisted in maintaining and optimizing system software used to run critical database queries. Supported IT operations to ensure reliable performance and availability of internal data systems.",
      technologies: ["SQL", "Windows Server", "Database Management", "Technical Support", "Python Django"]
    },
    {
      title: "Web Developer (Part-Time)",
      company: "The Battery Zone",
      period: "4 Months from June - September, 2024",
      location: "Harare, Zimbabwe",
      description: "Collaborated with a team to design and develop the company's official website. Successfully improved the development rate by 13% and enhanced online presence through responsive design and optimized performance.",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Git"]
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text inline-block">About Me</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Passionate software engineer with expertise in building modern web applications and solving complex problems.
          </p>
        </motion.div>
        
        {/* Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="rounded-lg overflow-hidden mb-6 border shadow-sm">
                <img 
                  src="/profileimages/about.png" 
                  alt="Misheck Serima"
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Github className="h-3 w-3" />
                  GitHub
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Code className="h-3 w-3" />
                  Web Dev
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Database className="h-3 w-3" />
                  Database
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <File className="h-3 w-3" />
                  Documentation
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">My Background</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Hello! I'm Misheck Serima, a passionate software engineer born on October 12, 2002, in Melfort Park, Harare, Zimbabwe. 
                    As a proud Zimbabwean, I've grown to embrace the rich culture and innovative spirit of my homeland while pursuing my dreams in technology.
                  </p>
                  <p>
                    My journey in technology is driven by a powerful vision: to transform African tech innovation and inspire the next generation of developers. 
                    I believe that with dedication, continuous learning, and the right mindset, we can build solutions that not only solve local challenges but 
                    also compete on the global stage.
                  </p>
                  <p>
                    What sets me apart is my unwavering commitment to excellence and my belief in the power of technology to create positive change. 
                    I specialize in building robust web applications and system solutions, always staying at the forefront of emerging technologies. 
                    My approach combines technical expertise with creative problem-solving, ensuring that every project I tackle delivers real value.
                  </p>
                  <p>
                    Beyond coding, I'm an advocate for tech education in Zimbabwe and across Africa. I believe in the potential of our youth and actively 
                    work to create opportunities for aspiring developers. My goal is not just to build great software, but to be part of a movement that 
                    elevates African tech talent to world-class standards.
                  </p>
                  <p>
                    When I'm not immersed in code, I dedicate time to mentoring young developers, participating in tech communities, and exploring innovative 
                    ways to solve real-world problems through technology. I'm always open to collaborations and discussions about how we can use technology 
                    to create a better future for Africa and the world.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Experience */}
            <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
            <div className="space-y-4 mb-10">
              {experienceTimeline.map((item, index) => (
                <Card key={index} className="overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="border-l-4 border-accent pl-6 py-4 pr-4">
                    <span className="text-sm font-medium text-muted-foreground">{item.period}</span>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-accent font-medium">{item.company} • {item.location}</p>
                    <p className="text-muted-foreground mt-2">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Education */}
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <div className="space-y-4">
              {educationTimeline.map((item, index) => (
                <Card key={index} className="overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="border-l-4 border-primary pl-6 py-4 pr-4">
                    <span className="text-sm font-medium text-muted-foreground">{item.year}</span>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-primary font-medium">{item.institution}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
