import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold text-sky-400 mb-2">Huzaifa Ibrar</div>
            <p className="text-slate-300 text-sm">Full Stack Developer</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex space-x-4 mb-4 md:mb-0 md:mr-8">
              <a
                href="#home"
                className="text-slate-300 hover:text-sky-400 transition-colors text-sm"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-slate-300 hover:text-sky-400 transition-colors text-sm"
              >
                About
              </a>
              <a
                href="#projects"
                className="text-slate-300 hover:text-sky-400 transition-colors text-sm"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-slate-300 hover:text-sky-400 transition-colors text-sm"
              >
                Contact
              </a>
            </div>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com/huzaifa-ibrar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-sky-400 transition-colors"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://linkedin.com/in/huzaifa-ibrar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-sky-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-6 pt-6 text-center text-slate-400 text-sm">
          <p>© {currentYear} Huzaifa Ibrar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 