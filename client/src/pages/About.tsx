import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  
  // Set up GSAP animations when section comes into view
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
    }
  }, [inView]);

  return (
    <section id="about" className="relative min-h-screen flex items-center px-6 md:px-10 py-24">
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        <h2 className="section-heading text-2xl sm:text-3xl font-heading font-bold mb-16">
          <span className="text-gold font-mono text-xl mr-2 opacity-90">01.</span>
          About Me
        </h2>
        
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3 text-slate-light space-y-4 about-text">
            <p>
              Hello! I'm zainiarf, a Bachelor of Law graduate with a passion for technology and web development. My journey began during my law studies when I realized the growing intersection between legal frameworks and digital innovation, which led me to explore coding and web technologies.
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
          </div>
          
          <div className="md:col-span-2 profile-image">
            <div className="relative group">
              <div className="relative z-10 overflow-hidden rounded-md">
                <img 
                  src="https://images.unsplash.com/photo-1603575448878-868a20723f5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="zainiarf portrait" 
                  className="w-full rounded-md grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gold opacity-20 mix-blend-multiply hover:opacity-0 transition-opacity duration-500 rounded-md"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 border-2 border-gold w-full h-full rounded-md transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
