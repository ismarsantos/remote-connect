
import { useEffect, useState } from 'react';

// Custom hook for revealing elements as they enter the viewport
export function useReveal(threshold = 0.1) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return { ref: setRef, isRevealed };
}

// Custom hook for staggered animations of multiple elements
export function useStaggeredReveal(itemCount: number, staggerDelay = 100, threshold = 0.1) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(itemCount).fill(false));

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          
          // Stagger the items visibility
          let newVisibleItems = [...visibleItems];
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const updated = [...prev];
                updated[i] = true;
                return updated;
              });
            }, i * staggerDelay);
          }
          
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, itemCount, staggerDelay, threshold, visibleItems]);

  return { containerRef: setRef, isRevealed, visibleItems };
}

// Delay execution helper
export function useDelayedFunction(callback: () => void, delay: number) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);
    
    return () => clearTimeout(timer);
  }, [callback, delay]);
}

// Typing animation effect
export function useTypewriter(text: string, speed = 100, startDelay = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (startDelay > 0) {
      timer = setTimeout(startTyping, startDelay);
    } else {
      startTyping();
    }
    
    function startTyping() {
      let i = 0;
      setIsTyping(true);
      
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, speed);
      
      return () => clearInterval(intervalId);
    }
    
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);
  
  return { displayedText, isTyping };
}

// Smooth counter animation
export function useSmoothCounter(endValue: number, duration = 2000, startDelay = 0) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (startDelay > 0) {
      timer = setTimeout(() => {
        animateCount();
      }, startDelay);
    } else {
      animateCount();
    }
    
    function animateCount() {
      const startTime = Date.now();
      const endTime = startTime + duration;
      
      const intervalId = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setCount(Math.floor(endValue * progress));
        
        if (progress === 1) {
          clearInterval(intervalId);
        }
      }, 16);
      
      return () => clearInterval(intervalId);
    }
    
    return () => clearTimeout(timer);
  }, [endValue, duration, startDelay]);
  
  return count;
}

// Parallax effect
export function useParallax(intensity = 0.1) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) * intensity;
      const y = (window.innerHeight / 2 - e.clientY) * intensity;
      
      setPosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity]);
  
  return position;
}
