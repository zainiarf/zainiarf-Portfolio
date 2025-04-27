import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCode, FaBalanceScale, FaPaintBrush, FaServer, FaDatabase, FaMobileAlt, FaLock, FaSearch, FaFileContract } from "react-icons/fa";
import { SiTypescript, SiReact, SiNodedotjs, SiThreedotjs, SiTailwindcss } from "react-icons/si";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// Categories for skill tabs
const categories = [
  { id: "technical", label: "Technical" },
  { id: "legal", label: "Legal" },
  { id: "languages", label: "Languages" },
];

const skillsData = {
  technical: [
    { name: "JavaScript", percentage: 90, icon: <SiNodedotjs className="text-xl text-yellow-400" /> },
    { name: "HTML & CSS", percentage: 85, icon: <FaCode className="text-xl text-blue-400" /> },
    { name: "React", percentage: 80, icon: <SiReact className="text-xl text-blue-500" /> },
    { name: "Node.js", percentage: 75, icon: <SiNodedotjs className="text-xl text-green-500" /> },
    { name: "Three.js", percentage: 70, icon: <SiThreedotjs className="text-xl text-white" /> },
    { name: "TypeScript", percentage: 80, icon: <SiTypescript className="text-xl text-blue-600" /> },
    { name: "TailwindCSS", percentage: 85, icon: <SiTailwindcss className="text-xl text-cyan-400" /> },
  ],
  legal: [
    { name: "Legal Research", percentage: 95, icon: <FaSearch className="text-xl text-purple-400" /> },
    { name: "Contract Law", percentage: 85, icon: <FaFileContract className="text-xl text-amber-400" /> },
    { name: "Intellectual Property", percentage: 80, icon: <FaLock className="text-xl text-red-400" /> },
    { name: "Problem Solving", percentage: 90, icon: <FaBalanceScale className="text-xl text-teal-400" /> },
    { name: "Project Management", percentage: 85, icon: <FaServer className="text-xl text-blue-400" /> },
  ],
  languages: [
    { name: "Bahasa Indonesia", percentage: 100, icon: <span className="text-xl font-bold">🇮🇩</span> },
    { name: "English", percentage: 85, icon: <span className="text-xl font-bold">🇬🇧</span> },
    { name: "Japanese", percentage: 45, icon: <span className="text-xl font-bold">🇯🇵</span> },
    { name: "Arabic", percentage: 25, icon: <span className="text-xl font-bold">🇦🇪</span> },
  ],
  expertise: [
    {
      icon: <FaCode className="text-4xl" />,
      title: "Web Development",
      description: "Creating responsive, interactive websites and web applications using modern frameworks and technologies.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <FaBalanceScale className="text-4xl" />,
      title: "Legal Technology",
      description: "Combining legal expertise with technology to create solutions for legal compliance and process automation.",
      color: "from-yellow-500 to-amber-400"
    },
    {
      icon: <FaPaintBrush className="text-4xl" />,
      title: "UI/UX Design",
      description: "Designing intuitive user interfaces with focus on accessibility and user experience principles.",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: <FaDatabase className="text-4xl" />,
      title: "Database Design",
      description: "Creating efficient database structures and optimizing queries for performance and scalability.",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: <FaMobileAlt className="text-4xl" />,
      title: "Mobile Development",
      description: "Building cross-platform mobile applications with responsive design and native-like performance.",
      color: "from-red-500 to-orange-400"
    },
    {
      icon: <FaServer className="text-4xl" />,
      title: "Backend Development",
      description: "Creating secure, scalable server-side applications with RESTful API architecture.",
      color: "from-indigo-500 to-blue-400"
    }
  ]
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("technical");
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const skillBarsRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(3);
  
  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Reset animations to trigger them again
    if (skillBarsRef.current) {
      const skillBars = skillBarsRef.current.querySelectorAll('.skill-fill');
      skillBars.forEach((bar) => {
        gsap.set(bar, { width: "0%" });
      });
    }
    
    // Trigger animations after a short delay to allow state to update
    setTimeout(() => {
      animateSkillBars();
    }, 100);
  };
  
  // Animate skill bars
  const animateSkillBars = () => {
    if (skillBarsRef.current) {
      const skillBars = skillBarsRef.current.querySelectorAll('.skill-fill');
      
      skillBars.forEach((bar) => {
        const width = bar.getAttribute('data-width') || "0";
        gsap.to(bar, {
          width: width,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.3
        });
      });
    }
  };
  
  // Show more expertise cards
  const handleShowMore = () => {
    setVisibleCards(prevCount => 
      prevCount + 3 > skillsData.expertise.length 
        ? skillsData.expertise.length 
        : prevCount + 3
    );
  };
  
  // Animate elements when in view
  useEffect(() => {
    if (inView) {
      animateSkillBars();
      
      // Animate expertise cards
      gsap.fromTo(
        ".expertise-card",
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.2,
          delay: 0.5,
          ease: "back.out(1.2)" 
        }
      );
    }
  }, [inView, activeCategory]);

  // Card flip animation variants
  const cardVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.5 }
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="relative min-h-screen flex items-center px-6 md:px-10 py-24">
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        <h2 className="section-heading text-2xl sm:text-3xl font-heading font-bold mb-16">
          <span className="text-gold font-mono text-xl mr-2 opacity-90">02.</span>
          Skills & Expertise
        </h2>
        
        {/* Category tabs */}
        <div className="flex flex-wrap space-x-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-5 py-2 rounded-full transition-all duration-300 font-heading font-medium text-sm md:text-base mb-2 ${
                activeCategory === category.id
                  ? "bg-gold text-navy shadow-lg"
                  : "bg-navy-light text-slate-light hover:bg-navy-dark hover:text-gold"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Skills section */}
        <div ref={skillBarsRef} className="rounded-xl bg-navy-light bg-opacity-50 backdrop-blur-sm p-6 md:p-8 border border-navy-light shadow-lg">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-xl font-heading font-semibold text-white mb-6 flex items-center">
                <span className="text-gold mr-2 text-2xl">{activeCategory === "technical" ? "💻" : activeCategory === "legal" ? "⚖️" : "🌐"}</span>
                {activeCategory === "technical" ? "Technical Skills" : activeCategory === "legal" ? "Legal & Soft Skills" : "Language Proficiency"}
              </h3>
              
              <div className="space-y-6">
                {skillsData[activeCategory as keyof typeof skillsData].map((skill: any, index) => (
                  <div 
                    key={index} 
                    className="mb-6 skill-item"
                    onMouseEnter={() => setHoveredSkill(index)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between mb-2 items-center">
                      <div className="flex items-center gap-2">
                        <div className={`transition-all duration-300 ${hoveredSkill === index ? 'scale-125' : ''}`}>
                          {skill.icon}
                        </div>
                        <span className="text-slate-light ml-2">{skill.name}</span>
                      </div>
                      <span className="text-gold font-mono">{skill.percentage}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className={`skill-fill ${hoveredSkill === index ? 'glow-effect' : ''}`}
                        data-width={`${skill.percentage}%`}
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="skill-visualization">
              <h3 className="text-xl font-heading font-semibold text-white mb-6">Skill Visualization</h3>
              
              <div className="hexagon-container h-[300px] relative flex items-center justify-center">
                {skillsData[activeCategory as keyof typeof skillsData].map((skill: any, index: number) => {
                  const angle = (index * (360 / skillsData[activeCategory as keyof typeof skillsData].length)) * (Math.PI / 180);
                  const radius = 120 * (skill.percentage / 100);
                  const x = 150 + radius * Math.cos(angle);
                  const y = 150 + radius * Math.sin(angle);
                  
                  return (
                    <div 
                      key={index}
                      className="hexagon absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                      style={{ 
                        left: `${x}px`, 
                        top: `${y}px`,
                        opacity: hoveredSkill === index ? 1 : 0.7,
                        transform: `translate(-50%, -50%) scale(${hoveredSkill === index ? 1.2 : 1})`,
                      }}
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-navy-dark rounded-lg shadow-glow">
                        <div className="text-xl">{skill.icon}</div>
                      </div>
                      <div className="skill-tooltip hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-navy-dark text-white text-xs p-1 px-2 rounded whitespace-nowrap">
                        {skill.name}
                      </div>
                    </div>
                  );
                })}
                <div className="w-20 h-20 rounded-full bg-gold bg-opacity-10 border border-gold flex items-center justify-center z-10">
                  <span className="text-gold font-mono text-lg">
                    {activeCategory === "technical" ? "Tech" : activeCategory === "legal" ? "Legal" : "Lang"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Expertise cards */}
        <h3 className="text-xl font-heading font-semibold text-white mt-20 mb-8">Areas of Expertise</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.expertise.slice(0, visibleCards).map((item, index) => (
            <motion.div 
              key={index}
              className="expertise-card perspective relative h-[280px] cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover="back"
              initial="front"
            >
              <motion.div 
                className={`expertise-card-front absolute w-full h-full p-6 rounded-lg shadow-lg bg-gradient-to-br ${item.color} backface-hidden`}
                variants={cardVariants}
              >
                <div className="text-white mb-6 mt-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-3 text-center">{item.title}</h3>
                <p className="text-navy-dark text-center font-medium">Click to learn more</p>
              </motion.div>
              
              <motion.div 
                className="expertise-card-back absolute w-full h-full p-6 rounded-lg shadow-lg bg-navy-dark border border-gold backface-hidden"
                variants={cardVariants}
                initial={{ rotateY: 180 }}
              >
                <h3 className="text-lg font-heading font-semibold text-gold mb-4">{item.title}</h3>
                <p className="text-slate-light">{item.description}</p>
                <div className="absolute bottom-4 right-4 text-gold">
                  <span className="text-xs">Click to flip back</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Show more button */}
        {visibleCards < skillsData.expertise.length && (
          <div className="mt-10 flex justify-center">
            <button 
              onClick={handleShowMore}
              className="bg-gold text-navy px-6 py-3 rounded-full font-heading font-medium transition-all duration-300 hover:bg-gold-light hover:shadow-lg"
            >
              Show More Expertise
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
