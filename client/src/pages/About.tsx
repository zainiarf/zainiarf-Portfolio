import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { motion } from "framer-motion";
import { FaLaptopCode, FaGavel, FaGraduationCap, FaAward } from "react-icons/fa";
import { SiTypescript, SiReact, SiNodedotjs, SiThreedotjs, SiTailwindcss, SiJavascript, SiHtml5, SiCss3 } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

// Timeline items for the journey section
const timelineItems = [
  {
    year: "2018",
    title: "Started Law School",
    description: "Began my journey in legal studies, focusing on technology law and digital rights.",
    icon: <FaGraduationCap className="text-gold text-xl" />,
  },
  {
    year: "2019",
    title: "First Coding Project",
    description: "Built my first web application while participating in a legal tech hackathon.",
    icon: <FaLaptopCode className="text-gold text-xl" />,
  },
  {
    year: "2021",
    title: "Bachelor's Degree in Law",
    description: "Graduated with honors, with a thesis on legal implications of blockchain technology.",
    icon: <FaGavel className="text-gold text-xl" />,
  },
  {
    year: "2022",
    title: "Legal Tech Developer",
    description: "Started combining legal expertise with programming skills professionally.",
    icon: <FaAward className="text-gold text-xl" />,
  }
];

const tabItems = [
  { id: "background", label: "Background" },
  { id: "journey", label: "My Journey" },
  { id: "expertise", label: "Expertise" },
];

const About = () => {
  const [activeTab, setActiveTab] = useState("background");
  const [animatedImage, setAnimatedImage] = useState(false);
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // Animate elements when they come into view
  useEffect(() => {
    if (inView) {
      // Staggered animation for text paragraphs
      gsap.fromTo(
        ".about-text p",
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.2,
          ease: "power2.out" 
        }
      );
      
      // Animation for tech list
      gsap.fromTo(
        ".tech-list li",
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.4, 
          stagger: 0.1,
          delay: 0.6,
          ease: "power2.out" 
        }
      );
      
      // Animation for profile image
      gsap.fromTo(
        ".profile-image",
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8,
          delay: 0.3,
          ease: "back.out(1.7)" 
        }
      );
      
      // Timeline animation
      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.2,
          ease: "power2.out" 
        }
      );
    }
  }, [inView, activeTab]);

  // Interactive image effect
  useEffect(() => {
    if (!imageContainerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageContainerRef.current) return;
      
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      gsap.to(imageContainerRef.current, {
        rotationY: x * 10,
        rotationX: -y * 10,
        transformPerspective: 500,
        duration: 0.5,
        ease: "power2.out"
      });
      
      gsap.to(".image-overlay", {
        opacity: 0.5 + Math.abs(x) * 0.5,
        background: `radial-gradient(circle at ${x * 100 + 50}% ${y * 100 + 50}%, rgba(255, 215, 0, 0.4), rgba(0, 0, 0, 0.2))`,
        duration: 0.5
      });
    };
    
    const handleMouseLeave = () => {
      if (!imageContainerRef.current) return;
      
      gsap.to(imageContainerRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out"
      });
      
      gsap.to(".image-overlay", {
        opacity: 0.2,
        background: "rgba(255, 215, 0, 0.1)",
        duration: 0.5
      });
    };
    
    imageContainerRef.current.addEventListener("mousemove", handleMouseMove);
    imageContainerRef.current.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      if (imageContainerRef.current) {
        imageContainerRef.current.removeEventListener("mousemove", handleMouseMove);
        imageContainerRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section id="about" className="relative min-h-screen flex items-center px-6 md:px-10 py-24">
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        <h2 className="section-heading text-2xl sm:text-3xl font-heading font-bold mb-16">
          <span className="text-gold font-mono text-xl mr-2 opacity-90">01.</span>
          About Me
        </h2>
        
        {/* Interactive tabs with mobile touch feedback */}
        <div className="flex flex-wrap space-x-2 mb-10">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full transition-all duration-300 font-heading font-medium text-sm md:text-base mb-2 mobile-touch-feedback ${
                activeTab === tab.id
                  ? "bg-gold text-navy shadow-lg"
                  : "bg-navy-light text-slate-light hover:bg-navy-dark hover:text-gold"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Profile image - now with interactive effects */}
          <div className="md:col-span-2 profile-image order-2 md:order-1">
            <div ref={imageContainerRef} className="relative group perspective">
              <div className="relative z-10 overflow-hidden rounded-md transform-preserve-3d transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1603575448878-868a20723f5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="zainiarf portrait" 
                  className="w-full rounded-md grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-105"
                  onMouseEnter={() => setAnimatedImage(true)}
                  onMouseLeave={() => setAnimatedImage(false)}
                />
                <div className="image-overlay absolute inset-0 bg-gradient-to-tr from-gold bg-opacity-10 mix-blend-overlay transition-all duration-500 rounded-md"></div>
                
                {/* Floating tech icons */}
                <motion.div 
                  className="absolute -right-8 -top-8 text-2xl text-gold"
                  animate={{
                    y: animatedImage ? [0, -10, 0] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: animatedImage ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                >
                  <SiReact />
                </motion.div>
                
                <motion.div 
                  className="absolute -left-8 top-1/4 text-2xl text-gold"
                  animate={{
                    y: animatedImage ? [0, 10, 0] : 0,
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: animatedImage ? Infinity : 0,
                    repeatType: "reverse",
                    delay: 0.5
                  }}
                >
                  <SiJavascript />
                </motion.div>
                
                <motion.div 
                  className="absolute -right-6 bottom-1/4 text-2xl text-gold"
                  animate={{
                    y: animatedImage ? [0, -15, 0] : 0,
                  }}
                  transition={{
                    duration: 3,
                    repeat: animatedImage ? Infinity : 0,
                    repeatType: "reverse",
                    delay: 1
                  }}
                >
                  <SiNodedotjs />
                </motion.div>
                
                <motion.div 
                  className="absolute -left-6 -bottom-6 text-2xl text-gold"
                  animate={{
                    y: animatedImage ? [0, 10, 0] : 0,
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: animatedImage ? Infinity : 0,
                    repeatType: "reverse",
                    delay: 0.7
                  }}
                >
                  <FaGavel />
                </motion.div>
              </div>
              <div className="absolute -bottom-4 -right-4 border-2 border-gold w-full h-full rounded-md transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2"></div>
            </div>
            
            {/* Mobile-friendly skills chips with touch feedback */}
            <div className="mt-8 flex flex-wrap gap-2 md:hidden">
              {[
                { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
                { name: "React", icon: <SiReact className="text-blue-400" /> },
                { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
                { name: "Three.js", icon: <SiThreedotjs className="text-white" /> },
                { name: "HTML", icon: <SiHtml5 className="text-orange-500" /> },
                { name: "CSS", icon: <SiCss3 className="text-blue-500" /> }
              ].map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="bg-navy-light rounded-full px-3 py-2 flex items-center gap-1.5 mobile-touch-feedback"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill.icon}
                  <span className="text-xs text-slate-light">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Dynamic content based on active tab */}
          <div className="md:col-span-3 text-slate-light space-y-4 about-text order-1 md:order-2">
            {activeTab === "background" && (
              <>
                <p>
                  Hello! I'm <span className="text-gold">zainiarf</span>, a Bachelor of Law graduate with a passion for technology and web development. My journey began during my law studies when I realized the growing intersection between legal frameworks and digital innovation, which led me to explore coding and web technologies.
                </p>
                <p>
                  I enjoy bridging the gap between legal knowledge and technological solutions, creating applications that address compliance issues, automate legal processes, and make legal information more accessible to everyone.
                </p>
                <p>
                  My approach combines analytical thinking from my legal background with creative problem-solving from tech development. This unique perspective allows me to build products that are not only technically sound but also legally compliant and user-focused.
                </p>
                
                <p>
                  Here are a few technologies I've been working with recently:
                </p>
                
                <ul className="grid grid-cols-2 gap-2 tech-list">
                  <li className="flex items-center">
                    <span className="text-gold mr-2">▹</span> JavaScript (ES6+)
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold mr-2">▹</span> React
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold mr-2">▹</span> Node.js
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold mr-2">▹</span> Three.js
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold mr-2">▹</span> HTML & CSS
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold mr-2">▹</span> UI/UX Design
                  </li>
                </ul>
              </>
            )}
            
            {activeTab === "journey" && (
              <div className="space-y-8">
                <p>
                  My journey from legal studies to technology has been an exciting path of discovery and growth. Here are some key milestones:
                </p>
                
                <div className="relative border-l-2 border-gold pl-8 pb-4">
                  {timelineItems.map((item, index) => (
                    <div key={index} className="timeline-item mb-8 relative">
                      <div className="absolute -left-10 mt-1 bg-navy-dark p-1 rounded-full border-2 border-gold">
                        {item.icon}
                      </div>
                      <p className="font-mono text-gold mb-1">{item.year}</p>
                      <h3 className="text-lg font-heading font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-light">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "expertise" && (
              <div className="space-y-6">
                <p>
                  My unique background allows me to excel in areas where legal knowledge and technical skills intersect:
                </p>
                
                <div className="grid gap-6">
                  <div className="bg-navy-light bg-opacity-50 p-5 rounded-lg backdrop-blur-sm">
                    <h3 className="text-lg font-heading font-semibold text-white mb-2 flex items-center">
                      <FaLaptopCode className="text-gold mr-2" /> Technical Development
                    </h3>
                    <p>
                      Creating web applications using modern JavaScript frameworks with a focus on performance, accessibility, and user experience. My projects typically involve complex data visualization, interactive UI, and responsive design principles.
                    </p>
                  </div>
                  
                  <div className="bg-navy-light bg-opacity-50 p-5 rounded-lg backdrop-blur-sm">
                    <h3 className="text-lg font-heading font-semibold text-white mb-2 flex items-center">
                      <FaGavel className="text-gold mr-2" /> Legal Technology
                    </h3>
                    <p>
                      Developing solutions that address legal compliance, automation of legal processes, and access to justice. This includes software for contract management, regulatory compliance tracking, and legal research tools.
                    </p>
                  </div>
                  
                  <div className="bg-navy-light bg-opacity-50 p-5 rounded-lg backdrop-blur-sm">
                    <h3 className="text-lg font-heading font-semibold text-white mb-2 flex items-center">
                      <FaGraduationCap className="text-gold mr-2" /> Education & Research
                    </h3>
                    <p>
                      Conducting research on the intersection of law and technology, particularly regarding data privacy, intellectual property in digital environments, and legal implications of emerging technologies like blockchain and AI.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
