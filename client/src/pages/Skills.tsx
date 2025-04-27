import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCode, FaBalanceScale, FaPaintBrush } from "react-icons/fa";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

const skillsData = {
  technical: [
    { name: "JavaScript", percentage: 90 },
    { name: "HTML & CSS", percentage: 85 },
    { name: "React", percentage: 80 },
    { name: "Node.js", percentage: 75 },
    { name: "Three.js", percentage: 70 }
  ],
  legal: [
    { name: "Legal Research", percentage: 95 },
    { name: "Contract Law", percentage: 85 },
    { name: "Intellectual Property", percentage: 80 },
    { name: "Problem Solving", percentage: 90 },
    { name: "Project Management", percentage: 85 }
  ],
  expertise: [
    {
      icon: <FaCode className="text-4xl" />,
      title: "Web Development",
      description: "Creating responsive, interactive websites and web applications using modern frameworks and technologies."
    },
    {
      icon: <FaBalanceScale className="text-4xl" />,
      title: "Legal Technology",
      description: "Combining legal expertise with technology to create solutions for legal compliance and process automation."
    },
    {
      icon: <FaPaintBrush className="text-4xl" />,
      title: "UI/UX Design",
      description: "Designing intuitive user interfaces with focus on accessibility and user experience principles."
    }
  ]
};

const Skills = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const skillBarsRef = useRef<HTMLDivElement>(null);
  
  // Animate skill bars when in view
  useEffect(() => {
    if (inView && skillBarsRef.current) {
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
  }, [inView]);

  return (
    <section id="skills" className="relative min-h-screen flex items-center px-6 md:px-10 py-24">
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        <h2 className="section-heading text-2xl sm:text-3xl font-heading font-bold mb-16">
          <span className="text-gold font-mono text-xl mr-2 opacity-90">02.</span>
          Skills & Expertise
        </h2>
        
        <div ref={skillBarsRef} className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h3 className="text-xl font-heading font-semibold text-white mb-6">Technical Skills</h3>
            
            <div>
              {skillsData.technical.map((skill, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-light">{skill.name}</span>
                    <span className="text-gold font-mono">{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-fill" 
                      data-width={`${skill.percentage}%`}
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-xl font-heading font-semibold text-white mb-6">Legal & Soft Skills</h3>
            
            <div>
              {skillsData.legal.map((skill, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-light">{skill.name}</span>
                    <span className="text-gold font-mono">{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-fill" 
                      data-width={`${skill.percentage}%`}
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {skillsData.expertise.map((item, index) => (
            <div 
              key={index} 
              className="expertise-card bg-navy-light p-6 rounded-lg shadow-lg"
            >
              <div className="text-gold mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-heading font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-slate-light">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
