import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaExternalLinkAlt, FaFolder } from "react-icons/fa";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = [
  {
    title: "Legal Tech Platform",
    description: "A comprehensive platform that helps law firms automate document generation, manage client relationships, and streamline legal workflows using AI and machine learning algorithms.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    tech: ["React", "Node.js", "MongoDB", "Express", "OpenAI"],
    github: "#",
    external: "#",
    reverse: false
  },
  {
    title: "Contract Generator App",
    description: "An application that allows users to create legally-binding contracts by selecting clauses from a comprehensive database, with intelligent suggestions based on jurisdiction and contract type.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    tech: ["Vue.js", "Firebase", "Tailwind CSS", "PDF.js"],
    github: "#",
    external: "#",
    reverse: true
  },
  {
    title: "Legal Knowledge Base",
    description: "An interactive knowledge portal that makes complex legal concepts accessible to non-lawyers, featuring interactive visualizations, simplified explanations, and a natural language search engine.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    tech: ["React", "GraphQL", "D3.js", "AWS"],
    github: "#",
    external: "#",
    reverse: false
  }
];

const otherProjects = [
  {
    title: "Privacy Policy Generator",
    description: "A tool that generates custom privacy policies based on business type, jurisdiction, and applicable regulations.",
    tech: ["JavaScript", "HTML/CSS", "Legal API"],
    github: "#",
    external: "#"
  },
  {
    title: "Legal Research Assistant",
    description: "An AI-powered tool that helps researchers find relevant legal cases, statutes and scholarly articles.",
    tech: ["Python", "Flask", "NLP", "React"],
    github: "#",
    external: "#"
  },
  {
    title: "Legal Chatbot",
    description: "A conversational AI that provides basic legal information and guidance to users in natural language.",
    tech: ["JavaScript", "Node.js", "ChatGPT API", "MongoDB"],
    github: "#",
    external: "#"
  },
  {
    title: "GDPR Compliance Checker",
    description: "A tool that scans websites and applications to identify potential GDPR compliance issues and provides recommendations.",
    tech: ["JavaScript", "Puppeteer", "Express", "SQL"],
    github: "#",
    external: "#"
  },
  {
    title: "E-Signature Platform",
    description: "A secure platform for creating legally-binding electronic signatures with blockchain verification for document integrity.",
    tech: ["React", "Ethereum", "Web3.js", "AWS"],
    github: "#",
    external: "#"
  },
  {
    title: "Legal Citation Generator",
    description: "A tool that automatically formats legal citations according to different citation styles and jurisdictional requirements.",
    tech: ["JavaScript", "Vue.js", "API", "RegEx"],
    github: "#",
    external: "#"
  }
];

const Projects = () => {
  const { ref: featuredRef, inView: featuredInView } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: otherRef, inView: otherInView } = useIntersectionObserver({ threshold: 0.1 });
  
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
  }, [otherInView]);

  return (
    <section id="projects" className="relative min-h-screen flex items-center px-6 md:px-10 py-24">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="section-heading text-2xl sm:text-3xl font-heading font-bold mb-16">
          <span className="text-gold font-mono text-xl mr-2 opacity-90">03.</span>
          Things I've Built
        </h2>
        
        {/* Featured Projects */}
        <div ref={featuredRef} className="space-y-28 mb-20">
          {featuredProjects.map((project, index) => (
            <div 
              key={index}
              className="featured-project relative grid md:grid-cols-12 items-center gap-4 md:gap-10 opacity-0"
            >
              <div className={`md:col-span-7 ${project.reverse ? "" : "md:order-last"} relative`}>
                <div className="relative overflow-hidden rounded-lg">
                  <a href={project.external} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="absolute inset-0 bg-gold bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
                      <span className="bg-navy-dark py-2 px-4 rounded-md text-white font-mono">View Project</span>
                    </div>
                    <img 
                      src={project.image}
                      alt={project.title} 
                      className="w-full rounded-lg transition-all duration-300 hover:scale-105"
                    />
                  </a>
                </div>
              </div>
              
              <div className={`md:col-span-5 ${project.reverse ? "" : "md:text-right"}`}>
                <p className="text-gold font-mono mb-2">Featured Project</p>
                <h3 className="text-xl font-heading font-bold text-white mb-4">{project.title}</h3>
                <div className="bg-navy-light p-6 rounded-lg shadow-lg mb-4">
                  <p className="text-slate-light">{project.description}</p>
                </div>
                <ul className={`flex flex-wrap gap-3 ${project.reverse ? "" : "md:justify-end"} text-slate text-sm`}>
                  {project.tech.map((tech, i) => (
                    <li key={i}>{tech}</li>
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
              </div>
            </div>
          ))}
        </div>
        
        {/* Other Projects */}
        <h3 className="text-xl font-heading font-semibold text-white mb-10">
          Other Noteworthy Projects
        </h3>
        
        <div ref={otherRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <div 
              key={index}
              className="bg-navy-light rounded-lg p-6 shadow-lg project-card opacity-0"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="text-gold text-3xl">
                  <FaFolder />
                </div>
                <div className="flex gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-gold transition-colors duration-300">
                    <FaGithub />
                  </a>
                  <a href={project.external} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-gold transition-colors duration-300">
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
              <h4 className="text-lg font-heading font-semibold text-white mb-2 hover:text-gold transition-colors duration-300">
                <a href={project.external} target="_blank" rel="noopener noreferrer">{project.title}</a>
              </h4>
              <p className="text-slate-light mb-4">{project.description}</p>
              <ul className="flex flex-wrap gap-2 text-xs text-slate mt-4">
                {project.tech.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-mono inline-block py-3 px-6 border border-gold text-gold rounded hover:bg-gold hover:bg-opacity-10 transition-all duration-300"
          >
            View More Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
