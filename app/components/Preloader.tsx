"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Make sure refs are available
    if (!preloaderRef.current || !textRef.current || !iconRef.current) {
      return;
    }

    // Add loading class to body
    document.body.classList.add('loading');

    // Set initial states
    gsap.set(textRef.current, { opacity: 0, y: 20 });

    const tl = gsap.timeline();

    // Initial animation for the preloader
    tl.to(iconRef.current, {
      duration: 1.5,
      rotation: 360,
      ease: "power2.inOut",
      repeat: 1,
    })
    .to(textRef.current, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power2.out",
    }, "-=1")
    .to([preloaderRef.current, textRef.current, iconRef.current], {
      duration: 0.8,
      opacity: 0,
      y: -50,
      stagger: 0.1,
      ease: "power2.inOut",
      delay: 0.5,
      onComplete: () => {
        // Remove the preloader from DOM
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        
        // Remove loading class from body
        document.body.classList.remove('loading');
      }
    });

    return () => {
      // Cleanup if component unmounts
      tl.kill();
      document.body.classList.remove('loading');
    };
  }, []);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 bg-secondary-50 flex flex-col items-center justify-center z-50 min-h-screen"
    >
      <div 
        ref={iconRef}
        className="text-primary-500 mb-4"
      >
        <FontAwesomeIcon icon={faCode} size="3x" />
      </div>
      <div 
        ref={textRef}
        className="text-secondary-800 text-xl font-semibold opacity-0"
        style={{ transform: 'translateY(5px)' }}
      >
        Huzaifa Ibrar
      </div>
    </div>
  );
};

export default Preloader; 