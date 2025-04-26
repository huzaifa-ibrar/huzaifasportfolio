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

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    tl.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    )
    .fromTo(
      subHeadingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.5'
    )
    .fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.5'
    )
    .fromTo(
      scrollDownRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        onComplete: () => {
          // Add pulsing animation to scroll icon
          gsap.to(scrollDownRef.current, {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
          });
        }
      },
      '-=0.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 text-center">
        <h1 
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-800"
        >
          Hi, I'm <span className="text-sky-500">Huzaifa Ibrar</span>
        </h1>
        
        <p 
          ref={subHeadingRef}
          className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto"
        >
          Full Stack Developer specializing in building exceptional digital experiences.
        </p>
        
        <div 
          ref={ctaRef}
          className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-16"
        >
          <a 
            href="#projects"
            className="px-8 py-3 bg-sky-500 text-white rounded-full font-medium hover:bg-sky-600 transition-colors duration-300"
          >
            View My Work
          </a>
          
          <a 
            href="#contact"
            className="px-8 py-3 border-2 border-sky-500 text-sky-500 rounded-full font-medium hover:bg-sky-50 transition-colors duration-300"
          >
            Contact Me
          </a>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8">
          <a 
            href="https://github.com/huzaifa-ibrar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-sky-500 transition-colors text-2xl"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a 
            href="https://linkedin.com/in/huzaifa-ibrar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-sky-500 transition-colors text-2xl"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
      
      <div 
        ref={scrollDownRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-600 cursor-pointer"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
      </div>
    </section>
  );
};

export default Hero; 