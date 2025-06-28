export interface MisheckProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: {
    frontend: string[];
    backend: string[];
    database: string[];
    devops: string[];
    tools: string[];
  };
  experience: Array<{
    role: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    tech: string[];
    link: string;
  }>;
  strengths: string[];
  interests: string[];
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
  languages: string[];
  softSkills: string[];
}

export const misheckProfile: MisheckProfile = {
  name: "Misheck Serima",
  title: "Software Engineer",
  location: "Zimbabwe",
  email: "misheck.serima@gmail.com",
  linkedin: "linkedin.com/in/misheck-serima",
  github: "github.com/misheck-serima",
  
  summary: "Passionate Software Engineer with expertise in full-stack development, specializing in modern web technologies and creating scalable digital solutions. Committed to writing clean, maintainable code and staying updated with the latest industry trends.",
  
  skills: {
    frontend: [
      "React", "TypeScript", "JavaScript", "HTML5", "CSS3", 
      "Tailwind CSS", "Next.js", "Vue.js", "Redux", "Context API",
      "Responsive Design", "Progressive Web Apps", "Material-UI", "Chakra UI"
    ],
    backend: [
      "Node.js", "Python", "Express.js", "Django", "FastAPI", 
      "REST APIs", "GraphQL", "JWT Authentication", "OAuth", 
      "Microservices", "Serverless Functions", "API Design"
    ],
    database: [
      "MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", 
      "Supabase", "Database Design", "ORM (Prisma, Sequelize)", 
      "Data Modeling", "Database Optimization"
    ],
    devops: [
      "Docker", "AWS", "Git", "CI/CD", "Linux", "Nginx", 
      "Vercel", "Netlify", "GitHub Actions", "Cloud Deployment",
      "Server Management", "Performance Optimization"
    ],
    tools: [
      "VS Code", "Postman", "Figma", "Jira", "Slack", "Notion",
      "Chrome DevTools", "GitHub", "Bitbucket", "Webpack", "Vite"
    ]
  },
  
  experience: [
    {
      role: "Software Engineer",
      company: "Freelance/Contract",
      duration: "2022 - Present",
      description: "Developed full-stack web applications for various clients, specializing in React, Node.js, and modern web technologies. Delivered high-quality, scalable solutions that meet client requirements and exceed expectations."
    },
    {
      role: "Full Stack Developer",
      company: "Personal Projects",
      duration: "2021 - Present",
      description: "Built and deployed multiple web applications including e-commerce platforms, portfolio websites, productivity tools, and social media applications. Focused on user experience and performance optimization."
    },
    {
      role: "Web Developer Intern",
      company: "Various Organizations",
      duration: "2021 - 2022",
      description: "Gained hands-on experience in web development, working on real-world projects and learning industry best practices. Collaborated with teams and contributed to various web applications."
    }
  ],
  
  education: [
    {
      degree: "Computer Science",
      institution: "University/Institution",
      year: "2021-2024",
      description: "Focused on software engineering, algorithms, data structures, web development, and computer science fundamentals. Completed coursework in programming, databases, and software architecture."
    },
    {
      degree: "Web Development Certifications",
      institution: "Online Platforms (Udemy, Coursera, freeCodeCamp)",
      year: "2021-2024",
      description: "Completed multiple online courses in React, Node.js, Python, and modern web development technologies. Continuously learning and staying updated with industry trends."
    }
  ],
  
  projects: [
    {
      name: "Portfolio Website",
      description: "Modern, responsive portfolio built with React, TypeScript, and Tailwind CSS. Features smooth animations, dark mode, and optimized performance.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
      link: "Current portfolio"
    },
    {
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, user authentication, admin dashboard, and inventory management.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Redux"],
      link: "GitHub"
    },
    {
      name: "Task Management App",
      description: "Collaborative task management application with real-time updates, team collaboration, and project tracking features.",
      tech: ["React", "Socket.io", "Express.js", "PostgreSQL", "Real-time"],
      link: "GitHub"
    },
    {
      name: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with data visualization, scheduling, and performance tracking.",
      tech: ["React", "Chart.js", "Node.js", "MongoDB", "REST APIs"],
      link: "GitHub"
    },
    {
      name: "Weather Application",
      description: "Real-time weather application with location-based forecasts, interactive maps, and weather alerts.",
      tech: ["React", "Weather APIs", "Geolocation", "CSS3", "Responsive Design"],
      link: "GitHub"
    }
  ],
  
  strengths: [
    "Quick learner and adaptable to new technologies",
    "Strong problem-solving and analytical skills",
    "Excellent communication and collaboration abilities",
    "Passionate about clean code and best practices",
    "Experience with modern development workflows",
    "Understanding of both frontend and backend development",
    "Attention to detail and quality assurance",
    "Ability to work independently and in teams",
    "Strong debugging and troubleshooting skills",
    "Commitment to continuous learning and improvement"
  ],
  
  interests: [
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "Open Source Projects",
    "UI/UX Design",
    "Emerging Technologies",
    "Artificial Intelligence",
    "Machine Learning",
    "Blockchain Technology",
    "Cybersecurity"
  ],
  
  certifications: [
    {
      name: "React Development",
      issuer: "Meta",
      year: "2023"
    },
    {
      name: "Node.js Development",
      issuer: "freeCodeCamp",
      year: "2023"
    },
    {
      name: "Python Programming",
      issuer: "Coursera",
      year: "2022"
    },
    {
      name: "Web Development Fundamentals",
      issuer: "freeCodeCamp",
      year: "2021"
    }
  ],
  
  languages: [
    "English (Fluent)",
    "Shona (Native)",
    "Ndebele (Conversational)"
  ],
  
  softSkills: [
    "Team Collaboration",
    "Problem Solving",
    "Time Management",
    "Adaptability",
    "Communication",
    "Leadership",
    "Critical Thinking",
    "Creativity",
    "Attention to Detail",
    "Customer Focus"
  ]
}; 