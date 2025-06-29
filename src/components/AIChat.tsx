import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Bot, User, Sparkles, Briefcase, Code, GraduationCap, Award, Globe, Languages, Mic, MicOff, Volume2, Minimize2, Maximize2, ChevronDown } from 'lucide-react';
import { misheckProfile } from '@/data/misheckProfile';
import './AIChat.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
  displayText?: string;
}

interface SampleQuestion {
  id: string;
  text: string;
  category: string;
  icon: React.ReactNode;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm your AI assistant. I know everything about ${misheckProfile.name} - his skills, experience, projects, and background. I can also help with general questions! Ask me anything about him or any other topic.`,
      sender: 'ai',
      timestamp: new Date(),
      displayText: `Hi! I'm your AI assistant. I know everything about ${misheckProfile.name} - his skills, experience, projects, and background. I can also help with general questions! Ask me anything about him or any other topic.`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const sampleQuestions: SampleQuestion[] = [
    {
      id: '1',
      text: "What are Misheck's main technical skills?",
      category: "Skills",
      icon: <Code className="h-4 w-4" />
    },
    {
      id: '2',
      text: "Tell me about Misheck's work experience",
      category: "Experience",
      icon: <Briefcase className="h-4 w-4" />
    },
    {
      id: '3',
      text: "What projects has Misheck worked on?",
      category: "Projects",
      icon: <Sparkles className="h-4 w-4" />
    },
    {
      id: '4',
      text: "Would Misheck be a good fit for a React developer role?",
      category: "Role Fit",
      icon: <Award className="h-4 w-4" />
    },
    {
      id: '5',
      text: "What's Misheck's educational background?",
      category: "Education",
      icon: <GraduationCap className="h-4 w-4" />
    },
    {
      id: '6',
      text: "What are Misheck's strengths as a developer?",
      category: "Strengths",
      icon: <Award className="h-4 w-4" />
    },
    {
      id: '7',
      text: "What languages does Misheck speak?",
      category: "Languages",
      icon: <Languages className="h-4 w-4" />
    },
    {
      id: '8',
      text: "What certifications does Misheck have?",
      category: "Certifications",
      icon: <Award className="h-4 w-4" />
    }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechRef.current = new SpeechSynthesisUtterance();
      speechRef.current.rate = 0.9;
      speechRef.current.pitch = 1;
      speechRef.current.volume = 0.8;
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check if it's about Misheck first
    if (message.includes('misheck') || message.includes('his') || message.includes('he') || message.includes('him')) {
      // Skills related questions
      if (message.includes('skill') || message.includes('technology') || message.includes('tech stack')) {
        return `${misheckProfile.name} has a comprehensive skill set across the full development stack:

**Frontend:** ${misheckProfile.skills.frontend.join(', ')}
**Backend:** ${misheckProfile.skills.backend.join(', ')}
**Database:** ${misheckProfile.skills.database.join(', ')}
**DevOps:** ${misheckProfile.skills.devops.join(', ')}
**Tools:** ${misheckProfile.skills.tools.join(', ')}

He's particularly strong in React, TypeScript, Node.js, and modern web development practices.`;
      }
      
      // Experience related questions
      if (message.includes('experience') || message.includes('work') || message.includes('job')) {
        return `${misheckProfile.name}'s professional experience includes:

${misheckProfile.experience.map(exp => 
  `**${exp.role} at ${exp.company}** (${exp.duration})
  ${exp.description}`
).join('\n\n')}

He has been actively developing full-stack applications and working with clients to deliver modern web solutions.`;
      }
      
      // Projects related questions
      if (message.includes('project') || message.includes('portfolio') || message.includes('built')) {
        return `${misheckProfile.name} has worked on several notable projects:

${misheckProfile.projects.map(project => 
  `**${project.name}**
  ${project.description}
  Technologies: ${project.tech.join(', ')}`
).join('\n\n')}

His projects demonstrate his ability to build complete, production-ready applications.`;
      }
      
      // Role fit questions
      if (message.includes('fit') || message.includes('role') || message.includes('position') || message.includes('developer')) {
        const roleMatch = analyzeRoleFit(message);
        return roleMatch;
      }
      
      // Education questions
      if (message.includes('education') || message.includes('degree') || message.includes('university')) {
        return `${misheckProfile.name}'s educational background:

${misheckProfile.education.map(edu => 
  `**${edu.degree}** from ${edu.institution} (${edu.year})
  ${edu.description}`
).join('\n\n')}

He has a strong foundation in computer science principles and software engineering.`;
      }
      
      // Strengths questions
      if (message.includes('strength') || message.includes('strong') || message.includes('good at')) {
        return `${misheckProfile.name}'s key strengths as a developer:

${misheckProfile.strengths.map(strength => `• ${strength}`).join('\n')}

These qualities make him a valuable team member and effective problem solver.`;
      }

      // Languages questions
      if (message.includes('language') || message.includes('speak')) {
        return `${misheckProfile.name} speaks the following languages:

${misheckProfile.languages.map(lang => `• ${lang}`).join('\n')}

This multilingual ability helps him communicate effectively in diverse work environments.`;
      }

      // Certifications questions
      if (message.includes('certification') || message.includes('certificate')) {
        return `${misheckProfile.name} has earned several certifications:

${misheckProfile.certifications.map(cert => 
  `• **${cert.name}** from ${cert.issuer} (${cert.year})`
).join('\n')}

These certifications demonstrate his commitment to continuous learning and professional development.`;
      }

      // Soft skills questions
      if (message.includes('soft skill') || message.includes('communication') || message.includes('team')) {
        return `${misheckProfile.name}'s soft skills include:

${misheckProfile.softSkills.map(skill => `• ${skill}`).join('\n')}

These skills complement his technical abilities and make him an effective team member.`;
      }
      
      // General questions about Misheck
      if (message.includes('who') || message.includes('about')) {
        return `${misheckProfile.name} is a passionate ${misheckProfile.title} based in ${misheckProfile.location}. ${misheckProfile.summary}

**Key Highlights:**
• Full-stack development expertise
• Experience with modern web frameworks
• Strong problem-solving skills
• Passionate about clean code and best practices
• Quick learner and adaptable

He's always eager to take on new challenges and contribute to innovative projects!`;
      }
    }
    
    // General knowledge questions
    if (message.includes('what is') || message.includes('how to') || message.includes('explain') || message.includes('tell me about')) {
      return generateGeneralKnowledgeResponse(message);
    }
    
    // Default response
    return `I'm here to help you learn about ${misheckProfile.name} and answer general questions! You can ask me about:
• His technical skills and experience
• Projects he's worked on
• Whether he'd be a good fit for specific roles
• His educational background and certifications
• His strengths as a developer
• Languages he speaks
• His soft skills and work style
• General knowledge questions

Feel free to ask any specific questions about ${misheckProfile.name}'s background, capabilities, or any other topic!`;
  };

  const generateGeneralKnowledgeResponse = (message: string): string => {
    const query = message.toLowerCase();
    
    // Programming and technology
    if (query.includes('react') || query.includes('javascript') || query.includes('typescript')) {
      return `**React/JavaScript/TypeScript Information:**

React is a JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer and can be used for developing both web and mobile applications.

**Key Features:**
• Component-based architecture
• Virtual DOM for efficient rendering
• JSX syntax for writing components
• Hooks for state management
• Large ecosystem and community

TypeScript is a superset of JavaScript that adds static typing, making it easier to catch errors during development and providing better tooling support.`;
    }
    
    if (query.includes('node.js') || query.includes('nodejs')) {
      return `**Node.js Information:**

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript on the server-side, enabling full-stack JavaScript development.

**Key Features:**
• Event-driven, non-blocking I/O
• NPM (Node Package Manager) ecosystem
• Cross-platform compatibility
• Fast execution
• Large community and package ecosystem

Node.js is commonly used for building APIs, web applications, real-time applications, and microservices.`;
    }
    
    if (query.includes('database') || query.includes('sql') || query.includes('mongodb')) {
      return `**Database Information:**

Databases are organized collections of structured information stored electronically in a computer system.

**Types of Databases:**
• **SQL Databases** (MySQL, PostgreSQL): Relational databases with structured data
• **NoSQL Databases** (MongoDB, Redis): Non-relational databases for flexible data storage
• **Graph Databases**: For complex relationships and connections
• **Time-series Databases**: For time-stamped data

**Common Use Cases:**
• Storing user data and preferences
• Managing application state
• Analytics and reporting
• Content management systems`;
    }
    
    if (query.includes('api') || query.includes('rest')) {
      return `**API (Application Programming Interface) Information:**

APIs are sets of rules and protocols that allow different software applications to communicate with each other.

**REST APIs:**
• Use HTTP methods (GET, POST, PUT, DELETE)
• Stateless communication
• JSON/XML data formats
• Resource-based URLs
• Standard status codes

**Common API Types:**
• **Public APIs**: Available to developers (Twitter, Google Maps)
• **Private APIs**: Internal company APIs
• **Partner APIs**: Shared between business partners
• **Composite APIs**: Combine multiple APIs`;
    }
    
    if (query.includes('git') || query.includes('version control')) {
      return `**Git and Version Control Information:**

Git is a distributed version control system that tracks changes in source code during software development.

**Key Concepts:**
• **Repository**: Storage location for project files
• **Commit**: Snapshot of changes at a specific point
• **Branch**: Independent line of development
• **Merge**: Combining changes from different branches
• **Pull Request**: Request to merge changes

**Benefits:**
• Track code changes over time
• Collaborate with team members
• Rollback to previous versions
• Branch for feature development
• Code review and quality control`;
    }
    
    if (query.includes('docker') || query.includes('container')) {
      return `**Docker and Containerization Information:**

Docker is a platform for developing, shipping, and running applications in containers.

**Key Concepts:**
• **Container**: Lightweight, standalone package with application code
• **Image**: Template for creating containers
• **Dockerfile**: Instructions for building images
• **Registry**: Repository for storing images (Docker Hub)

**Benefits:**
• Consistent environments across development and production
• Isolated application dependencies
• Easy deployment and scaling
• Resource efficiency
• Version control for environments`;
    }
    
    if (query.includes('cloud') || query.includes('aws') || query.includes('azure')) {
      return `**Cloud Computing Information:**

Cloud computing provides on-demand access to computing resources over the internet.

**Service Models:**
• **IaaS** (Infrastructure as a Service): Virtual machines, storage, networking
• **PaaS** (Platform as a Service): Development platforms and tools
• **SaaS** (Software as a Service): Ready-to-use applications

**Major Cloud Providers:**
• **AWS** (Amazon Web Services): Largest cloud provider
• **Azure** (Microsoft): Enterprise-focused solutions
• **Google Cloud**: AI/ML and data analytics strengths

**Benefits:**
• Scalability and flexibility
• Cost-effective resource usage
• Global accessibility
• Automatic updates and maintenance`;
    }
    
    // General knowledge
    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return `Hello! 👋 I'm here to help you with questions about ${misheckProfile.name} or any general topics. How can I assist you today?`;
    }
    
    if (query.includes('weather') || query.includes('temperature')) {
      return `I don't have access to real-time weather data, but I can help you with questions about ${misheckProfile.name}, programming, technology, or other general topics!`;
    }
    
    if (query.includes('time') || query.includes('date')) {
      return `The current time is ${new Date().toLocaleTimeString()} and today's date is ${new Date().toLocaleDateString()}. 

Is there anything specific about ${misheckProfile.name} or any other topic I can help you with?`;
    }
    
    // Default general response
    return `I'd be happy to help with that question! However, I'm primarily designed to provide information about ${misheckProfile.name} and general technology topics. 

For the most accurate and up-to-date information on other subjects, I'd recommend checking reliable sources or search engines. 

Is there anything about ${misheckProfile.name}'s skills, experience, or general technology topics I can help you with?`;
  };

  const analyzeRoleFit = (message: string): string => {
    const role = message.toLowerCase();
    
    if (role.includes('react') || role.includes('frontend')) {
      return `**Excellent fit for React/Frontend roles!** 

${misheckProfile.name} has strong React experience:
• Proficient in React, TypeScript, JavaScript
• Experience with modern React patterns and hooks
• Knowledge of Tailwind CSS, Next.js, Vue.js
• Understanding of responsive design and UI/UX principles

He's built multiple React applications and stays updated with the latest frontend technologies.`;
    }
    
    if (role.includes('full stack') || role.includes('fullstack')) {
      return `**Perfect fit for Full Stack roles!**

${misheckProfile.name} is a full-stack developer with:
• Frontend: React, TypeScript, modern CSS frameworks
• Backend: Node.js, Python, Express.js, Django
• Database: MongoDB, PostgreSQL, MySQL
• DevOps: Docker, AWS, Git, CI/CD

He can handle both frontend and backend development effectively.`;
    }
    
    if (role.includes('backend') || role.includes('api')) {
      return `**Great fit for Backend/API roles!**

${misheckProfile.name}'s backend expertise includes:
• Node.js and Express.js for API development
• Python with Django and FastAPI
• Database design and management
• REST APIs and GraphQL
• Server deployment and DevOps

He has experience building scalable backend systems.`;
    }
    
    if (role.includes('junior') || role.includes('entry')) {
      return `**Excellent fit for Junior/Entry-level roles!**

${misheckProfile.name} would be perfect because:
• Strong foundation in modern technologies
• Eager to learn and grow
• Experience with real projects
• Good communication skills
• Adaptable and quick learner

He's ready to contribute immediately while continuing to develop his skills.`;
    }
    
    return `**Good potential fit!** 

${misheckProfile.name} has a solid foundation in software development with:
• Modern web technologies
• Full-stack development experience
• Strong problem-solving skills
• Quick learning ability

His adaptability and passion for technology make him suitable for various development roles.`;
  };

  const typeMessage = (messageId: string, fullText: string) => {
    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    const typeNextChar = () => {
      if (currentIndex <= fullText.length) {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, displayText: fullText.slice(0, currentIndex), isTyping: currentIndex < fullText.length }
            : msg
        ));
        currentIndex++;
        setTimeout(typeNextChar, typingSpeed);
      }
    };

    typeNextChar();
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      displayText: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponseText = generateAIResponse(inputValue);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
        isTyping: true,
        displayText: ''
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      
      // Start typing animation
      setTimeout(() => {
        typeMessage(aiResponse.id, aiResponseText);
      }, 100);
    }, 1000);
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakResponse = (text: string) => {
    if (speechRef.current && 'speechSynthesis' in window) {
      speechRef.current.text = text.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove markdown
      setIsSpeaking(true);
      window.speechSynthesis.speak(speechRef.current);
      
      speechRef.current.onend = () => {
        setIsSpeaking(false);
      };
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          data-chat-trigger
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:scale-110 transition-all duration-300 animate-slow-pulse profile-pic-glow"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  // Fullscreen overlay and chat
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-2xl transition-all duration-300" style={{ zIndex: 49 }} />
      {/* Chat Card */}
      <div className="relative w-full h-full sm:max-w-2xl sm:h-[90vh] mx-auto flex flex-col justify-center items-center z-50">
        <Card className="w-full h-full flex flex-col shadow-2xl border-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl overflow-hidden animate-glow">
          {/* Tech Circuit Background */}
          <div className="tech-circuit">
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-cyan-500/60 animate-pulse"
                  style={{
                    height: '1px',
                    width: `${30 + Math.random() * 40}%`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: 0.6 + Math.random() * 0.4,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i + 100}
                  className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-ping"
                  style={{
                    height: '4px',
                    width: '4px',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>

          <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white rounded-t-lg relative overflow-hidden flex-shrink-0">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-2 right-2 w-8 h-8 border-2 border-white/30 rounded-full animate-spin"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-2 border-white/20 rounded-full animate-ping"></div>
            </div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative profile-pic-glow">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 p-0.5">
                    <img 
                      src="/misheck.png" 
                      alt="AI Assistant" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border border-white animate-pulse"></div>
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold gradient-text">Ask About {misheckProfile.name}</CardTitle>
                  <p className="text-xs text-blue-100">AI Assistant • Online</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleCollapse}
                  className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0 interactive-hover border border-white/20 hover:border-white/40"
                  title="Minimize chat"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-red-500/20 hover:text-red-300 rounded-full w-8 h-8 p-0 interactive-hover border border-white/20 hover:border-red-400/50 font-bold text-lg"
                  title="Close chat"
                >
                  ✕
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-full flex flex-col relative overflow-hidden">
            {/* Quick Questions */}
            <div className="p-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-slate-300 font-medium">Quick questions about {misheckProfile.name}:</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/20 rounded-full w-7 h-7 p-0 interactive-hover"
                  title="Close chat"
                >
                  ✕
                </Button>
              </div>
              <ScrollArea className="h-40">
                <div className="space-y-2 pr-2">
                  {sampleQuestions.slice(0, 6).map((question) => (
                    <div
                      key={question.id}
                      className="cursor-pointer p-3 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:bg-slate-600/40 hover:border-slate-500/50 transition-all duration-200 hover:scale-[1.01] interactive-hover group"
                      onClick={() => {
                        handleSampleQuestion(question.text);
                        handleSendMessage();
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-200">
                          {question.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-200 group-hover:text-white transition-colors duration-200 leading-tight">
                            {question.text}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {question.category}
                          </p>
                        </div>
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Send className="h-4 w-4 text-blue-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-slate-800/20 to-slate-900/20 chat-scrollbar overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
                  >
                    <div className="flex items-end gap-3 max-w-[85%]">
                      {message.sender === 'ai' && (
                        <div className="relative flex-shrink-0 profile-pic-glow">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 p-0.5">
                            <img 
                              src="/misheck.png" 
                              alt="AI Assistant" 
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-slate-800 animate-pulse"></div>
                        </div>
                      )}
                      <div
                        className={`rounded-xl p-4 message-bubble ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'bg-slate-700/80 text-slate-100 shadow-lg border border-slate-600/50'
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.displayText || message.text}
                          {message.isTyping && (
                            <span className="inline-block w-2 h-4 bg-blue-400 ml-1 typing-cursor"></span>
                          )}
                        </div>
                        {message.sender === 'ai' && (
                          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-600/30">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => speakResponse(message.text)}
                              disabled={isSpeaking}
                              className="text-slate-400 hover:text-blue-400 p-1 h-6 w-6 interactive-hover"
                            >
                              {isSpeaking ? (
                                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Volume2 className="h-4 w-4" />
                              )}
                            </Button>
                            <span className="text-xs text-slate-500">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        )}
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center flex-shrink-0 profile-pic-glow">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-slide-in">
                    <div className="flex items-end gap-3">
                      <div className="relative flex-shrink-0 profile-pic-glow">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 p-0.5">
                          <img 
                            src="/misheck.png" 
                            alt="AI Assistant" 
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-slate-800 animate-pulse"></div>
                      </div>
                      <div className="bg-slate-700/80 rounded-xl p-4 shadow-lg border border-slate-600/50">
                        <div className="flex items-center gap-2">
                          <div className="loading-dots">
                            <div className="bg-blue-400"></div>
                            <div className="bg-purple-400"></div>
                            <div className="bg-cyan-400"></div>
                          </div>
                          <span className="text-sm text-slate-400">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            {/* Input - Always Visible */}
            <div className="p-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm flex-shrink-0">
              <div className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Ask about ${misheckProfile.name}...`}
                    className="w-full bg-white/10 border-2 border-slate-600/50 text-white placeholder:text-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-lg px-4 py-3 text-sm transition-all duration-200 hover:border-slate-500/70"
                    disabled={isLoading}
                  />
                  {isListening && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 voice-indicator">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
                <Button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isLoading}
                  size="sm"
                  variant="ghost"
                  className={`rounded-lg w-10 h-10 p-0 interactive-hover border-2 ${
                    isListening 
                      ? 'bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/30 voice-indicator' 
                      : 'bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-slate-600/50 hover:text-blue-400 hover:border-blue-400/50'
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg w-10 h-10 p-0 shadow-lg interactive-hover border-2 border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {inputValue.trim() && (
                <div className="mt-2 text-xs text-slate-400">
                  Press Enter to send • {inputValue.length} characters
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIChat; 