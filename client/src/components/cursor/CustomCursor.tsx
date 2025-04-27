import { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;
    
    // Only apply custom cursor on desktop
    if (window.innerWidth <= 768) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;
      
      if (cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
      }
      
      // Add slight delay for cursor outline for smooth effect
      if (cursorOutline) {
        setTimeout(() => {
          cursorOutline.style.left = `${posX}px`;
          cursorOutline.style.top = `${posY}px`;
        }, 100);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        setIsVisible(false);
      }
    };
    
    const handleMouseOver = () => {
      setIsVisible(true);
    };
    
    // Add cursor interactions for interactive elements
    const addInteractivity = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHoveringLink(true);
        });
        
        el.addEventListener('mouseleave', () => {
          setIsHoveringLink(false);
        });
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseover', handleMouseOver);
    
    // Call after a small delay to ensure DOM is loaded
    setTimeout(addInteractivity, 500);
    
    // Refresh interactivity on DOM changes
    const refreshInteractivity = setInterval(addInteractivity, 2000);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseover', handleMouseOver);
      clearInterval(refreshInteractivity);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorDotRef} 
        className={`cursor-dot ${!isVisible ? 'cursor-hidden' : ''}`}
      ></div>
      <div 
        ref={cursorOutlineRef} 
        className={`cursor-outline ${!isVisible ? 'cursor-hidden' : ''}`}
        style={{
          width: isHoveringLink ? '50px' : '40px',
          height: isHoveringLink ? '50px' : '40px',
          borderColor: isHoveringLink ? '#FFD700' : '#64FFDA'
        }}
      ></div>
    </>
  );
};

export default CustomCursor;
