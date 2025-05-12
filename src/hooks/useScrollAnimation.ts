
'use client';

import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export interface ScrollAnimationHook<T extends HTMLElement> {
  ref: RefObject<T>;
  className: string;
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(): ScrollAnimationHook<T> {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentElement = ref.current; // Capture current value for cleanup

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(entry.isIntersecting); // Set isVisible based on intersection
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return { ref, className: isVisible ? 'scroll-animate-visible' : 'scroll-animate' };
}
