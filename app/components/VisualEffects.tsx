"use client";

import { useEffect, useState, useRef } from 'react';

const VisualEffects = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  
  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Add a small delay for smooth movement
        setTimeout(() => {
          if (cursorRef.current) {
            cursorRef.current.style.left = `${e.clientX}px`;
            cursorRef.current.style.top = `${e.clientY}px`;
          }
        }, 50);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate stars for background
  useEffect(() => {
    if (!starsContainerRef.current) return;
    
    const container = starsContainerRef.current;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Clear any existing stars
    container.innerHTML = '';
    
    // Number of stars based on screen size
    const starCount = Math.floor((screenWidth * screenHeight) / 10000);
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size (0.5px to 2px)
      const size = 0.5 + Math.random() * 1.5;
      
      // Random opacity
      const opacity = 0.2 + Math.random() * 0.8;
      
      // Random animation delay
      const animationDelay = Math.random() * 10;
      
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.opacity = opacity.toString();
      star.style.animationDelay = `${animationDelay}s`;
      
      container.appendChild(star);
    }
  }, []);

  return (
    <>
      {/* Star background */}
      <div 
        ref={starsContainerRef} 
        className="fixed inset-0 pointer-events-none z-0"
      />
      
      {/* Cursor glow effect */}
      <div 
        ref={cursorRef} 
        className="cursor-glow fixed pointer-events-none z-50"
      />
      
      {/* CSS for animations */}
      <style jsx global>{`
        /* Star styling */
        .star {
          position: absolute;
          background-color: #ffffff;
          border-radius: 50%;
          animation: twinkle 8s infinite ease-in-out;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        /* Cursor glow */
        .cursor-glow {
          width: 300px;
          height: 300px;
          margin-left: -150px;
          margin-top: -150px;
          background: radial-gradient(
            circle,
            rgba(14, 165, 233, 0.15) 0%,
            rgba(14, 165, 233, 0.05) 40%,
            transparent 70%
          );
          border-radius: 50%;
          transition: opacity 0.2s ease;
          opacity: 0.7;
          mix-blend-mode: screen;
        }
      `}</style>
    </>
  );
};

export default VisualEffects; 