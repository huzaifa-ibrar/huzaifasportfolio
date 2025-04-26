"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TodoProps {
  title: string;
  todos: string[];
}

const Todo: React.FC<TodoProps> = ({ title, todos }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const todoRefs = useRef<Array<HTMLLIElement | null>>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current && titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      todoRefs.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              delay: 0.1 * index,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
              },
            }
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Ensure refs array is initialized with the correct length
  useEffect(() => {
    todoRefs.current = todoRefs.current.slice(0, todos.length);
  }, [todos.length]);

  return (
    <div className="mb-8" ref={containerRef}>
      <div ref={titleRef} className="text-xl font-semibold mb-4 text-primary-600">{title}</div>
      <ul className="list-disc pl-6 space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            ref={el => {
              todoRefs.current[index] = el;
            }}
            onClick={() => handleItemClick(index)}
            className={`cursor-pointer transition-colors duration-300 ${
              activeIndex === index 
                ? 'text-primary-500 font-medium' 
                : 'text-secondary-700 hover:text-primary-500'
            }`}
          >
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo; 