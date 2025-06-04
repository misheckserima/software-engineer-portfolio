
import Layout from "@/components/Layout";
import SkillCard from "@/components/SkillCard";
import { Progress } from "@/components/ui/progress";
import { Code, Database, File, Github, Globe, Server, Settings, Smartphone, Users } from "lucide-react";

const Skills = () => {
  const allSkills = [
    {
      title: "Web Development",
      description: "Building responsive, accessible and performant web applications",
      icon: Globe,
    },
    {
      title: "Mobile Development",
      description: "Creating native and cross-platform mobile applications",
      icon: Smartphone,
    },
    {
      title: "Systems Software",
      description: "Developing backend systems, APIs, and infrastructure",
      icon: Server,
    },
    {
      title: "Database Management",
      description: "Designing and optimizing database solutions",
      icon: Database,
    },
    {
      title: "Version Control",
      description: "Managing code with Git and collaborative workflows",
      icon: Github,
    },
    {
      title: "Full Stack Development",
      description: "End-to-end implementation across frontend and backend",
      icon: Code,
    },
    {
      title: "System Administration",
      description: "Configuring and maintaining servers and infrastructure",
      icon: Settings,
    },
    {
      title: "Technical Documentation",
      description: "Creating clear documentation for projects and APIs",
      icon: File,
    },
    {
      title: "Team Collaboration",
      description: "Working effectively in agile development teams",
      icon: Users,
    },
  ];

  const technicalSkills = [
    { name: "React/Next.js", level: 85, icon: "⚛️" },
    { name: "TypeScript", level: 75, icon: "🔷" },
    { name: "Node.js", level: 85, icon: "🟢" },
    { name: "Python", level: 85, icon: "🐍" },
    { name: "Java", level: 70, icon: "☕" },
    { name: "C++", level: 80, icon: "⚡" },
    { name: "PHP", level: 85, icon: "🐘" },
    { name: "Django", level: 88, icon: "🎯" },
    { name: "MySQL", level: 90, icon: "🗄️" },
    { name: "MongoDB", level: 85, icon: "🍃" },
    { name: "Vite", level: 92, icon: "⚡" },
    { name: "Git & Version Control", level: 90, icon: "🔧" },
    { name: "HTML/CSS", level: 95, icon: "🌐" },
    { name: "Tailwind CSS", level: 90, icon: "🎨" },
    { name: "AWS", level: 75, icon: "☁️" }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 gradient-text inline-block">My Skills</h1>
        
        {/* Skill Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Skill Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allSkills.map((skill, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <SkillCard
                  title={skill.title}
                  description={skill.description}
                  icon={skill.icon}
                />
              </div>
            ))}
          </div>
        </section>
        
        {/* Technical Proficiency */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Technical Proficiency</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {technicalSkills.map((skill, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="mb-2 flex justify-between items-center">
                  <span className="font-medium">{skill.icon} {skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </section>
        
        {/* Skills Background */}
        <section className="bg-skills-pattern text-black p-8 rounded-lg">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">My Approach to Development</h2>
            <div className="space-y-4">
              <p>
                I believe in writing clean, maintainable code that solves real problems. My development philosophy centers around
                understanding user needs and business requirements before diving into code.
              </p>
              <p>
                Throughout my career, I've developed a strong foundation in software engineering principles while staying current with
                emerging technologies and best practices. I enjoy taking on challenging projects that push me to learn and grow.
              </p>
              <p>
                Beyond technical skills, I value clear communication, thoughtful planning, and collaborative problem-solving. I approach
                each project with a focus on delivering quality solutions that exceed expectations.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Skills;
