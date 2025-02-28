
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export function AnimatedLogo({ className, size = 'md', animated = true }: AnimatedLogoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };

  return (
    <div 
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-xl',
        sizeClasses[size],
        isLoaded && 'animate-fade-in',
        className
      )}
    >
      {/* Circle background */}
      <div className={cn(
        'absolute inset-0 rounded-full bg-gradient-to-tr from-gray-50 to-gray-200 shadow-lg',
        animated && 'animate-pulse-slow'
      )} />
      
      {/* Circle border */}
      <div className={cn(
        'absolute inset-0 rounded-full border border-white/50',
        animated && isLoaded && 'animate-pulse-slow'
      )} />
      
      {/* Connection lines */}
      <svg 
        className={cn(
          'absolute inset-0 h-full w-full stroke-gray-900/70',
          animated && isLoaded && 'animate-pulse-slow transition-opacity duration-1000'
        )} 
        viewBox="0 0 100 100"
      >
        <line 
          x1="30" 
          y1="30" 
          x2="70" 
          y2="70" 
          strokeWidth="2" 
          strokeLinecap="round" 
          className={cn(animated && isLoaded && 'animate-[dash_2s_ease-in-out_infinite]')}
        />
        <line 
          x1="30" 
          y1="70" 
          x2="70" 
          y2="30" 
          strokeWidth="2" 
          strokeLinecap="round"
          className={cn(animated && isLoaded && 'animate-[dash_2s_ease-in-out_infinite_0.5s]')}
        />
        
        <defs>
          <style>
            {`
              @keyframes dash {
                0% {
                  stroke-dasharray: 0, 100;
                  stroke-dashoffset: 0;
                }
                50% {
                  stroke-dasharray: 100, 0;
                  stroke-dashoffset: 0;
                }
                100% {
                  stroke-dasharray: 0, 100;
                  stroke-dashoffset: -100;
                }
              }
            `}
          </style>
        </defs>
      </svg>
      
      {/* Inner circle dot */}
      <div 
        className={cn(
          'absolute h-2 w-2 rounded-full bg-gray-900 shadow-md',
          animated && isLoaded && 'animate-float'
        )} 
      />
    </div>
  );
}
