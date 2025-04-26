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
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          gsap.to(navbarRef.current, {
            duration: 0.3,
            y: -100,
            ease: 'power2.out'
          });
        } else {
          // Scrolling up
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
    if (menuRef.current) {
      if (isOpen) {
        gsap.fromTo(
          menuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  }, [isOpen]);

  return (
    <nav 
      ref={navbarRef}
      className="fixed top-0 left-0 w-full bg-white shadow-md z-40 transition-all duration-300"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-sky-500">
            Huzaifa Ibrar
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="text-slate-700 hover:text-sky-500 transition-colors">Home</a>
            <a href="#about" className="text-slate-700 hover:text-sky-500 transition-colors">About</a>
            <a href="#experience" className="text-slate-700 hover:text-sky-500 transition-colors">Experience</a>
            <a href="#projects" className="text-slate-700 hover:text-sky-500 transition-colors">Projects</a>
            <a href="#contact" className="text-slate-700 hover:text-sky-500 transition-colors">Contact</a>
          </div>
          
          {/* Social Icons */}
          <div className="hidden md:flex space-x-4">
            <a 
              href="https://github.com/huzaifa-ibrar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-sky-500 transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a 
              href="https://linkedin.com/in/huzaifa-ibrar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-sky-500 transition-colors"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-slate-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div 
            ref={menuRef}
            className="md:hidden bg-white py-4 opacity-0"
          >
            <div className="flex flex-col space-y-4">
              <a 
                href="#home" 
                className="text-slate-700 hover:text-sky-500 transition-colors"
                onClick={toggleMenu}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="text-slate-700 hover:text-sky-500 transition-colors"
                onClick={toggleMenu}
              >
                About
              </a>
              <a 
                href="#experience" 
                className="text-slate-700 hover:text-sky-500 transition-colors"
                onClick={toggleMenu}
              >
                Experience
              </a>
              <a 
                href="#projects" 
                className="text-slate-700 hover:text-sky-500 transition-colors"
                onClick={toggleMenu}
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="text-slate-700 hover:text-sky-500 transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </a>
              
              <div className="flex space-x-4 pt-2">
                <a 
                  href="https://github.com/huzaifa-ibrar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-700 hover:text-sky-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a 
                  href="https://linkedin.com/in/huzaifa-ibrar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-700 hover:text-sky-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 