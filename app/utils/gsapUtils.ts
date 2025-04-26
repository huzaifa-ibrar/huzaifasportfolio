import { gsap } from 'gsap';

// Import ScrollTrigger dynamically when in browser environment
export const initGSAP = async () => {
  if (typeof window !== 'undefined') {
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
    gsap.registerPlugin(ScrollTrigger);
    return { gsap, ScrollTrigger };
  }
  return { gsap };
};

// Clean up ScrollTrigger instances
export const cleanupGSAP = () => {
  if (typeof window !== 'undefined') {
    const ScrollTrigger = (gsap as any).ScrollTrigger;
    if (ScrollTrigger) {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill(false));
    }
  }
}; 