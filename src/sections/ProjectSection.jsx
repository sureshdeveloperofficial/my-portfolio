import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaReact, FaNode, FaPython, FaDatabase, FaJs, FaHtml5, FaCss3Alt, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { SiMongodb, SiPostgresql, SiTailwindcss, SiExpress, SiNextdotjs, SiTypescript, SiFirebase, SiDocker } from 'react-icons/si';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
    description: "Full-featured e-commerce platform with payment integration, inventory management, and real-time analytics. Built with React, Node.js, and MongoDB.",
    technologies: [FaReact, FaNode, SiMongodb, SiExpress, SiTailwindcss],
    github: "https://github.com/username/ecommerce-platform",
    demo: "https://ecommerce-demo.vercel.app",
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Task Management App",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
    description: "Collaborative task management application with real-time updates, team workspaces, and advanced filtering. Features drag-and-drop functionality.",
    technologies: [SiNextdotjs, SiTypescript, SiPostgresql, SiTailwindcss, FaNode],
    github: "https://github.com/username/task-manager",
    demo: "https://taskflow-app.com",
    category: "Full Stack"
  },
  {
    id: 3,
    title: "Data Analytics Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
    description: "Interactive data visualization dashboard with real-time charts, custom reporting, and data export capabilities. Built for business intelligence.",
    technologies: [FaReact, FaPython, SiPostgresql, FaJs, SiDocker],
    github: "https://github.com/username/analytics-dashboard",
    demo: "https://analytics-demo.netlify.app",
    category: "Data Visualization"
  },
  {
    id: 4,
    title: "Social Media Platform",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop&crop=center",
    description: "Modern social media platform with real-time messaging, content sharing, and user authentication. Includes advanced privacy controls.",
    technologies: [FaReact, FaNode, SiMongodb, SiFirebase, SiExpress],
    github: "https://github.com/username/social-platform",
    demo: "https://social-connect-app.com",
    category: "Full Stack"
  },
  {
    id: 5,
    title: "Weather Forecast App",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&crop=center",
    description: "Beautiful weather application with location-based forecasts, interactive maps, and severe weather alerts. Features stunning animations.",
    technologies: [FaReact, FaJs, SiTailwindcss, FaHtml5, FaCss3Alt],
    github: "https://github.com/username/weather-app",
    demo: "https://weather-forecast-pro.com",
    category: "Frontend"
  }
];

const ProjectSection = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const [gsap, setGSAP] = useState(null);
  const [ScrollTrigger, setScrollTrigger] = useState(null);

  // Load GSAP and ScrollTrigger
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        // Check if GSAP is already loaded
        if (window.gsap) {
          const gsapInstance = window.gsap;
          const ScrollTriggerInstance = window.ScrollTrigger;
          
          if (ScrollTriggerInstance) {
            gsapInstance.registerPlugin(ScrollTriggerInstance);
            setGSAP(gsapInstance);
            setScrollTrigger(ScrollTriggerInstance);
            return;
          }
        }

        // Load GSAP from CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.async = true;
        
        script.onload = () => {
          // Load ScrollTrigger plugin
          const scrollTriggerScript = document.createElement('script');
          scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
          scrollTriggerScript.async = true;
          
          scrollTriggerScript.onload = () => {
            // Wait a bit to ensure everything is loaded
            setTimeout(() => {
              const gsapInstance = window.gsap;
              const ScrollTriggerInstance = window.ScrollTrigger;
              
              if (gsapInstance && ScrollTriggerInstance) {
                gsapInstance.registerPlugin(ScrollTriggerInstance);
                setGSAP(gsapInstance);
                setScrollTrigger(ScrollTriggerInstance);
              } else {
                console.error('GSAP or ScrollTrigger not found after loading');
              }
            }, 100);
          };
          
          document.head.appendChild(scrollTriggerScript);
        };
        
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };

    loadGSAP();
  }, []);

  // Initialize card stack and scroll animations
  useEffect(() => {
    if (!gsap || !ScrollTrigger) {
      console.log('GSAP or ScrollTrigger not loaded yet');
      return;
    }

    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0) {
      console.log('No cards found');
      return;
    }

    console.log('Initializing animations with', cards.length, 'cards');

    // Clear previous ScrollTrigger instances
    try {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    } catch (error) {
      console.error('Error clearing ScrollTrigger instances:', error);
    }

    // Initial card setup - stack cards with proper positioning
    cards.forEach((card, index) => {
      gsap.set(card, {
        y: index * 20,
        scale: 1 - index * 0.05,
        zIndex: projects.length - index,
        opacity: 1 - index * 0.1,
        rotationY: index * 2,
        transformOrigin: "center center",
        transformStyle: "preserve-3d"
      });
    });

    // Entrance animation
    gsap.fromTo(cards, {
      y: (i) => 300 + i * 50,
      opacity: 0,
      scale: 0.8,
      rotationY: (i) => i * 10
    }, {
      y: (i) => i * 20,
      opacity: (i) => 1 - i * 0.1,
      scale: (i) => 1 - i * 0.05,
      rotationY: (i) => i * 2,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3
    });

    // Create smooth scroll-based card stacking animation
    cards.forEach((card, index) => {
      const isLast = index === cards.length - 1;
      
      if (!isLast && sectionRef.current) {
        try {
          console.log('Creating ScrollTrigger for card', index);
          const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: `top+=${index * 100} top`,
            end: `bottom-=${(cards.length - index) * 100} bottom`,
            scrub: 1.5,
            onUpdate: (self) => {
              if (!self || typeof self.progress !== 'number') return;
              
              const progress = self.progress;
              const nextIndex = Math.min(index + 1, cards.length - 1);
              
              // Smooth card transitions
              gsap.to(card, {
                y: -progress * 150,
                scale: 1 + progress * 0.1,
                opacity: 1 - progress * 0.7,
                rotationY: -progress * 15,
                rotationX: progress * 10,
                duration: 0.3,
                ease: "power2.out"
              });

              // Update active card based on progress
              if (progress > 0.5 && activeCard !== nextIndex) {
                setActiveCard(nextIndex);
              } else if (progress <= 0.5 && activeCard !== index) {
                setActiveCard(index);
              }
            }
          });
          console.log('ScrollTrigger created successfully for card', index, trigger);
        } catch (error) {
          console.error('Error creating ScrollTrigger for card', index, error);
        }
      }
    });

    // Parallax background effect
    if (sectionRef.current) {
      try {
        gsap.to(".bg-element-1", {
          y: -100,
          rotation: 5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
          }
        });

        gsap.to(".bg-element-2", {
          y: -150,
          rotation: -3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      } catch (error) {
        console.error('Error creating parallax effects:', error);
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [gsap, ScrollTrigger, activeCard]);

  // Card click handler for manual navigation
  const handleCardClick = useCallback((index) => {
    if (!gsap || index === activeCard) return;

    const targetCard = cardRefs.current[index];
    if (!targetCard) return;

    // Smooth scroll to card position
    const cardRect = targetCard.getBoundingClientRect();
    const targetY = window.scrollY + cardRect.top - window.innerHeight / 3;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: targetY },
      ease: "power3.inOut"
    });
  }, [gsap, activeCard]);

  // Navigation functions
  const scrollToNext = useCallback(() => {
    const nextIndex = Math.min(activeCard + 1, projects.length - 1);
    if (nextIndex !== activeCard) {
      handleCardClick(nextIndex);
    }
  }, [activeCard, handleCardClick]);

  const scrollToPrevious = useCallback(() => {
    const prevIndex = Math.max(activeCard - 1, 0);
    if (prevIndex !== activeCard) {
      handleCardClick(prevIndex);
    }
  }, [activeCard, handleCardClick]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          scrollToNext();
          break;
        case 'ArrowUp':
          e.preventDefault();
          scrollToPrevious();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [scrollToNext, scrollToPrevious]);

  if (!gsap || !ScrollTrigger) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading GSAP animations...</div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-element-1 absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="bg-element-2 absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-purple-900/20 via-transparent to-pink-900/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Portfolio
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Discover my latest projects featuring cutting-edge technologies and innovative solutions
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Scroll to explore</span>
              <svg className="w-4 h-4 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Stack Container */}
        <div 
          ref={containerRef}
          className="relative max-w-5xl mx-auto min-h-[2000px] flex items-start justify-center pt-20"
          style={{ perspective: '1000px' }}
        >
          <div className="sticky top-20 w-full max-w-4xl">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={el => cardRefs.current[index] = el}
                className="absolute w-full cursor-pointer transform-gpu will-change-transform"
                onClick={() => handleCardClick(index)}
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:shadow-3xl transition-all duration-500 hover:border-purple-300/50">
                  <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:w-1/2 relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-64 md:h-80 object-cover transform transition-transform duration-700 hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 p-8 md:p-10">
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-8 leading-relaxed text-base md:text-lg">
                        {project.description}
                      </p>

                      {/* Technology Icons */}
                      <div className="flex flex-wrap gap-4 mb-8">
                        {project.technologies.map((TechIcon, techIndex) => (
                          <div 
                            key={techIndex}
                            className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:from-purple-100 hover:to-pink-100"
                          >
                            <TechIcon className="text-purple-600 text-2xl" />
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub className="text-xl" />
                          <span>View Code</span>
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaExternalLinkAlt className="text-xl" />
                          <span>Live Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Navigation */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center space-x-6 bg-white/10 backdrop-blur-lg rounded-full px-8 py-4 border border-white/20">
            <button
              onClick={scrollToPrevious}
              disabled={activeCard === 0}
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous project"
            >
              <svg className="w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="flex space-x-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`transition-all duration-500 ${
                    index === activeCard 
                      ? 'w-10 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full scale-110 shadow-lg' 
                      : 'w-4 h-4 bg-white/40 hover:bg-white/60 rounded-full hover:scale-110'
                  }`}
                  title={`Go to ${projects[index].title}`}
                />
              ))}
            </div>
            
            <button
              onClick={scrollToNext}
              disabled={activeCard === projects.length - 1}
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next project"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Project Info Panel */}
        <div className="fixed top-8 right-8 z-40">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl px-6 py-4 border border-white/20">
            <div className="text-center">
              <p className="text-gray-300 text-sm font-medium">
                {activeCard + 1} / {projects.length}
              </p>
              <p className="text-white text-lg font-bold mt-1">
                {projects[activeCard].title}
              </p>
              <p className="text-purple-400 text-sm mt-1">
                {projects[activeCard].category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;