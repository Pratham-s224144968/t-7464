
import { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number; // 0 to 1, percentage of element visible to trigger animation
  delay?: number; // ms to delay the animation
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  threshold = 0.1,
  delay = 0,
  className = ""
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add small delay if specified
          setTimeout(() => {
            currentRef.classList.add('visible');
          }, delay);
          // Once revealed, stop observing
          observer.unobserve(currentRef);
        }
      },
      { threshold }
    );
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, delay]);
  
  return (
    <div ref={ref} className={`reveal-text ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
