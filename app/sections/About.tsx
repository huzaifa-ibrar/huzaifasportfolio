import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faDatabase, faServer, faCloud } from '@fortawesome/free-solid-svg-icons';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Text animation
    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Skills section animation
    gsap.fromTo(
      skillsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      }
    );

    // Individual skill items animation
    skillItemsRef.current.forEach((item, index) => {
      gsap.fromTo(
        item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.8 + index * 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );
    });
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
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800"
        >
          About <span className="text-sky-500">Me</span>
        </h2>
        
        <div 
          ref={textRef}
          className="max-w-3xl mx-auto text-lg text-slate-600 mb-16 leading-relaxed"
        >
          <p className="mb-4">
            I'm a Full Stack Developer with a Bachelor of Science in Computer Programming and Analysis from Seneca College, Toronto.
            I specialize in building robust web applications and services with a focus on performance, scalability, and user experience.
          </p>
          <p className="mb-4">
            With experience across various industries including aviation, tech, and industrial sectors, I've developed a strong ability to 
            transform business requirements into efficient technical solutions.
          </p>
          <p>
            I'm passionate about continuous learning and staying up-to-date with the latest technologies and best practices in the field.
          </p>
        </div>

        <div ref={skillsRef}>
          <h3 className="text-2xl font-semibold text-center mb-10 text-slate-800">
            Technical <span className="text-sky-500">Skills</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              ref={addToRefs}
              className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-sky-500 text-4xl mb-4 flex justify-center">
                <FontAwesomeIcon icon={faCode} />
              </div>
              <h4 className="text-xl font-semibold mb-4 text-center text-slate-800">Languages</h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  Java
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  Python
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  JavaScript/HTML/CSS
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  C
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  Bash
                </li>
              </ul>
            </div>

            <div 
              ref={addToRefs}
              className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-sky-500 text-4xl mb-4 flex justify-center">
                <FontAwesomeIcon icon={faServer} />
              </div>
              <h4 className="text-xl font-semibold mb-4 text-center text-slate-800">Frameworks</h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  Bootstrap
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  React
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  Express
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  Next.js
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  JavaFX
                </li>
              </ul>
            </div>

            <div 
              ref={addToRefs}
              className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-sky-500 text-4xl mb-4 flex justify-center">
                <FontAwesomeIcon icon={faDatabase} />
              </div>
              <h4 className="text-xl font-semibold mb-4 text-center text-slate-800">Databases</h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  MongoDB
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  OracleDB
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  MySQL
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  PostgreSQL
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  SQL
                </li>
              </ul>
            </div>

            <div 
              ref={addToRefs}
              className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-sky-500 text-4xl mb-4 flex justify-center">
                <FontAwesomeIcon icon={faCloud} />
              </div>
              <h4 className="text-xl font-semibold mb-4 text-center text-slate-800">DevOps/Cloud</h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  GitAction
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  AWS Services
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  Microsoft Azure
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                  Kubernetes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
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