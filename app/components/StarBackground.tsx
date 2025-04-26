'use client';

import { useEffect, useRef, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: number;
  animationDelay: number;
  animation: 'pulse' | 'twinkle';
}

const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const generateStars = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const numStars = Math.min(Math.floor(width * height / 10000), 100); // Responsive number of stars
      
      const newStars: Star[] = [];
      
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100, // percentage
          y: Math.random() * 100, // percentage
          size: Math.random() * 3 + 1, // 1-4px
          opacity: Math.random() * 0.5 + 0.2, // 0.2-0.7
          animationDuration: Math.random() * 8 + 3, // 3-11s
          animationDelay: Math.random() * 5, // 0-5s
          animation: Math.random() > 0.5 ? 'pulse' : 'twinkle',
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
    
    const handleResize = () => {
      generateStars();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full bg-white ${star.animation === 'pulse' ? 'animate-pulse' : 'animate-twinkle'}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground; 