import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );

      // Contact info animation
      gsap.fromTo(
        contactInfoRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );
    };
    
    registerScrollTrigger();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Make an API call to our endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      console.log('Success response:', data);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
      
      // Reset status after 6 seconds to give more time to read the error
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-slate-50"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-800"
        >
          Get In <span className="text-sky-500">Touch</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <div className="mb-6">
              <label htmlFor="name" className="block text-slate-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-slate-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-slate-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 ${
                isSubmitting ? 'bg-slate-400' : 'bg-sky-500 hover:bg-sky-600'
              } text-white rounded-md font-medium transition-colors flex items-center justify-center`}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span className="mr-2">Send Message</span>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </>
              )}
            </button>
            
            {submitStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                Your message has been sent successfully!
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errorMessage || 'There was an error sending your message. Please try again.'}
              </div>
            )}
          </form>
          
          <div 
            ref={contactInfoRef}
            className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-slate-800">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-sky-500 mt-1 mr-4">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-slate-700">Email</h4>
                    <a 
                      href="mailto:huzaifa.57@hotmail.com" 
                      className="text-slate-600 hover:text-sky-500 transition-colors"
                    >
                      huzaifa.57@hotmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-sky-500 mt-1 mr-4">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-slate-700">Phone</h4>
                    <a 
                      href="tel:+16475724056" 
                      className="text-slate-600 hover:text-sky-500 transition-colors"
                    >
                      (+1) 647-572-4056
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-sky-500 mt-1 mr-4">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-slate-700">Location</h4>
                    <p className="text-slate-600">Toronto, Canada</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="text-lg font-medium text-slate-700 mb-4">
                Connect With Me
              </h4>
              
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/huzaifa-ibrar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-500 p-3 rounded-full transition-colors"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a 
                  href="https://linkedin.com/in/huzaifa-ibrar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-500 p-3 rounded-full transition-colors"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 