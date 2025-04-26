"use client";

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface Point {
  x: number;
  y: number;
  opacity: number;
  id: string; // Unique identifier for each point
}

const CursorTrail = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pointsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    // Add mousemove event listener
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Set moving state to true
      setIsMoving(true);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set a new timeout to detect when movement stops
      timeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);
      
      setPoints((prevPoints) => {
        // Add new point with unique id
        const newPoint = {
          x: clientX,
          y: clientY,
          opacity: 1,
          id: `point-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
        };
        
        // Add new point and limit to 15 max
        return [newPoint, ...prevPoints].slice(0, 15);
      });
    };

    // Add event listeners
    if (isActive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isActive]);

  // Animate points appearance using GSAP
  useEffect(() => {
    // Animate each point when added
    points.forEach((point, index) => {
      const el = pointsRef.current.get(point.id);
      if (el) {
        // Initial animation
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.5 },
          { 
            opacity: 1 - (index * 0.06), 
            scale: 1, 
            duration: 0.3,
            ease: "power2.out"
          }
        );
      }
    });
  }, [points.length]);

  // Handle movement state changes
  useEffect(() => {
    if (!isMoving && points.length > 0) {
      // Animate all points to fade out when movement stops
      points.forEach(point => {
        const el = pointsRef.current.get(point.id);
        if (el) {
          gsap.to(el, {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              // Remove point from state after animation completes
              setPoints(prevPoints => 
                prevPoints.filter(p => p.id !== point.id)
              );
            }
          });
        }
      });
    }
  }, [isMoving]);

  // Function to add point element to refs map
  const addPointRef = (el: HTMLDivElement | null, id: string) => {
    if (el) {
      pointsRef.current.set(id, el);
    }
  };

  // Don't render if no points yet or trail is inactive
  if (!isActive || points.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {points.map((point, index) => (
        <div
          key={point.id}
          ref={(el) => addPointRef(el, point.id)}
          className="absolute rounded-full"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${12 - index * 0.3}px`,
            height: `${12 - index * 0.3}px`,
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(45deg, #a855f7, #7e22ce)',
            boxShadow: '0 0 8px rgba(168, 85, 247, 0.6)',
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail; 