import { useState, useEffect, useRef } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px',
  root = null,
}: UseIntersectionObserverProps = {}) => {
  const [inView, setInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    // If the element ref isn't set yet or has already been triggered once, return early
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        const isIntersecting = entry.isIntersecting;
        setInView(isIntersecting);
        
        // If this is the first time the element is visible, mark it
        if (isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, root, hasTriggered]);

  return { ref, inView, hasTriggered };
};
