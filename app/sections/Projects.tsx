import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faJs, faJava, faNodeJs, faReact } from '@fortawesome/free-brands-svg-icons';
import { faCalendarAlt, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

// Project data
const projects = [
  {
    title: 'Car Loan System',
    description: 'Built a JavaFX application with MongoDB for secure user authentication and data storage. Developed features for loan exploration, inputting details, and tracking loan history. Designed a database schema to manage vehicles, user records, and financial data.',
    tech: ['JavaFX', 'Maven', 'MongoDB'],
    date: 'February 2025',
    techIcons: [faJava],
    github: 'https://github.com/huzaifa-ibrar/car-loan-system'
  },
  {
    title: 'Library Management System',
    description: 'Developed a full-stack web application using JavaScript, MongoDB, HTML/CSS, and additional frameworks. Implemented role-based authentication, providing administrators, staff, and regular users with tailored access and menus.',
    tech: ['JavaScript', 'MongoDB', 'HTML/CSS'],
    date: 'November 2024',
    techIcons: [faJs, faReact],
    github: 'https://github.com/huzaifa-ibrar/library-management-system'
  },
  {
    title: 'Kubernetes GitOps Pipeline with Argo',
    description: 'Built a GitOps-based CI/CD pipeline with Argo CD, Rollouts, and Workflows for automated Kubernetes deployments. Implemented Canary and Blue-Green deployments with auto rollbacks triggered by Git commits and Docker updates.',
    tech: ['JavaScript', 'MongoDB', 'Kubernetes'],
    date: 'November 2024',
    techIcons: [faNodeJs],
    github: 'https://github.com/huzaifa-ibrar/kubernetes-gitops-pipeline'
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Import ScrollTrigger dynamically to avoid SSR issues
    const registerScrollTrigger = async () => {
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

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

      // Project cards animation
      projectCardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2 + index * 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            }
          }
        );
      });
    };

    registerScrollTrigger();
  }, []);

  // Add project card to refs
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !projectCardsRef.current.includes(el)) {
      projectCardsRef.current.push(el);
    }
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-800"
        >
          My <span className="text-sky-500">Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              ref={addToRefs}
              className="bg-slate-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-2 bg-sky-500"></div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-slate-800">{project.title}</h3>
                  
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-sky-500 transition-colors"
                  >
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                  </a>
                </div>
                
                <div className="flex items-center mb-4 text-slate-600 text-sm">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  <span>{project.date}</span>
                </div>
                
                <p className="text-slate-600 mb-6">
                  {project.description}
                </p>
                
                <div className="flex justify-between items-end">
                  <div className="flex space-x-3">
                    {project.techIcons.map((icon, i) => (
                      <FontAwesomeIcon 
                        key={i}
                        icon={icon} 
                        className="text-sky-500" 
                        size="lg"
                      />
                    ))}
                  </div>
                  
                  <div className="flex space-x-2 text-sm">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-sky-100 text-sky-700 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/huzaifa-ibrar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-sky-500 text-white rounded-full font-medium hover:bg-sky-600 transition-colors duration-300"
          >
            <span className="mr-2">See More on GitHub</span>
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects; 