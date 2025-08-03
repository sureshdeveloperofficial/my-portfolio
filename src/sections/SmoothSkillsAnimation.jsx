import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaNodeJs, 
  FaGithub, 
  FaPython,
  FaFigma
} from 'react-icons/fa';
import { 
  SiTailwindcss, 
  SiMongodb, 
  SiNextdotjs, 
  SiThreedotjs,
  SiFlutter,
  SiPostgresql,
  SiExpress,
  SiMysql,
  SiTypescript,
  SiRazorpay,
  SiPaypal,
  SiPassport
} from 'react-icons/si';
import { IoLogoBitbucket } from 'react-icons/io';
import { FcGoogle } from "react-icons/fc";
import { FaCcPaypal } from "react-icons/fa6";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ClipPathTitle component (if not imported)
const ClipPathTitle = ({ title, color, bg, className, borderColor }) => (
  <h1 
    className={`text-6xl md:text-8xl font-bold ${className}`}
    style={{
      color: color,
      backgroundColor: bg,
      WebkitTextStroke: `2px ${borderColor}`,
      padding: '0.2em',
      margin: '0.1em 0',
      position: 'relative',
      zIndex: 10,
      textShadow: `0 0 30px ${color}40`,
      transition: 'all 0.3s ease'
    }}
  >
    {title}
  </h1>
);

const SmoothSkillsAnimation = () => {
  const skillsRef = useRef(null);
  const titleRef = useRef(null);

  const skills = [
    {
      name: 'HTML',
      icon: <FaHtml5 className="w-12 h-12" />,
      color: '#E34F26'
    },
    {
      name: 'CSS',
      icon: <FaCss3Alt className="w-12 h-12" />,
      color: '#1572B6'
    },
    {
      name: 'JavaScript',
      icon: <FaJs className="w-12 h-12" />,
      color: '#F7DF1E'
    },
    {
      name: 'React JS',
      icon: <FaReact className="w-12 h-12" />,
      color: '#61DAFB'
    },
    {
      name: 'Node.js',
      icon: <FaNodeJs className="w-12 h-12" />,
      color: '#339933'
    },
    {
      name: "Express.js",
      icon: <SiExpress className="w-12 h-12" />,
      color: '#000000'
    },
    {
      name: "Typescript",
      icon: <SiTypescript className="w-12 h-12" />,
      color: '#0377CA'
    },
    {
      name: 'Next.js',
      icon: <SiNextdotjs className="w-12 h-12" />,
      color: '#000000'
    },
    {
      name: "Three.js", 
      icon: <SiThreedotjs className="w-12 h-12" />,
      color: '#000000'
    },
    {
      name: 'Python',
      icon: <FaPython className="w-12 h-12" />,
      color: '#3776AB'
    },
    {
      name: 'GitHub',
      icon: <FaGithub className="w-12 h-12" />,
      color: '#181717'
    },
    {
      name: "BitBucket",
      icon: <IoLogoBitbucket className="w-12 h-12" />,
      color: '#227FFB'
    },
    {
      name: 'MongoDB',
      icon: <SiMongodb className="w-12 h-12" />,
      color: '#47A248'
    },
    {
      name: "MySQL",
      icon: <SiMysql className="w-12 h-12" />,
      color: '#005782'
    }, 
    {
      name: "PostgreSQL",
      icon: <SiPostgresql className="w-12 h-12" />,
      color: '#2F618F'
    },
    {
      name: 'Tailwind CSS',
      icon: <SiTailwindcss className="w-12 h-12" />,
      color: '#06B6D4'
    },
    {
      name: "Razorpay",
      icon: <SiRazorpay className="w-12 h-12" />,
      color: '#3190F7'
    },
    {
      name: "Paypal",
      icon: <FaCcPaypal className="w-12 h-12" />,
      color: '#002A86'
    },
    {
      name: "Google Outh",
      icon: <FcGoogle className="w-12 h-12" />,
      color: '#4082ED'
    },
    {
      name: "Passport.js",
      icon: <SiPassport className="w-12 h-12" />,
      color: '#35DD89'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title first
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Set initial state for skill cards (hidden and positioned above)
      gsap.set('.skill-card', {
        opacity: 0,
        y: -200,
        rotation: 0,
        scale: 0.8
      });

      // Drop animation for each skill card one by one
      gsap.to('.skill-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "bounce.out",
        stagger: {
          each: 0.2,
          from: "start"
        },
        delay: 0.5
      });

      // Add a subtle rotation during the drop
      gsap.to('.skill-card', {
        rotation: 360,
        duration: 0.8,
        ease: "power2.out",
        stagger: {
          each: 0.2,
          from: "start"
        },
        delay: 0.5
      });

      // Start continuous rolling after all cards have dropped
      gsap.delayedCall(0.5 + (skills.length * 0.2) + 0.8, () => {
        // Multiple rotation speeds for different icons
        gsap.to('.skill-icon', {
          rotation: 360,
          duration: 6,
          ease: "none",
          repeat: -1,
          stagger: {
            each: 0.5,
            from: "random"
          }
        });

        // Additional rolling animation for enhanced effect
        gsap.to('.skill-card', {
          rotationY: 360,
          duration: 12,
          ease: "none",
          repeat: -1,
          stagger: {
            each: 1,
            from: "center"
          }
        });
      });

      // Hover animations with rolling effect
      const skillCards = document.querySelectorAll('.skill-card');
      skillCards.forEach((card, index) => {
        const icon = card.querySelector('.skill-icon');

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.2,
            duration: 0.4,
            ease: "back.out(1.7)",
            rotationZ: 10
          });
          gsap.to(icon, {
            rotation: "+=360",
            duration: 0.6,
            ease: "power2.out",
            scale: 1.1
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            rotationZ: 0
          });
          gsap.to(icon, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

    }, skillsRef);

    return () => ctx.revert();
  }, []);

  // Title Animation
  useGSAP(() => {
    // Enhanced title reveal animation with scroll trigger
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skill-section",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        toggleActions: "play none none reverse"
      },
    });

    // Split text animation for more dynamic effect
    const firstTitle = document.querySelector(".skill-section .first-title");
    const secondTitle = document.querySelector(".skill-section .second-title");

    if (firstTitle && secondTitle) {
      // Create text split effect
      const firstText = firstTitle.textContent;
      const secondText = secondTitle.textContent;

      // Clear and recreate with spans for character animation
      firstTitle.innerHTML = firstText.split('').map(char => 
        `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(50px) rotateX(90deg);">${char}</span>`
      ).join('');

      secondTitle.innerHTML = secondText.split('').map(char => 
        `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(50px) rotateX(90deg);">${char}</span>`
      ).join('');

      // Animate first title characters
      revealTl
        .to(".skill-section .first-title .char", {
          duration: 0.8,
          opacity: 1,
          y: 0,
          rotateX: 0,
          ease: "back.out(1.7)",
          stagger: 0.05,
        })
        .to(".skill-section .second-title .char", {
          duration: 0.8,
          opacity: 1,
          y: 0,
          rotateX: 0,
          ease: "back.out(1.7)",
          stagger: 0.05,
        }, "-=0.4");

      // Add parallax effect to titles
      gsap.to(".skill-section .first-title", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".skill-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(".skill-section .second-title", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".skill-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Add scale and glow effect on scroll
      gsap.to(".skill-section .first-title", {
        scale: 1.1,
        filter: "brightness(1.2) drop-shadow(0 0 20px rgba(200, 142, 100, 0.5))",
        ease: "none",
        scrollTrigger: {
          trigger: ".skill-section",
          start: "center center",
          end: "bottom center",
          scrub: 1
        }
      });

      gsap.to(".skill-section .second-title", {
        scale: 1.05,
        filter: "brightness(1.1) drop-shadow(0 0 15px rgba(34, 33, 35, 0.3))",
        ease: "none",
        scrollTrigger: {
          trigger: ".skill-section",
          start: "center center",
          end: "bottom center",
          scrub: 1
        }
      });
    }

    // Add floating animation to titles
    gsap.to(".skill-section .first-title", {
      y: -10,
      duration: 3,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });

    gsap.to(".skill-section .second-title", {
      y: -8,
      duration: 3.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      delay: 0.5
    });

  }, { scope: skillsRef });

  return (
    <div ref={skillsRef} className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <section className="skill-section">
            <div className="mt-20 col-center">
              <ClipPathTitle
                title={"MY INNOVATIVE"}
                color={"#EACAA6"}
                bg={"#523122"}
                className={"first-title"}
                borderColor={"#222123"}
              />
              <ClipPathTitle
                title={"CREATIVE SKILLS"}
                color={"#222123"}
                bg={"#faeade"}
                className={"second-title"}
                borderColor={"#222123"}
              />
            </div>
          </section>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-card group relative bg-amber-100/80 backdrop-blur-sm rounded-full p-8 border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 cursor-pointer aspect-square flex flex-col items-center justify-center shadow-lg hover:shadow-2xl"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300/20 to-orange-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="skill-icon mb-3 flex justify-center">
                  <div 
                    className="w-16 h-16 flex items-center justify-center"
                    style={{ color: skill.color }}
                  >
                    {skill.icon}
                  </div>
                </div>
                <h3 className="text-amber-900 font-semibold text-sm">{skill.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            ></div>
          ))}
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
            opacity: 0.7;
          }
        }
        
        .skill-card {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        
        .skill-icon {
          transform-style: preserve-3d;
        }

        .col-center {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Character animation styles */
        .char {
          transform-origin: center;
          will-change: transform, opacity;
        }

        .skill-section .first-title,
        .skill-section .second-title {
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        /* Enhanced glow effects */
        .skill-section .first-title:hover,
        .skill-section .second-title:hover {
          filter: brightness(1.3) drop-shadow(0 0 40px rgba(200, 142, 100, 0.8));
          transform: scale(1.02);
        }

        /* Smooth character transitions */
        .char {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Add subtle rotation to characters on hover */
        .skill-section:hover .char {
          transform: rotateY(5deg) rotateX(2deg);
        }

        /* Staggered character hover effect */
        .skill-section:hover .char:nth-child(odd) {
          transform: rotateY(-3deg) rotateX(-1deg);
        }

        .skill-section:hover .char:nth-child(even) {
          transform: rotateY(3deg) rotateX(1deg);
        }
      `}</style>
    </div>
  );
};

export default SmoothSkillsAnimation;