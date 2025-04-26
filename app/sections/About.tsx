import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faDatabase, faServer, faCloud } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Import ScrollTrigger dynamically to avoid SSR issues
    const registerScrollTrigger = async () => {
      try {
        const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
        gsap.registerPlugin(ScrollTrigger);

        // Heading animation with improved timing
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );

        // Text animation with staggered paragraphs
        const paragraphs = textRef.current?.querySelectorAll('p');
        if (paragraphs) {
          gsap.fromTo(
            paragraphs,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: textRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );
        }

        // Skills heading animation
        const skillsHeading = skillsRef.current?.querySelector('h3');
        if (skillsHeading) {
          gsap.fromTo(
            skillsHeading,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: skillsRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );
        }

        // Individual skill items animation with better staggering
        if (skillsRef.current) {
          skillItemsRef.current.forEach((item, index) => {
            gsap.fromTo(
              item,
              { y: 50, opacity: 0, scale: 0.95 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: skillsRef.current,
                  start: 'top 75%',
                  toggleActions: 'play none none none'
                }
              }
            );
          });
        }
      } catch (error) {
        console.error("Error initializing ScrollTrigger:", error);
      }
    };

    registerScrollTrigger();

    // Cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        const ScrollTrigger = (gsap as any).ScrollTrigger;
        if (ScrollTrigger) {
          ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill(false));
        }
      }
    };
  }, []);

  // Add skill item to refs
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !skillItemsRef.current.includes(el)) {
      skillItemsRef.current.push(el);
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-slate-50 relative"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sky-50 opacity-40 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-50 opacity-40 rounded-tr-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-800"
        >
          About <span className="text-sky-500">Me</span>
        </h2>
        
        <div 
          ref={textRef}
          className="max-w-3xl mx-auto text-lg text-slate-600 mb-20 leading-relaxed px-4"
        >
          <p className="mb-6">
            I'm a Full Stack Developer with a Bachelor of Science in Computer Programming and Analysis from Seneca College, Toronto.
            I specialize in building robust web applications and services with a focus on performance, scalability, and user experience.
          </p>
          <p className="mb-6">
            With experience across various industries including aviation, tech, and industrial sectors, I've developed a strong ability to 
            transform business requirements into efficient technical solutions.
          </p>
          <p>
            I'm passionate about continuous learning and staying up-to-date with the latest technologies and best practices in the field.
          </p>
        </div>

        <div ref={skillsRef} className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-14 text-slate-800">
            Technical <span className="text-sky-500">Skills</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            <div 
              ref={addToRefs}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100 hover:border-sky-100"
            >
              <div className="text-sky-500 text-5xl mb-6 flex justify-center">
                <FontAwesomeIcon icon={faCode} />
              </div>
              <h4 className="text-xl font-semibold mb-6 text-center text-slate-800">Languages</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  Java
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  Python
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  JavaScript/HTML/CSS
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  C
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  Bash
                </li>
              </ul>
            </div>

            <div 
              ref={addToRefs}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100 hover:border-sky-100"
            >
              <div className="text-sky-500 text-5xl mb-6 flex justify-center">
                <FontAwesomeIcon icon={faServer} />
              </div>
              <h4 className="text-xl font-semibold mb-6 text-center text-slate-800">Frameworks</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  Bootstrap
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  React
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  Express
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  Next.js
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  JavaFX
                </li>
              </ul>
            </div>

            <div 
              ref={addToRefs}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100 hover:border-sky-100"
            >
              <div className="text-sky-500 text-5xl mb-6 flex justify-center">
                <FontAwesomeIcon icon={faDatabase} />
              </div>
              <h4 className="text-xl font-semibold mb-6 text-center text-slate-800">Databases</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  MongoDB
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  OracleDB
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  MySQL
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  PostgreSQL
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  SQL
                </li>
              </ul>
            </div>

            <div 
              ref={addToRefs}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100 hover:border-sky-100"
            >
              <div className="text-sky-500 text-5xl mb-6 flex justify-center">
                <FontAwesomeIcon icon={faCloud} />
              </div>
              <h4 className="text-xl font-semibold mb-6 text-center text-slate-800">DevOps/Cloud</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  GitAction
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  AWS Services
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  Microsoft Azure
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  Kubernetes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                  Docker
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 