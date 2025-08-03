import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Briefcase,
  Code,
  GraduationCap,
  Award,
  Rocket,
  Users,
  Target,
  TrendingUp,
  Building,
  Coffee,
  Icon,
  // Tech icons
  Database,
  Globe,
  Smartphone,
  Cloud,
  Shield,
  Zap,
  Cpu,
  Layers
} from 'lucide-react';
// Import real tech icons from React Icons
import { 
  SiReact, 
  SiNodedotjs, 
  SiJavascript, 
  SiTypescript, 
  SiMongodb, 
  SiMysql, 
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiBootstrap,
  SiHtml5,
  SiCss3,
  SiPython,
  SiExpress,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiRedux,
  SiGraphql,
  SiFirebase,
  SiVercel,
  SiNetlify,
  SiFigma,
  SiAdobexd,
  SiPostman,
  SiJira,
  SiTrello,
  SiSlack,
  SiDiscord,
  SiWordpress,
  SiShopify,
  SiStripe,
  SiPaypal
} from 'react-icons/si';
import { DiDotnet } from "react-icons/di";
import { DiMsqlServer } from "react-icons/di";
import { SiDevexpress } from "react-icons/si";

import ClipPathTitle from '../components/ClipPathTitle';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const timelineRef = useRef(null);
  const paragraphRef = useRef(null);
  
  // paragraph text reveal gsap animation
  useGSAP(() => {
    const paragraphSplit = new SplitText(paragraphRef.current, {
      type: "words",
    });

    gsap.from(paragraphSplit.words, {
      yPercent: 100,
      opacity: 0,
      scale: 0.8,
      ease: "back.out(1.7)",
      duration: 1.2,
      stagger: 0.15,
      scrollTrigger: {
        trigger: paragraphRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Experience data with positions for snake-like flow
  const experiences = [
    {
      id: 1,
      title: "Associate Software Developer",
      company: "Webnox Technologies PVT",
      period: "2025 (May) - Present",
      description: "Developing and maintaining web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "React", icon: <SiReact className="w-4 h-4" />, color: "text-blue-500" },
        { name: "Node.js", icon: <SiNodedotjs className="w-4 h-4" />, color: "text-green-500" },
        { name: "TypeScript", icon: <SiTypescript className="w-4 h-4" />, color: "text-blue-600" },
        { name: "MongoDB", icon: <SiMongodb className="w-4 h-4" />, color: "text-green-600" },
        { name: "AWS", icon: <Cloud className="w-4 h-4" />, color: "text-orange-500" },
        { name: "Docker", icon: <SiDocker className="w-4 h-4" />, color: "text-blue-400" }
      ],
      color: "bg-amber-600",
      side: "left",
      pathPoint: 0
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Webnox Technologies",
      period: "2024 (Sep) - 2025 (April)",
      description: "Developing and maintaining web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.",
      icon: <Users className="w-6 h-6" />,
      skills: [
        { name: "React", icon: <SiReact className="w-4 h-4" />, color: "text-blue-500" },
        { name: "Node.js", icon: <SiNodedotjs className="w-4 h-4" />, color: "text-green-500" },
        { name: "Express", icon: <SiExpress className="w-4 h-4" />, color: "text-gray-600" },
        { name: "MySQL", icon: <SiMysql className="w-4 h-4" />, color: "text-blue-700" },
        { name: "Tailwind", icon: <SiTailwindcss className="w-4 h-4" />, color: "text-cyan-500" },
        { name: "Git", icon: <SiGit className="w-4 h-4" />, color: "text-orange-600" }
      ],
      color: "bg-orange-600",
      side: "right",
      pathPoint: 1
    },
    {
      id: 3,
      title: "Junior Web Developer",
      company: "Webnox Technologies",
      period: "2023 (Nov) - 2024 (Aug)",
      description: "Developed and maintained dynamic web applications using React.js for frontend and Node.js for backend APIs.",
      icon: <Rocket className="w-6 h-6" />,
      skills: [
        { name: "React", icon: <SiReact className="w-4 h-4" />, color: "text-blue-500" },
        { name: "JavaScript", icon: <SiJavascript className="w-4 h-4" />, color: "text-yellow-500" },
        { name: "HTML5", icon: <SiHtml5 className="w-4 h-4" />, color: "text-orange-500" },
        { name: "CSS3", icon: <SiCss3 className="w-4 h-4" />, color: "text-blue-500" },
        { name: "Bootstrap", icon: <SiBootstrap className="w-4 h-4" />, color: "text-purple-500" },
        { name: "GitHub", icon: <SiGithub className="w-4 h-4" />, color: "text-gray-800" }
      ],
      color: "bg-yellow-600",
      side: "left",
      pathPoint: 2
    },
    {
      id: 4,
      title: "Software Developer Intern",
      company: "Sivasakthi Software Services Private Limited",
      period: "2023 (August) - 2023 (Oct)",
      description: "Experienced ASP.NET and VB.NET developer skilled in building and maintaining web applications using Microsoft technologies. Proficient in SQL Server and legacy system modernization.",
      icon: <Building className="w-6 h-6" />,
      skills: [
        { name: "Dotnet", icon: <DiDotnet className="w-4 h-4" />, color: "text-blue-500" },
        { name: "Microsoft Sql Server", icon: <DiMsqlServer className="w-4 h-4" />, color: "text-pink-500" },
        { name: "Dev Express", icon: <SiDevexpress className="w-4 h-4" />, color: "text-blue-600" }
      ],
      color: "bg-red-600",
      side: "right",
      pathPoint: 3
    },
    {
      id: 5,
      title: "Bachelor of Computer Science",
      company: "Sri Jayendra Saraswathy Maha Vidhya Colleg Of Arts & Science",
      period: "2020 (May) - 2023 (Jun)",
      description: "Completed Bachelor's degree with focus on software engineering, data structures, and algorithms. Participated in coding competitions and hackathons.",
      icon: <GraduationCap className="w-6 h-6" />,
      skills: [
        { name: "Programming", icon: <Code className="w-4 h-4" />, color: "text-red-500" },
        { name: "Algorithms", icon: <Cpu className="w-4 h-4" />, color: "text-blue-700" },
        { name: "MySQL", icon: <SiMysql className="w-4 h-4" />, color: "text-blue-700" },
      ],
      color: "bg-orange-700",
      side: "left",
      pathPoint: 4
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;

    if (!container || !path) return;

    // Set initial path styles
    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    // Create main timeline for path animation
    const pathTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const offset = pathLength - (pathLength * progress);
          gsap.set(path, { strokeDashoffset: offset });
        }
      }
    });

    // Animate each timeline item
    const items = container.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
      const isLeft = experiences[index].side === 'left';

      // Set initial states
      gsap.set(item, {
        opacity: 0,
        scale: 0.7,
        x: isLeft ? -100 : 100,
        y: 50
      });

      // Animate item appearance
      gsap.to(item, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate the timeline pin
      const pin = item.querySelector('.timeline-pin');
      if (pin) {
        gsap.set(pin, { scale: 0, rotation: 180 });
        gsap.to(pin, {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Animate the content card
      const card = item.querySelector('.timeline-card');
      if (card) {
        gsap.set(card, {
          opacity: 0,
          y: 30,
          scale: 0.9
        });
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Animate connecting line
      const connector = item.querySelector('.connector-line');
      if (connector) {
        gsap.set(connector, {
          scaleX: 0,
          transformOrigin: isLeft ? "right center" : "left center"
        });
        gsap.to(connector, {
          scaleX: 1,
          duration: 0.5,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // GSAP Animation
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".experience-section",
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl
      .to(".experience-section .fourth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <section className="experience-section">
          <div className="mt-20 col-center">
            <ClipPathTitle
              title={"MY JOURNEY"}
              color={"#2E2D2F"}
              bg={"#FED777"}
              className={"fourth-title"}
              borderColor={"#222123"}
            />
          </div>
        </section>
        
        <div ref={paragraphRef} className="text-center mb-16">
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Follow the path of my professional evolution through technology and innovation
          </p>
        </div>
  
        {/* Timeline Container */}
        <div ref={containerRef} className="relative min-h-[200vh]">
          {/* Snake Path SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
            viewBox="0 0 400 1400"
            preserveAspectRatio="xMidYMin meet"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="25%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="75%" stopColor="#c2410c" />
                <stop offset="100%" stopColor="#a16207" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              ref={pathRef}
              d="M200,50 
                 Q250,100 200,150 
                 Q150,200 200,250 
                 Q250,300 200,350 
                 Q150,400 200,450 
                 Q250,500 200,550 
                 Q150,600 200,650 
                 Q250,700 200,750 
                 Q150,800 200,850 
                 Q250,900 200,950 
                 Q150,1000 200,1050 
                 Q250,1100 200,1150 
                 Q150,1200 200,1250 
                 Q250,1300 200,1350"
              stroke="url(#pathGradient)"
              strokeWidth="6"
              fill="none"
              filter="url(#glow)"
              className="drop-shadow-lg"
            />
          </svg>

          {/* Timeline Items */}
          <div ref={timelineRef} className="relative" style={{ zIndex: 2 }}>
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="timeline-item absolute w-full"
                style={{
                  top: `${120 + index * 200}px`,
                  left: 0
                }}
              >
                {/* Timeline Pin */}
                <div
                  className={`timeline-pin absolute left-1/2 transform -translate-x-1/2 w-20 h-20 ${exp.color} rounded-full flex items-center justify-center text-white shadow-2xl z-20 border-4 border-amber-100`}
                >
                  {exp.icon}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>

                {/* Connecting Line */}
                <div
                  className={`connector-line absolute top-10 h-1 bg-gradient-to-r from-amber-400 to-orange-500 ${
                    exp.side === 'left' ? 'right-1/2 mr-10' : 'left-1/2 ml-10'
                  } w-16 z-10`}
                ></div>

                {/* Content Card */}
                <div
                  className={`timeline-card absolute top-0 w-80 bg-amber-50/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-amber-200/50 ${
                    exp.side === 'left' ? 'right-1/2 mr-24' : 'left-1/2 ml-24'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-amber-900 mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-orange-700 font-semibold mb-2">
                        {exp.company}
                      </p>
                      <p className="text-sm text-amber-700 mb-3">
                        {exp.period}
                      </p>
                    </div>
                    <div className={`${exp.color} w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                      {exp.id}
                    </div>
                  </div>

                  <p className="text-amber-800 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Technology Icons */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-amber-700 mb-2">Technologies:</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className={`flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100/50 border border-amber-200/50 ${skill.color}`}
                        >
                          {skill.icon}
                          <span className="text-xs font-medium">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-amber-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${exp.color.replace('bg-', 'from-')} to-amber-300`}
                      style={{ width: `${(experiences.length - index) * 15}%` }}
                    ></div>
                  </div>

                  {/* Floating orbs */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full animate-pulse opacity-70"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-amber-400 rounded-full animate-bounce opacity-60"></div>
                </div>

                {/* Floating particles */}
                <div
                  className="absolute w-2 h-2 bg-orange-400 rounded-full animate-float opacity-70"
                  style={{
                    left: exp.side === 'left' ? '30%' : '70%',
                    top: '20px',
                    animationDelay: `${index * 0.2}s`
                  }}
                ></div>
                <div
                  className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float opacity-80"
                  style={{
                    left: exp.side === 'left' ? '25%' : '75%',
                    top: '40px',
                    animationDelay: `${index * 0.3}s`
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "3+", label: "Years Experience", color: "text-amber-700" },
            { number: "50+", label: "Projects", color: "text-orange-700" },
            { number: "15+", label: "Technologies", color: "text-red-700" },
            { number: "95%", label: "Client Satisfaction", color: "text-yellow-700" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-amber-800">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Experience;