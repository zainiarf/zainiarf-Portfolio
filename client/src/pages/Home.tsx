import { useEffect } from "react";
import { Link } from "wouter";
import SocialLinks from "@/components/social/SocialLinks";
import { gsap } from "gsap";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Home = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  
  useEffect(() => {
    if (inView) {
      const tl = gsap.timeline();
      
      tl.fromTo(".hero-1", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, delay: 0.2 }
      )
      .fromTo(".hero-2", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5 }
      )
      .fromTo(".hero-3", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5 }
      )
      .fromTo(".hero-4", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [inView]);

  return (
    <section id="home" className="relative min-h-screen flex items-center px-6 md:px-10">
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        <div className="md:w-3/4">
          <p className="hero-1 text-gold font-mono mb-5 opacity-0">
            Hi, my name is
          </p>
          <h1 className="hero-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 opacity-0">
            <span className="block text-white">Muhammad Zaini Arifin, S.H.</span>
            <span className="block text-slate mt-2">I build things for the web.</span>
          </h1>
          <p className="hero-3 text-slate-light text-lg sm:text-xl max-w-xl mb-12 opacity-0">
            Bachelor of Law and Technology enthusiast specializing in creating digital experiences that combine legal expertise with cutting-edge technology solutions.
          </p>
          <div className="hero-4 opacity-0">
            <Link href="/projects" className="inline-block font-mono py-4 px-8 border-2 border-gold text-gold rounded hover:bg-gold hover:bg-opacity-10 transition-all duration-300">
              Check out my work!
            </Link>
          </div>
        </div>
      </div>
      
      {/* Social Media Links - Left Side */}
      <SocialLinks />
      
      {/* Email Link - Right Side */}
      <div className="fixed right-10 bottom-0 hidden xl:block z-10">
        <div className="flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-[90px] after:bg-slate">
          <a 
            href="mailto:hello@zainiarf.com" 
            className="font-mono text-slate hover:text-gold writing-vertical-rl transform hover:-translate-y-[5px] transition-all duration-300 opacity-0 animate-fade-in delay-5"
          >
            zainiarfm@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
