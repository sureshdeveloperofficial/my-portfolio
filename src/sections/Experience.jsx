import React, { useEffect, useRef, useState } from 'react';

// Load GSAP and ScrollTrigger from CDN
const loadGSAP = () => {
  return new Promise((resolve) => {
    if (window.gsap && window.ScrollTrigger) {
      resolve({ gsap: window.gsap, ScrollTrigger: window.ScrollTrigger });
      return;
    }
    
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.head.appendChild(script);
      });
    };
    
    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js')
    ]).then(() => {
      window.gsap.registerPlugin(window.ScrollTrigger);
      resolve({ gsap: window.gsap, ScrollTrigger: window.ScrollTrigger });
    });
  });
};

// SVG Icons Component
const TechIcon = ({ name, color = "#000000", size = 24 }) => {
  const icons = {
    'React.js': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.85-1.87 1.85-1.87-.82-1.87-1.85.84-1.89 1.87-1.89z" fill={color}/>
        <path d="M7.37 9c.63-.19 1.3-.35 2.01-.48.22-.04.44-.08.67-.12-.08-.26-.15-.52-.21-.78-.34-1.36-.34-2.51.12-3.34.44-.79 1.25-1.28 2.3-1.28 1.04 0 1.85.49 2.29 1.28.46.83.46 1.98.12 3.34-.06.26-.13.52-.21.78.23.04.45.08.67.12.71.13 1.38.29 2.01.48 2.5.78 4.25 2.21 4.25 3.85 0 1.64-1.75 3.07-4.25 3.85-.63.19-1.3.35-2.01.48-.22.04-.44.08-.67.12.08.26.15.52.21.78.34 1.36.34 2.51-.12 3.34-.44.79-1.25 1.28-2.29 1.28-1.05 0-1.86-.49-2.3-1.28-.46-.83-.46-1.98-.12-3.34.06-.26.13-.52.21-.78-.23-.04-.45-.08-.67-.12-.71-.13-1.38-.29-2.01-.48C2.62 15.92.87 14.49.87 12.85c0-1.64 1.75-3.07 4.25-3.85z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M12 2.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm0 18c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5z" fill={color}/>
      </svg>
    ),
    'Node.js': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.23.13.51.2.78.2.27 0 .55-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36L12.78 2.05c-.23-.13-.51-.2-.78-.2z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M7 9.5v5l5 2.89L17 14.5v-5L12 6.61 7 9.5z" fill={color}/>
      </svg>
    ),
    'Next.js': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M7.5 8.5L16.5 19M9.5 15.5L16.5 6.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'TypeScript': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M8 8h8M12 8v8M16 12h4M18 10v4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Docker': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M13.5 10.5h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm6-3h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2h-2v-2zm6-3h2v2h-2v-2zm-3 0h2v2h-2v-2z" fill={color}/>
        <path d="M23 10.5s-1.5-1.5-4.5-1.5-4.5 1.5-4.5 1.5-1.5 3-1.5 6c0 3 1.5 6 1.5 6s1.5 1.5 4.5 1.5 4.5-1.5 4.5-1.5 1.5-3 1.5-6c0-3-1.5-6-1.5-6z" stroke={color} strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    'AWS': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M6 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M12 8v8M8 12h8" stroke={color} strokeWidth="1.5"/>
        <path d="M16 16l4 4M8 8L4 4" stroke={color} strokeWidth="1.5"/>
      </svg>
    ),
    'Express.js': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M2 12h20M7 7l10 10M17 7L7 17" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'MongoDB': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2z" fill={color}/>
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke={color} strokeWidth="1.5" fill="none"/>
        <ellipse cx="12" cy="12" rx="8" ry="3" stroke={color} strokeWidth="1.5" fill="none"/>
        <ellipse cx="12" cy="18" rx="8" ry="3" stroke={color} strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    'PostgreSQL': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2c-2.21 0-4 1.79-4 4v12c0 2.21 1.79 4 4 4s4-1.79 4-4V6c0-2.21-1.79-4-4-4z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M8 10h8M8 14h8" stroke={color} strokeWidth="1.5"/>
        <circle cx="12" cy="6" r="1" fill={color}/>
      </svg>
    ),
    'Redis': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="8" rx="10" ry="3" stroke={color} strokeWidth="1.5" fill="none"/>
        <ellipse cx="12" cy="12" rx="10" ry="3" stroke={color} strokeWidth="1.5" fill="none"/>
        <ellipse cx="12" cy="16" rx="10" ry="3" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M2 8v8c0 1.66 4.48 3 10 3s10-1.34 10-3V8" stroke={color} strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    'Vue.js': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M2 3h4l6 10L18 3h4l-10 18L2 3z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M6 3l6 10L18 3" stroke={color} strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    'JavaScript': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M7 17c0 1.1.9 2 2 2s2-.9 2-2v-7h-2v7M15 17c0 1.1.9 2 2 2s2-.9 2-2v-2h-2v2" stroke={color} strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    'Sass': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M8 8c2 0 4 1 4 3s-2 3-4 3-4-1-4-3 2-3 4-3M16 12c0 2-1 4-3 4s-3-2-3-4" stroke={color} strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    'Webpack': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M12 2v20M3 7l9 5 9-5M3 17l9-5 9 5" stroke={color} strokeWidth="1.5"/>
      </svg>
    ),
    'Figma': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M8 2h4v4H8c-1.1 0-2-.9-2-2s.9-2 2-2zM12 2h4c1.1 0 2 .9 2 2s-.9 2-2 2h-4V2zM12 6h4c1.1 0 2 .9 2 2s-.9 2-2 2h-4V6zM8 10h4v4H8c-1.1 0-2-.9-2-2s.9-2 2-2zM12 14v4c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2h2z" fill={color}/>
      </svg>
    ),
    'GSAP': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M8 8l8 8M16 8l-8 8" stroke={color} strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" fill={color}/>
      </svg>
    ),
    'HTML5': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 2h16l-1.5 17L12 22l-6.5-3L4 2z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M8 6h8M7 10h10M8 14h6" stroke={color} strokeWidth="1.5"/>
      </svg>
    ),
    'CSS3': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 2h16l-1.5 17L12 22l-6.5-3L4 2z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M8 6h8M7 10h10M8 14h6" stroke={color} strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="2" fill={color}/>
      </svg>
    ),
    'jQuery': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12z" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M8 8c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4" fill={color}/>
      </svg>
    ),
    'Bootstrap': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
        <path d="M7 7h6c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H7V7zM7 13h7c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H7v-6z" fill={color}/>
      </svg>
    ),
    'Git': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M21.3 10.7l-8.6-8.6c-.4-.4-1-.4-1.4 0l-8.6 8.6c-.4.4-.4 1 0 1.4l8.6 8.6c.4.4 1 .4 1.4 0l8.6-8.6c.4-.4.4-1 0-1.4z" stroke={color} strokeWidth="1.5" fill="none"/>
        <circle cx="12" cy="12" r="3" fill={color}/>
      </svg>
    )
  };

  return icons[name] || (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M8 8h8M8 12h8M8 16h4" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
};

// Navigation Controls
const NavigationControls = ({ currentIndex, totalItems, onNavigate }) => {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-amber-200">
      <div className="flex flex-col items-center space-y-6">
        <button
          onClick={() => onNavigate('prev')}
          disabled={currentIndex === 0}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className="flex flex-col items-center space-y-2">
          {Array.from({ length: totalItems }, (_, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={() => onNavigate('next')}
          disabled={currentIndex === totalItems - 1}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  const experienceItemsRef = useRef([]);
  const timelineLineRef = useRef(null);
  const headerRef = useRef(null);
  const backgroundTextRef = useRef(null);
  const curvedPathsRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [activeItem, setActiveItem] = useState(0);
  const [gsapInstance, setGsapInstance] = useState(null);

  const experiences = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description: "Leading development of enterprise-scale applications with modern React ecosystem. Architecting scalable solutions and mentoring development teams while implementing cutting-edge technologies.",
      achievements: [
        "Improved application performance by 45% through code optimization",
        "Led cross-functional team of 8 developers across 3 projects",
        "Implemented comprehensive CI/CD pipeline reducing deployment time by 60%",
        "Established coding standards and best practices across organization"
      ],
      technologies: [
        { name: "React.js", color: "#61DAFB" },
        { name: "Node.js", color: "#339933" },
        { name: "Next.js", color: "#000000" },
        { name: "TypeScript", color: "#3178C6" },
        { name: "Docker", color: "#2496ED" },
        { name: "AWS", color: "#FF9900" }
      ],
      side: "left",
      metrics: { projects: "25+", team: "8", performance: "45%" }
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Digital Solutions Co.",
      period: "2020 - 2022",
      description: "Developed comprehensive web solutions using modern JavaScript frameworks. Created responsive, user-friendly interfaces while building robust backend APIs and database architectures.",
      achievements: [
        "Built 20+ production-ready web applications from scratch",
        "Reduced average page load time by 65% through optimization",
        "Mentored 5 junior developers and conducted code reviews",
        "Integrated third-party APIs and payment systems successfully"
      ],
      technologies: [
        { name: "React.js", color: "#61DAFB" },
        { name: "Express.js", color: "#000000" },
        { name: "MongoDB", color: "#47A248" },
        { name: "PostgreSQL", color: "#336791" },
        { name: "Redis", color: "#DC382D" },
        { name: "AWS", color: "#FF9900" }
      ],
      side: "right",
      metrics: { projects: "20+", performance: "65%", apis: "15+" }
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "Creative Agency",
      period: "2018 - 2020",
      description: "Specialized in creating engaging user interfaces and interactive experiences. Collaborated with design teams to implement pixel-perfect designs while ensuring optimal user experience across all devices.",
      achievements: [
        "Developed comprehensive design system used across 12 projects",
        "Improved user engagement metrics by 40% through UX optimization",
        "Delivered 30+ client projects with 98% satisfaction rate",
        "Implemented advanced animations and interactive components"
      ],
      technologies: [
        { name: "Vue.js", color: "#4FC08D" },
        { name: "JavaScript", color: "#F7DF1E" },
        { name: "Sass", color: "#CC6699" },
        { name: "Webpack", color: "#8DD6F9" },
        { name: "Figma", color: "#F24E1E" },
        { name: "GSAP", color: "#88CE02" }
      ],
      side: "left",
      metrics: { projects: "30+", satisfaction: "98%", engagement: "40%" }
    },
    {
      id: 4,
      title: "Junior Web Developer",
      company: "StartUp Hub",
      period: "2017 - 2018",
      description: "Began professional journey building responsive websites and learning modern development practices. Focused on mastering fundamental technologies while contributing to various client projects.",
      achievements: [
        "Successfully completed 15+ website projects for small businesses",
        "Learned and implemented modern JavaScript frameworks",
        "Contributed to 5 open-source projects on GitHub",
        "Maintained 99% uptime for all deployed applications"
      ],
      technologies: [
        { name: "HTML5", color: "#E34F26" },
        { name: "CSS3", color: "#1572B6" },
        { name: "JavaScript", color: "#F7DF1E" },
        { name: "jQuery", color: "#0769AD" },
        { name: "Bootstrap", color: "#7952B3" },
        { name: "Git", color: "#F05032" }
      ],
      side: "right",
      metrics: { projects: "15+", uptime: "99%", opensource: "5" }
    }
  ];

  const navigateToItem = (direction) => {
    if (!gsapInstance) return;
    
    let newIndex = activeItem;
    
    if (direction === 'prev' && activeItem > 0) {
      newIndex = activeItem - 1;
    } else if (direction === 'next' && activeItem < experiences.length - 1) {
      newIndex = activeItem + 1;
    } else if (typeof direction === 'number') {
      newIndex = direction;
    }
    
    if (newIndex !== activeItem && experienceItemsRef.current[newIndex]) {
      const targetElement = experienceItemsRef.current[newIndex];
      const offsetTop = targetElement.offsetTop - window.innerHeight / 2 + 300;
      
      gsapInstance.to(window, {
        duration: 1.5,
        scrollTo: {
          y: offsetTop,
          autoKill: false
        },
        ease: "power2.inOut"
      });
      
      setActiveItem(newIndex);
    }
  };

  useEffect(() => {
    const initializeScrollAnimations = async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();
      setGsapInstance(gsap);
      
      // Clear any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Enable smooth scrolling
      gsap.set("html", { scrollBehavior: "auto" });
      
      // Set initial states with more dramatic effects
      gsap.set(experienceItemsRef.current, {
        opacity: 0,
        x: (i) => experiences[i].side === 'left' ? -300 : 300,
        y: 150,
        scale: 0.6,
        rotation: (i) => experiences[i].side === 'left' ? -20 : 20,
        transformOrigin: "center center"
      });

      gsap.set('.timeline-dot', {
        scale: 0,
        opacity: 0,
        rotation: 360,
        transformOrigin: "center center"
      });

      gsap.set('.tech-badge', {
        scale: 0,
        opacity: 0,
        y: 50,
        rotation: 45
      });

      gsap.set('.achievement-item', {
        opacity: 0,
        x: -80,
        scale: 0.7,
        rotation: -5
      });

      gsap.set('.metric-item', {
        opacity: 0,
        scale: 0.3,
        rotation: 90,
        y: 20
      });

      gsap.set('.curved-path', {
        strokeDasharray: "1000",
        strokeDashoffset: "1000",
        opacity: 0
      });

      // Enhanced background parallax with rotation
      gsap.to(backgroundTextRef.current, {
        y: -150,
        rotation: 10,
        scale: 1.2,
        opacity: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          }
        }
      });

      // Header animation with enhanced effects
      gsap.fromTo(headerRef.current?.children, 
        {
          opacity: 0,
          y: -120,
          scale: 0.6,
          rotation: 15,
          transformOrigin: "center center"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.8)",
          stagger: 0.4,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Timeline line with smooth reveal
      gsap.fromTo(timelineLineRef.current,
        { 
          scaleY: 0, 
          transformOrigin: "top center",
          opacity: 0.5
        },
        {
          scaleY: 1,
          opacity: 1,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineLineRef.current,
            start: "top 90%",
            end: "bottom 10%",
            scrub: 1.5
          }
        }
      );

      // Curved paths animation
      curvedPathsRef.current.forEach((path, index) => {
        if (path) {
          gsap.to(path, {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: experienceItemsRef.current[index],
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });

      // Enhanced experience items animation
      experienceItemsRef.current.forEach((item, index) => {
        if (!item) return;

        const experience = experiences[index];
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            scrub: false,
            onEnter: () => {
              setVisibleItems(prev => new Set([...prev, index]));
              setActiveItem(index);
            },
            onLeave: () => {
              setVisibleItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
              });
            },
            onEnterBack: () => {
              setVisibleItems(prev => new Set([...prev, index]));
              setActiveItem(index);
            },
            onLeaveBack: () => {
              setVisibleItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
              });
            }
          }
        });

        // Main card animation with enhanced effects
        tl.to(item, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          transformOrigin: "center center"
        })
        
        // Timeline dot with bounce effect
        .to(item.parentElement.querySelector('.timeline-dot'), {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)"
        }, "-=1")
        
        // Tech badges with wave effect
        .to(item.querySelectorAll('.tech-badge'), {
          scale: 1,
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(2)",
          stagger: 0.15
        }, "-=0.8")
        
        // Achievement items with cascade effect
        .to(item.querySelectorAll('.achievement-item'), {
          opacity: 1,
          x: 0,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2
        }, "-=0.6")
        
        // Metrics with pop effect
        .to(item.querySelectorAll('.metric-item'), {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.8)",
          stagger: 0.1
        }, "-=0.4");

        // Enhanced hover animations with 3D effects
        const onMouseEnter = () => {
          gsap.to(item, {
            scale: 1.05,
            y: -20,
            rotationX: 10,
            rotationY: 5,
            z: 100,
            duration: 0.6,
            ease: "power2.out"
          });
          
          gsap.to(item.querySelectorAll('.tech-badge'), {
            scale: 1.2,
            rotation: 360,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.05
          });

          gsap.to(item.parentElement.querySelector('.timeline-dot'), {
            scale: 1.3,
            rotation: 360,
            duration: 0.5,
            ease: "power2.out"
          });
        };

        const onMouseLeave = () => {
          gsap.to(item, {
            scale: 1,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            z: 0,
            duration: 0.6,
            ease: "power2.out"
          });
          
          gsap.to(item.querySelectorAll('.tech-badge'), {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.05
          });

          gsap.to(item.parentElement.querySelector('.timeline-dot'), {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        };

        item.addEventListener('mouseenter', onMouseEnter);
        item.addEventListener('mouseleave', onMouseLeave);
      });

      // Smooth scroll progress tracking
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });

      // Cleanup function
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    initializeScrollAnimations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Enhanced Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-3 bg-amber-200 z-50 shadow-lg">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 transition-all duration-300 shadow-lg"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navigation Controls */}
      <NavigationControls 
        currentIndex={activeItem}
        totalItems={experiences.length}
        onNavigate={navigateToItem}
      />

      {/* Enhanced Background */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div 
          ref={backgroundTextRef}
          className="text-9xl md:text-[300px] font-bold text-amber-200/15 select-none"
          style={{ 
            textShadow: '0 0 50px rgba(245, 158, 11, 0.1)',
            filter: 'blur(1px)'
          }}
        >
          JOURNEY
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: `linear-gradient(45deg, 
                rgb(245, 158, 11, ${0.3 + Math.random() * 0.4}), 
                rgb(251, 146, 60, ${0.2 + Math.random() * 0.3}))`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="text-center pt-24 pb-40 px-4">
          <div className="inline-block mb-12">
            <div className="bg-gradient-to-r from-amber-700 via-orange-700 to-red-700 text-white px-16 py-8 text-6xl md:text-7xl font-bold border-4 border-amber-100 shadow-2xl transform hover:rotate-1 transition-transform duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
              MY JOURNEY
            </div>
          </div>
          <p className="text-amber-800 text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed font-medium">
            From junior developer to senior architect - a story of growth, learning, and building amazing digital experiences.
          </p>
          <div className="mt-12 flex justify-center">
            <div className="w-40 h-3 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-full shadow-lg animate-pulse"></div>
          </div>
        </div>

        {/* Enhanced Timeline Container */}
        <div className="max-w-8xl mx-auto px-4 pb-40">
          <div className="relative">
            {/* Enhanced Timeline Line */}
            <div 
              ref={timelineLineRef}
              className="absolute left-1/2 transform -translate-x-1/2 w-4 rounded-full shadow-xl"
              style={{ 
                height: `${experiences.length * 700}px`,
                background: 'linear-gradient(to bottom, #d97706, #ea580c, #dc2626)',
                boxShadow: '0 0 30px rgba(245, 158, 11, 0.4), inset 0 0 10px rgba(0, 0, 0, 0.2)'
              }}
            />

            {/* Enhanced SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(217, 119, 6, 0.9)" />
                  <stop offset="30%" stopColor="rgba(251, 146, 60, 0.7)" />
                  <stop offset="70%" stopColor="rgba(239, 68, 68, 0.6)" />
                  <stop offset="100%" stopColor="rgba(220, 38, 38, 0.4)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {experiences.map((_, index) => {
                if (index === experiences.length - 1) return null;
                const startY = 350 + (index * 700);
                const endY = 350 + ((index + 1) * 700);
                const isLeft = experiences[index].side === 'left';
                
                return (
                  <path
                    key={index}
                    ref={el => curvedPathsRef.current[index] = el}
                    className="curved-path"
                    d={`M ${isLeft ? 350 : 650} ${startY} Q 500 ${startY + 200} ${isLeft ? 650 : 350} ${endY}`}
                    fill="none"
                    stroke="url(#connectionGradient)"
                    strokeWidth="6"
                    filter="url(#glow)"
                    opacity="0"
                  />
                );
              })}
            </svg>

            {/* Enhanced Experience Items */}
            <div className="relative space-y-40" style={{ zIndex: 2 }}>
              {experiences.map((experience, index) => (
                <div
                  key={experience.id}
                  className={`relative flex items-center min-h-[600px] ${
                    experience.side === 'left' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Enhanced Timeline Dot */}
                  <div className={`timeline-dot absolute left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full shadow-2xl flex items-center justify-center font-bold text-white text-4xl border-6 border-amber-100 z-30 transition-all duration-500 ${
                    activeItem === index ? 'ring-4 ring-amber-400' : ''
                  }`}
                  style={{
                    background: `linear-gradient(135deg, 
                      rgb(180, 83, 9), 
                      rgb(234, 88, 12), 
                      rgb(220, 38, 38))`
                  }}>
                    {experience.id}
                  </div>

                  {/* Enhanced Experience Card */}
                  <div
                    ref={(el) => (experienceItemsRef.current[index] = el)}
                    className={`w-full max-w-2xl bg-white/95 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border-3 border-amber-200 cursor-pointer transition-all duration-700 hover:shadow-3xl ${
                      experience.side === 'left' ? 'mr-auto ml-8' : 'ml-auto mr-8'
                    } ${visibleItems.has(index) ? 'ring-2 ring-amber-400' : ''}`}
                    style={{
                      boxShadow: visibleItems.has(index) 
                        ? '0 25px 50px rgba(245, 158, 11, 0.2), 0 0 30px rgba(245, 158, 11, 0.1)' 
                        : '0 25px 50px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {/* Enhanced Card Header */}
                    <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white px-10 py-8 rounded-2xl mb-8 text-center shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
                      <div className="relative z-10">
                        <div className="text-3xl font-bold mb-3">{experience.title}</div>
                        <div className="text-xl opacity-90">{experience.company}</div>
                      </div>
                    </div>

                    {/* Enhanced Period & Metrics */}
                    <div className="flex justify-between items-center mb-8">
                      <div className="text-amber-800 font-bold text-xl bg-gradient-to-r from-amber-100 to-orange-100 py-4 px-8 rounded-full shadow-lg">
                        {experience.period}
                      </div>
                      <div className="flex gap-6">
                        {Object.entries(experience.metrics).map(([key, value], metricIndex) => (
                          <div key={metricIndex} className="metric-item text-center">
                            <div className="text-3xl font-bold text-amber-700">{value}</div>
                            <div className="text-sm text-amber-600 capitalize font-medium">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Description */}
                    <p className="text-amber-900 text-lg leading-relaxed mb-10 text-center font-medium">
                      {experience.description}
                    </p>

                    {/* Enhanced Achievements */}
                    <div className="mb-10">
                      <h4 className="text-amber-800 font-bold mb-6 text-2xl text-center">Key Achievements</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {experience.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="achievement-item flex items-start text-amber-700 p-2 rounded-lg">
                            <span className="w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mr-4 mt-2 flex-shrink-0 shadow-lg"></span>
                            <span className="text-sm leading-relaxed font-medium">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Technology Stack with SVG Icons */}
                    <div className="text-center">
                      <h4 className="text-amber-800 font-bold mb-6 text-2xl">Technology Stack</h4>
                      <div className="flex flex-wrap gap-4 justify-center">
                        {experience.technologies.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className={`tech-badge bg-white border-2 text-gray-800 px-6 py-4 rounded-full text-sm font-medium shadow-lg flex items-center gap-3 transform hover:scale-110 transition-all duration-300 cursor-pointer hover:shadow-xl`}
                            style={{
                              borderColor: tech.color,
                              boxShadow: `0 8px 16px rgba(0, 0, 0, 0.1), 0 0 20px ${tech.color}20`
                            }}
                          >
                            <TechIcon name={tech.name} color={tech.color} size={20} />
                            <span>{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center pb-32 px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 rounded-3xl p-16 shadow-2xl">
            <h3 className="text-4xl font-bold text-amber-800 mb-6">
              Ready for the Next Chapter?
            </h3>
            <p className="text-amber-700 text-2xl leading-relaxed mb-8">
              Let's collaborate and create something extraordinary together. The journey continues! 🚀
            </p>
            <div className="flex justify-center">
              <div className="w-32 h-4 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-full shadow-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-30px) rotate(180deg) scale(1.2); 
            opacity: 0.8;
          }
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default Experience;  