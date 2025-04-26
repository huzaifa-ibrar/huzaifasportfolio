import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const experienceItemsRef = useRef<HTMLDivElement[]>([]);

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

    // Timeline animation
    gsap.fromTo(
      timelineRef.current,
      { scaleY: 0, transformOrigin: 'top' },
      {
        scaleY: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      }
    );

    // Experience items animation
    experienceItemsRef.current.forEach((item, index) => {
      gsap.fromTo(
        item,
        { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5 + index * 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );
    });
  }, []);

  // Add experience item to refs
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !experienceItemsRef.current.includes(el)) {
      experienceItemsRef.current.push(el);
    }
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 bg-slate-50"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-800"
        >
          Work <span className="text-sky-500">Experience</span>
        </h2>
        
        <div className="relative">
          {/* Timeline */}
          <div 
            ref={timelineRef}
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-sky-500"
          ></div>
          
          {/* Experience Items */}
          <div className="space-y-16 relative">
            {/* Experience 1 */}
            <div 
              ref={addToRefs}
              className="relative"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-sky-500 text-white p-3 rounded-full shadow-md z-10">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-2 text-slate-800">Software Engineer</h3>
                <h4 className="text-lg text-sky-500 mb-4">Air Liquide - Intern</h4>
                
                <div className="flex flex-wrap justify-between mb-4 text-slate-600 text-sm">
                  <div className="flex items-center mb-2 mr-4">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    <span>October 2024 - February 2025</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                    <span>Montreal, Canada</span>
                  </div>
                </div>
                
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-500 rounded-full mr-2 mt-2"></span>
                    <span>Developed and maintained internal software applications, contributing to digital transformation initiatives that improved team workflow by reducing manual tasks by 15%.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-500 rounded-full mr-2 mt-2"></span>
                    <span>Designed and implemented RESTful APIs, reducing system integration time by 2-3 hours per deployment and improving data consistency across systems.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-500 rounded-full mr-2 mt-2"></span>
                    <span>Optimized database performance and wrote SQL queries for OracleDB, improving query execution time and ensuring data integrity for business operations.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Experience 2 */}
            <div 
              ref={addToRefs}
              className="relative"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-sky-500 text-white p-3 rounded-full shadow-md z-10">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-2 text-slate-800">DevOps Engineer</h3>
                <h4 className="text-lg text-sky-500 mb-4">Enmumba - Intern</h4>
                
                <div className="flex flex-wrap justify-between mb-4 text-slate-600 text-sm">
                  <div className="flex items-center mb-2 mr-4">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    <span>July 2024 - October 2024</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                    <span>Dubai, UAE</span>
                  </div>
                </div>
                
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-500 rounded-full mr-2 mt-2"></span>
                    <span>Automated application deployments with AWS CodePipeline, reducing manual effort by 40 hours per month and deployment time by 30%.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-500 rounded-full mr-2 mt-2"></span>
                    <span>Managed Amazon S3 for secure data storage, improving data retrieval speeds and reducing storage costs by $2,000 annually.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-500 rounded-full mr-2 mt-2"></span>
                    <span>Deployed and managed containerized applications using Docker, ensuring 100% environmental consistency across development and production.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-500 rounded-full mr-2 mt-2"></span>
                    <span>Streamlined CI/CD pipelines, cutting build times from 45 minutes to 25 minutes and dramatically increasing code integration frequency.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Experience 3 */}
            <div 
              ref={addToRefs}
              className="relative"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-sky-500 text-white p-3 rounded-full shadow-md z-10">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-2 text-slate-800">Software Developer</h3>
                <h4 className="text-lg text-sky-500 mb-4">Pakistan International Airlines - Intern</h4>
                
                <div className="flex flex-wrap justify-between mb-4 text-slate-600 text-sm">
                  <div className="flex items-center mb-2 mr-4">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    <span>April 2024 - July 2024</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                    <span>Islamabad, Pakistan</span>
                  </div>
                </div>
                
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-500 rounded-full mr-2 mt-2"></span>
                    <span>Improved the PIA website's UI/UX, leading to a 30% increase in mobile traffic and reducing bounce rates by 15%.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-500 rounded-full mr-2 mt-2"></span>
                    <span>Designed and implemented routing APIs, cutting front-end and back-end data exchange time by 25%.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-500 rounded-full mr-2 mt-2"></span>
                    <span>Developed a secure, user-friendly passenger ticketing system, processing 1,000+ bookings per week with a 15% reduction in booking errors.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 