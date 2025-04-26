import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Huzaifa Ibrar</h3>
            <p className="text-slate-300">
              Full Stack Developer based in Toronto, specializing in building exceptional digital experiences.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home" 
                  className="text-slate-300 hover:text-sky-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-slate-300 hover:text-sky-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#experience" 
                  className="text-slate-300 hover:text-sky-400 transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className="text-slate-300 hover:text-sky-400 transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-slate-300 hover:text-sky-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://github.com/huzaifa-ibrar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-sky-400 transition-colors text-xl"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a 
                href="https://linkedin.com/in/huzaifa-ibrar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-sky-400 transition-colors text-xl"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
            
            <p className="text-slate-300">
              Email: <a 
                href="mailto:huzaifa.57@hotmail.com" 
                className="hover:text-sky-400 transition-colors"
              >
                huzaifa.57@hotmail.com
              </a>
            </p>
            <p className="text-slate-300">
              Phone: <a 
                href="tel:+16475724056" 
                className="hover:text-sky-400 transition-colors"
              >
                (+1) 647-572-4056
              </a>
            </p>
          </div>
        </div>
        
        <hr className="border-slate-600 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-300 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Huzaifa Ibrar. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition-colors focus:outline-none"
            aria-label="Scroll to top"
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 