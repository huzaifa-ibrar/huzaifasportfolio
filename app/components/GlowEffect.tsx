'use client';

import React, { useRef, useState } from 'react';

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: string;
  glowOpacity?: string;
}

export default function GlowEffect({
  children,
  className = '',
  glowColor = 'rgba(56, 189, 248, 0.5)',
  glowSize = '60px',
  glowOpacity = '0.6',
}: GlowEffectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      
      {isHovered && (
        <div 
          className="pointer-events-none absolute -z-10 transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
          style={{
            left: position.x,
            top: position.y,
            width: glowSize,
            height: glowSize,
            background: glowColor,
            opacity: glowOpacity,
            filter: `blur(${parseInt(glowSize) / 2}px)`,
          }}
        />
      )}
    </div>
  );
} 