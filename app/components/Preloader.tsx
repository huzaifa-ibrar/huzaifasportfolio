"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Split text characters
  const nameText = "Huzaifa Ibrar";

  useEffect(() => {
    // Make sure refs are available
    if (!preloaderRef.current || !textRef.current || !iconRef.current) {
      return;
    }

    // Add loading class to body
    document.body.classList.add('loading');

    // Reset letter refs
    letterRefs.current = [];
    
    // Set initial states
    gsap.set(leftCurtainRef.current, {
      scaleX: 1,
      transformOrigin: "left center",
    });
    
    gsap.set(rightCurtainRef.current, {
      scaleX: 1,
      transformOrigin: "right center",
    });
    
    gsap.set(letterRefs.current, { 
      opacity: 0,
      y: 20,
      rotationX: -90,
    });

    const tl = gsap.timeline();

    // Icon animation
    tl.to(iconRef.current, {
      duration: 1.5,
      rotation: 360,
      ease: "power2.inOut",
      repeat: 1,
      yoyo: true,
    })
    
    // Staggered text animation
    .to(letterRefs.current, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      rotationX: 0,
      stagger: 0.07,
      ease: "back.out(1.7)",
    }, "-=2")
    
    // Small pulse effect on text
    .to(letterRefs.current, {
      duration: 0.5,
      scale: 1.1,
      stagger: 0.03,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 1,
    }, "-=0.5")
    
    // Color change of text
    .to(letterRefs.current, {
      duration: 1,
      color: "#a855f7", // Using primary-500 hex value
      stagger: 0.05,
      ease: "power1.inOut",
    }, "-=0.5")
    
    // Delay before exit animation
    .to({}, { duration: 0.5 })
    
    // Exit animation - curtain sweep
    .to([leftCurtainRef.current, rightCurtainRef.current], {
      duration: 1.2,
      scaleX: 0,
      ease: "power4.inOut",
    })
    
    // Fade out content
    .to([textRef.current, iconRef.current], {
      duration: 0.6,
      opacity: 0,
      scale: 0.8,
      ease: "power3.in",
    }, "-=0.9")
    
    // Clean up
    .set(preloaderRef.current, {
      display: 'none',
      onComplete: () => {
        document.body.classList.remove('loading');
      }
    });

    return () => {
      tl.kill();
      document.body.classList.remove('loading');
    };
  }, []);

  // Add letter to refs
  const addLetterRef = (el: HTMLSpanElement | null) => {
    if (el) {
      letterRefs.current.push(el);
    }
  };

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 flex flex-col items-center justify-center z-50 min-h-screen overflow-hidden bg-secondary-900"
    >
      {/* Left Curtain */}
      <div 
        ref={leftCurtainRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-primary-600 z-10"
      ></div>
      
      {/* Right Curtain */}
      <div 
        ref={rightCurtainRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-primary-600 z-10"
      ></div>
      
      {/* Content */}
      <div className="z-20 flex flex-col items-center">
        <div 
          ref={iconRef}
          className="text-white mb-8"
        >
          <FontAwesomeIcon icon={faCode} size="4x" className="drop-shadow-glow" />
        </div>
        <div 
          ref={textRef}
          className="text-white text-3xl font-bold flex"
        >
          {nameText.split('').map((char, index) => (
            <span
              key={index}
              ref={addLetterRef}
              className="inline-block transition-all duration-300"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader; 