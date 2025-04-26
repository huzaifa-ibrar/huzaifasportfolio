"use client";

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Animation for navbar visibility on scroll
  useEffect(() => {
    if (!navbarRef.current) return;

    // Set initial state
    gsap.set(navbarRef.current, { y: 0 });
    
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY > 300) { // Only hide when scrolled down a bit
          // Scrolling down - hide navbar
          gsap.to(navbarRef.current, {
            duration: 0.3,
            y: -100,
            ease: 'power2.out'
          });
        } else {
          // Scrolling up - show navbar
          gsap.to(navbarRef.current, {
            duration: 0.3,
            y: 0,
            ease: 'power2.out'
          });
        }
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      // When menu opens
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, height: 0, y: -20 },
        { opacity: 1, height: 'auto', y: 0, duration: 0.3, ease: 'power2.out' }
      );
    } else {
      // When menu closes (if it was previously open)
      const element = menuRef.current;
      if (element && element.style.opacity !== '' && parseFloat(element.style.opacity) > 0) {
        gsap.to(element, { opacity: 0, height: 0, duration: 0.3, ease: 'power2.in' });
      }
    }
  }, [isOpen]);

  return (
    <nav 
      ref={navbarRef}
      className="fixed top-0 left-0 w-full bg-white shadow-md z-40 transition-all duration-300"
    >
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-primary-500 glow-text">
            Huzaifa Ibrar
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="text-secondary-700 hover:text-primary-500 transition-colors hover:glow-text">Home</a>
            <a href="#about" className="text-secondary-700 hover:text-primary-500 transition-colors hover:glow-text">About</a>
            <a href="#experience" className="text-secondary-700 hover:text-primary-500 transition-colors hover:glow-text">Experience</a>
            <a href="#projects" className="text-secondary-700 hover:text-primary-500 transition-colors hover:glow-text">Projects</a>
            <a href="#contact" className="text-secondary-700 hover:text-primary-500 transition-colors hover:glow-text">Contact</a>
          </div>
          
          {/* Social Icons */}
          <div className="hidden md:flex space-x-4">
            <a 
              href="https://github.com/huzaifa-ibrar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary-700 hover:text-primary-500 transition-colors glow-effect"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a 
              href="https://linkedin.com/in/huzaifa-ibrar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary-700 hover:text-primary-500 transition-colors glow-effect"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-secondary-700 focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div 
          ref={menuRef}
          className={`md:hidden bg-white overflow-hidden transition-all duration-300 ${isOpen ? '' : 'h-0 opacity-0'}`}
          style={{ height: 0, opacity: 0 }}
        >
          <div className="py-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#home" 
                className="text-secondary-700 hover:text-primary-500 transition-colors px-2 hover:glow-text"
                onClick={toggleMenu}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="text-secondary-700 hover:text-primary-500 transition-colors px-2 hover:glow-text"
                onClick={toggleMenu}
              >
                About
              </a>
              <a 
                href="#experience" 
                className="text-secondary-700 hover:text-primary-500 transition-colors px-2 hover:glow-text"
                onClick={toggleMenu}
              >
                Experience
              </a>
              <a 
                href="#projects" 
                className="text-secondary-700 hover:text-primary-500 transition-colors px-2 hover:glow-text"
                onClick={toggleMenu}
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="text-secondary-700 hover:text-primary-500 transition-colors px-2 hover:glow-text"
                onClick={toggleMenu}
              >
                Contact
              </a>
              
              <div className="flex space-x-4 pt-2 px-2">
                <a 
                  href="https://github.com/huzaifa-ibrar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary-700 hover:text-primary-500 transition-colors glow-effect"
                  aria-label="GitHub"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a 
                  href="https://linkedin.com/in/huzaifa-ibrar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary-700 hover:text-primary-500 transition-colors glow-effect"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 