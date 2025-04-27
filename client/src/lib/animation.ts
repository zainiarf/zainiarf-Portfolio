import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animation when the page loads
export const initAnimation = () => {
  // Preload animations setup
  const tl = gsap.timeline();
  
  // Create text split animations
  const createTextSplitAnimation = (selector: string, staggerTime = 0.05) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      // Split text into chars
      const splitText = new SplitType(element as HTMLElement, { types: 'chars, words' });
      
      if (splitText.chars) {
        // Hide chars initially
        gsap.set(splitText.chars, { opacity: 0, y: 50 });
        
        // Animate when in view
        ScrollTrigger.create({
          trigger: element,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(splitText.chars, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: staggerTime,
              ease: 'power2.out'
            });
          }
        });
      }
    });
  };
  
  // Parallax effect for elements
  const createParallaxEffect = (selector: string, intensity = 0.2) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(element, {
            y: (progress - 0.5) * 100 * intensity,
            ease: 'none',
            overwrite: 'auto'
          });
        }
      });
    });
  };
  
  // Create staggered animations for multiple elements
  const createStaggeredAnimation = (
    selector: string, 
    fromVars: gsap.TweenVars, 
    toVars: gsap.TweenVars, 
    staggerTime = 0.1
  ) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      gsap.set(element, fromVars);
      
      ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(element, {
            ...toVars,
            duration: 0.8,
            stagger: staggerTime,
            ease: 'power2.out'
          });
        }
      });
    });
  };
  
  return {
    tl,
    createTextSplitAnimation,
    createParallaxEffect,
    createStaggeredAnimation
  };
};

// Scroll animation for elements
export const createScrollAnimation = (element: Element, animation: gsap.TweenVars, trigger?: Element) => {
  return ScrollTrigger.create({
    trigger: trigger || element,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.from(element, {
        ...animation,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  });
};

// Helper function to check if browser supports certain animations
export const hasReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
