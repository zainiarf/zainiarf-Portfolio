import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaFolder, 
  FaCode, 
  FaSearch, 
  FaLock, 
  FaRobot, 
  FaFileContract, 
  FaDatabase, 
  FaBalanceScale
} from "react-icons/fa";
import { SiReact, SiMongodb, SiExpress, SiNodedotjs, SiFirebase, SiTailwindcss, SiVuedotjs, SiGraphql, SiPython, SiFlask, SiEthereum } from "react-icons/si";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

// Filter categories for projects
const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Apps" },
  { id: "legal", label: "Legal Tech" },
  { id: "ai", label: "AI Tools" }
];

const featuredProjects = [
  {
    title: "Legal Tech Platform",
    description: "A comprehensive platform that helps law firms automate document generation, manage client relationships, and streamline legal workflows using AI and machine learning algorithms.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    tech: ["React", "Node.js", "MongoDB", "Express", "OpenAI"],
    techIcons: [
      <SiReact key="react" className="text-blue-400" />,
      <SiNodedotjs key="node" className="text-green-500" />,
      <SiMongodb key="mongo" className="text-green-400" />,
      <SiExpress key="express" className="text-white" />,
      <FaRobot key="openai" className="text-purple-400" />
    ],
    github: "#",
    external: "#",
    reverse: false,
    category: ["web", "legal", "ai"]
  },
  {
    title: "Contract Generator App",
    description: "An application that allows users to create legally-binding contracts by selecting clauses from a comprehensive database, with intelligent suggestions based on jurisdiction and contract type.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    tech: ["Vue.js", "Firebase", "Tailwind CSS", "PDF.js"],
    techIcons: [
      <SiVuedotjs key="vue" className="text-green-400" />,
      <SiFirebase key="firebase" className="text-yellow-500" />,
      <SiTailwindcss key="tailwind" className="text-blue-400" />,
      <FaFileContract key="pdf" className="text-red-400" />
    ],
    github: "#",
    external: "#",
    reverse: true,
    category: ["web", "legal"]
  },
  {
    title: "Legal Knowledge Base",
    description: "An interactive knowledge portal that makes complex legal concepts accessible to non-lawyers, featuring interactive visualizations, simplified explanations, and a natural language search engine.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    tech: ["React", "GraphQL", "D3.js", "AWS"],
    techIcons: [
      <SiReact key="react" className="text-blue-400" />,
      <SiGraphql key="graphql" className="text-pink-500" />,
      <FaDatabase key="d3" className="text-orange-400" />,
      <FaSearch key="aws" className="text-yellow-400" />
    ],
    github: "#",
    external: "#",
    reverse: false,
    category: ["web", "legal"]
  }
];

const otherProjects = [
  {
    title: "Privacy Policy Generator",
    description: "A tool that generates custom privacy policies based on business type, jurisdiction, and applicable regulations.",
    tech: ["JavaScript", "HTML/CSS", "Legal API"],
    icon: <FaLock className="text-red-400" />,
    github: "#",
    external: "#",
    category: ["web", "legal"]
  },
  {
    title: "Legal Research Assistant",
    description: "An AI-powered tool that helps researchers find relevant legal cases, statutes and scholarly articles.",
    tech: ["Python", "Flask", "NLP", "React"],
    icon: <FaSearch className="text-blue-400" />,
    github: "#",
    external: "#",
    category: ["ai", "legal"]
  },
  {
    title: "Legal Chatbot",
    description: "A conversational AI that provides basic legal information and guidance to users in natural language.",
    tech: ["JavaScript", "Node.js", "ChatGPT API", "MongoDB"],
    icon: <FaRobot className="text-green-400" />,
    github: "#",
    external: "#",
    category: ["ai", "legal"]
  },
  {
    title: "GDPR Compliance Checker",
    description: "A tool that scans websites and applications to identify potential GDPR compliance issues and provides recommendations.",
    tech: ["JavaScript", "Puppeteer", "Express", "SQL"],
    icon: <FaBalanceScale className="text-yellow-400" />,
    github: "#",
    external: "#",
    category: ["web", "legal"]
  },
  {
    title: "E-Signature Platform",
    description: "A secure platform for creating legally-binding electronic signatures with blockchain verification for document integrity.",
    tech: ["React", "Ethereum", "Web3.js", "AWS"],
    icon: <SiEthereum className="text-purple-400" />,
    github: "#",
    external: "#",
    category: ["web", "legal"]
  },
  {
    title: "Legal Citation Generator",
    description: "A tool that automatically formats legal citations according to different citation styles and jurisdictional requirements.",
    tech: ["JavaScript", "Vue.js", "API", "RegEx"],
    icon: <FaCode className="text-orange-400" />,
    github: "#",
    external: "#",
    category: ["web", "legal"]
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const { ref: featuredRef, inView: featuredInView } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: otherRef, inView: otherInView } = useIntersectionObserver({ threshold: 0.1 });
  const projectRefs = useRef<Array<HTMLDivElement | null>>([]);
  
  // Filter other projects based on selected category
  const filteredProjects = activeCategory === "all" 
    ? otherProjects 
    : otherProjects.filter(project => project.category.includes(activeCategory));
  
  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setVisibleProjects(3);
  };
  
  // Show more projects
  const handleShowMore = () => {
    setVisibleProjects(prev => 
      prev + 3 > filteredProjects.length 
        ? filteredProjects.length 
        : prev + 3
    );
  };
  
  // Project hover effects
  useEffect(() => {
    projectRefs.current.forEach((ref, index) => {
      if (ref && hoveredProject === index) {
        gsap.to(ref, {
          y: -10,
          scale: 1.03,
          boxShadow: "0 10px 30px -15px rgba(2,12,27,0.7)",
          duration: 0.3
        });
      } else if (ref) {
        gsap.to(ref, {
          y: 0,
          scale: 1,
          boxShadow: "0 4px 20px -10px rgba(2,12,27,0.3)",
          duration: 0.3
        });
      }
    });
  }, [hoveredProject]);
  
  // Animate featured projects
  useEffect(() => {
    if (featuredInView) {
      gsap.fromTo(
        ".featured-project",
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.3,
          ease: "power3.out" 
        }
      );
    }
  }, [featuredInView]);
  
  // Animate other projects
  useEffect(() => {
    if (otherInView) {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.15,
          ease: "power2.out" 
        }
      );
    }
  }, [otherInView, activeCategory]);

  return (
    <section id="projects" className="relative min-h-screen flex items-center px-6 md:px-10 py-24">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="section-heading text-2xl sm:text-3xl font-heading font-bold mb-16">
          <span className="text-gold font-mono text-xl mr-2 opacity-90">03.</span>
          Things I've Built
        </h2>
        
        {/* Featured Projects */}
        <div ref={featuredRef} className="space-y-16 md:space-y-28 mb-20">
          {featuredProjects.map((project, index) => (
            <div 
              key={index}
              className="featured-project relative grid md:grid-cols-12 items-center gap-4 md:gap-10 opacity-0"
            >
              {/* Responsive project layout */}
              <div className={`md:col-span-7 ${project.reverse ? "" : "md:order-last"} relative`}>
                <div className="relative overflow-hidden rounded-lg">
                  <div className="group cursor-pointer rounded-lg transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-tr from-navy-dark to-gold opacity-20 group-hover:opacity-0 z-10 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-navy-dark bg-opacity-80 transition-all duration-300 z-20">
                      <div className="text-center p-4">
                        <h4 className="text-xl font-heading font-bold text-gold mb-2">{project.title}</h4>
                        <p className="text-white text-sm mb-4 max-w-xs mx-auto">View this project to learn more about its features and architecture</p>
                        <div className="flex justify-center gap-6">
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white bg-navy-light p-2 rounded-full hover:text-gold transition-all duration-300 hover:scale-110">
                            <FaGithub className="text-xl" />
                          </a>
                          <a href={project.external} target="_blank" rel="noopener noreferrer" className="text-white bg-navy-light p-2 rounded-full hover:text-gold transition-all duration-300 hover:scale-110">
                            <FaExternalLinkAlt className="text-xl" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <img 
                      src={project.image}
                      alt={project.title} 
                      className="w-full rounded-lg transition-all duration-500 group-hover:scale-105 transform"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              
              <div className={`md:col-span-5 ${project.reverse ? "" : "md:text-right"}`}>
                <p className="text-gold font-mono mb-2">Featured Project</p>
                <h3 className="text-xl font-heading font-bold text-white mb-4">{project.title}</h3>
                <div className="bg-navy-light bg-opacity-90 backdrop-blur-sm p-6 rounded-lg shadow-lg mb-4 transform hover:translate-y-[-5px] transition-all duration-300">
                  <p className="text-slate-light">{project.description}</p>
                </div>
                <ul className={`flex flex-wrap gap-3 ${project.reverse ? "" : "md:justify-end"} text-slate text-sm mt-4`}>
                  {project.tech.map((tech, i) => (
                    <li key={i} className="flex items-center gap-1">
                      {project.techIcons[i]}
                      <span className="text-xs">{tech}</span>
                    </li>
                  ))}
                </ul>
                <div className={`flex gap-5 mt-4 ${project.reverse ? "" : "md:justify-end"}`}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors duration-300">
                    <FaGithub className="text-xl" />
                  </a>
                  <a href={project.external} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors duration-300">
                    <FaExternalLinkAlt className="text-lg" />
                  </a>
                </div>
                
                {/* Mobile view: Tech pill badges */}
                <div className="flex flex-wrap gap-2 mt-4 md:hidden">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-navy-dark text-xs text-slate-light"
                    >
                      {project.techIcons[i]}
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Other Projects with Filter Tabs */}
        <div className="mb-10">
          <h3 className="text-xl font-heading font-semibold text-white mb-6">
            Other Noteworthy Projects
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-10">
            {projectCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-1.5 rounded-full transition-all duration-300 text-sm mobile-touch-feedback ${
                  activeCategory === category.id
                    ? "bg-gold text-navy shadow-lg font-medium"
                    : "bg-navy-light text-slate-light hover:bg-navy-dark hover:text-gold"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div ref={otherRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <motion.div 
              key={index}
              ref={el => projectRefs.current[index] = el}
              className="bg-navy-light rounded-lg p-6 shadow-lg project-card opacity-0 h-full"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="text-3xl">
                  {project.icon || <FaFolder className="text-gold" />}
                </div>
                <div className="flex gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-gold transition-colors duration-300 hover:scale-110 transform">
                    <FaGithub />
                  </a>
                  <a href={project.external} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-gold transition-colors duration-300 hover:scale-110 transform">
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
              <h4 className="text-lg font-heading font-semibold text-white mb-2 hover:text-gold transition-colors duration-300">
                <a href={project.external} target="_blank" rel="noopener noreferrer">{project.title}</a>
              </h4>
              <p className="text-slate-light mb-4">{project.description}</p>
              
              {/* Tech tags with interactive hover */}
              <div className="mt-auto pt-4">
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <li 
                      key={i} 
                      className={`text-xs px-2 py-1 rounded-full bg-navy transition-all duration-300 ${
                        hoveredProject === index ? 'text-gold' : 'text-slate'
                      }`}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile-optimized show more button with animations */}
        {visibleProjects < filteredProjects.length && (
          <div className="text-center mt-10">
            <motion.button 
              onClick={handleShowMore}
              className="font-mono py-3 px-6 border-2 border-gold text-gold rounded-full hover:bg-gold hover:bg-opacity-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50 mobile-touch-feedback shadow-md"
              aria-label="Show more projects"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="flex items-center gap-2">
                <span>Show More Projects</span>
                <FaFolder className="text-gold text-sm" />
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
