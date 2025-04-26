"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Make sure the DOM elements are available
    if (!sectionRef.current || !headingRef.current || !subHeadingRef.current || 
        !ctaRef.current || !scrollDownRef.current || !socialRef.current) {
      return;
    }

    // Create a timeline for sequential animations
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    // Initial animations
    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.3 }
    )
    .fromTo(
      subHeadingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.7'
    )
    .fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.7'
    )
    .fromTo(
      socialRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(
      scrollDownRef.current,
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        onComplete: () => {
          // Add continuous bounce animation to scroll icon
          gsap.to(scrollDownRef.current, {
            y: '10px',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
          });
        }
      },
      '-=0.4'
    );

    // Cleanup function
    return () => {
      tl.kill();
      if (scrollDownRef.current) {
        gsap.killTweensOf(scrollDownRef.current);
      }
    };
  }, []);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary-50 to-secondary-100 relative overflow-hidden"
    >
      {/* Background design elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>
      
      <div className="container-custom z-10 text-center py-16">
        <h1 
          ref={headingRef}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-secondary-800 opacity-0"
        >
          Hi, I'm <span className="text-primary-500">Huzaifa Ibrar</span>
        </h1>
        
        <p 
          ref={subHeadingRef}
          className="text-xl md:text-2xl text-secondary-600 mb-10 max-w-3xl mx-auto opacity-0"
        >
          A Full Stack Developer passionate about crafting exceptional digital experiences.
        </p>
        
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 opacity-0"
        >
          <a 
            href="#projects"
            className="btn-primary"
          >
            View My Work
          </a>
          
          <a 
            href="#contact"
            className="btn-outline"
          >
            Contact Me
          </a>
        </div>
        
        <div 
          ref={socialRef}
          className="flex justify-center space-x-6 mb-10 opacity-0"
        >
          <a 
            href="https://github.com/huzaifa-ibrar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-secondary-700 hover:text-primary-500 transition-colors text-2xl"
            aria-label="GitHub Profile"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a 
            href="https://linkedin.com/in/huzaifa-ibrar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-secondary-700 hover:text-primary-500 transition-colors text-2xl"
            aria-label="LinkedIn Profile"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
      
      <div 
        ref={scrollDownRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-secondary-600 cursor-pointer opacity-0"
        onClick={scrollToNextSection}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 font-medium">Scroll Down</span>
          <div className="text-primary-500">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 