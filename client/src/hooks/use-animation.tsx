import { useEffect } from 'react';
import { gsap } from 'gsap';
import { useIntersectionObserver } from './use-intersection-observer';

type AnimationTarget = string | Element | Element[];
type AnimationProps = {
  from?: gsap.TweenVars;
  to: gsap.TweenVars;
  duration?: number;
  delay?: number;
  stagger?: number | gsap.StaggerVars;
  ease?: string;
  once?: boolean;
};

export const useAnimation = (
  target: AnimationTarget,
  {
    from,
    to,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    ease = 'power2.out',
    once = true,
  }: AnimationProps
) => {
  const { ref, inView, hasTriggered } = useIntersectionObserver();

  useEffect(() => {
    if (!inView) return;
    if (once && hasTriggered) return;

    const ctx = gsap.context(() => {
      if (from) {
        gsap.fromTo(
          target,
          from,
          {
            ...to,
            duration,
            delay,
            stagger,
            ease,
          }
        );
      } else {
        gsap.to(target, {
          ...to,
          duration,
          delay,
          stagger,
          ease,
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [target, from, to, duration, delay, stagger, ease, inView, hasTriggered, once]);

  return { ref, inView };
};
