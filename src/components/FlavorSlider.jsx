import { useGSAP } from "@gsap/react";
import { projectLists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";

// Enhanced color map with milk-inspired gradients matching your website
const colorMap = {
  blue: "from-blue-400/20 via-blue-100/30 to-blue-300/25",
  red: "from-red-400/20 via-red-100/30 to-red-300/25",
  green: "from-green-400/20 via-green-100/30 to-green-300/25",
  yellow: "from-yellow-400/20 via-yellow-100/30 to-yellow-300/25",
  teal: "from-teal-400/20 via-teal-100/30 to-teal-300/25",
};

const techIcons = {
  react: <FaReact className="text-blue-500" />,
  nodejs: <FaNodeJs className="text-green-600" />,
  mongodb: <FaDatabase className="text-green-800" />,
};

const FlavorSlider = () => {
  const sliderRef = useRef();

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: `+=${scrollAmount + 1500}px`,
          scrub: true,
          pin: true,
        },
      });

      tl.to(".flavor-section", {
        x: `-${scrollAmount + 1500}px`,
        ease: "power1.inOut",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<"
      );

    // Milk splash animations
    gsap.utils.toArray(".milk-splash-card").forEach((card, index) => {
      const splashElements = card.querySelectorAll(".splash-drop");
      
      // Stagger animation for splash drops
      gsap.set(splashElements, {
        scale: 0,
        opacity: 0,
        rotation: "random(-360, 360)",
      });

      // Hover animations
      card.addEventListener("mouseenter", () => {
        gsap.to(card.querySelector(".card-content"), {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(splashElements, {
          scale: "random(0.8, 1.2)",
          opacity: "random(0.6, 0.9)",
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.7)",
        });

        gsap.to(card.querySelector(".ripple-effect"), {
          scale: 1.5,
          opacity: 0.3,
          duration: 0.6,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card.querySelector(".card-content"), {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(splashElements, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.in",
        });

        gsap.to(card.querySelector(".ripple-effect"), {
          scale: 1,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });

    // Continuous floating animation for cards
    gsap.utils.toArray(".milk-splash-card").forEach((card, index) => {
      gsap.to(card, {
        y: "random(-10, 10)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.2,
      });
    });
  });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {projectLists.map((project, index) => (
          <div
            key={project.title}
            className={`
              milk-splash-card relative z-30 lg:w-[35vw] w-80 lg:h-[55vh] md:w-[70vw] md:h-[45vh] h-72 flex-none
              rounded-3xl overflow-hidden cursor-pointer
              backdrop-blur-xl border border-amber-200/40 shadow-2xl
              transition-all duration-500 hover:shadow-3xl
              bg-gradient-to-br ${colorMap[project.color] || "from-amber-200/20 via-amber-100/30 to-amber-300/25"}
              hover:bg-gradient-to-br hover:${colorMap[project.color] || "from-amber-200/30 via-amber-100/40 to-amber-300/35"}
            `}
          >
            {/* Milk Splash Effects */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Ripple Effect */}
              <div className="ripple-effect absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-100/30 rounded-full opacity-0"></div>
              
              {/* Splash Drops */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="splash-drop absolute bg-amber-100/50 rounded-full"
                  style={{
                    width: `${Math.random() * 8 + 4}px`,
                    height: `${Math.random() * 8 + 4}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                ></div>
              ))}

              {/* Milk Swirl Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <path
                    d="M50,200 Q200,50 350,200 Q200,350 50,200"
                    fill="none"
                    stroke="#d4a574"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                  <path
                    d="M100,150 Q250,100 300,250 Q150,300 100,150"
                    fill="none"
                    stroke="#d4a574"
                    strokeWidth="1.5"
                    opacity="0.2"
                  />
                </svg>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-amber-50/10 to-amber-100/20"></div>
            </div>

            {/* Card Content */}
            <div className="card-content relative p-6 h-full flex flex-col justify-center items-center text-center z-10">
              {/* Floating Milk Droplets around title */}
              <div className="absolute -top-2 -left-2 w-3 h-3 bg-amber-200/70 rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -right-3 w-2 h-2 bg-amber-100/60 rounded-full animate-pulse delay-300"></div>
              <div className="absolute -bottom-2 left-4 w-2.5 h-2.5 bg-amber-300/60 rounded-full animate-pulse delay-500"></div>

              {/* Project Title */}
              <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight leading-tight text-amber-900 drop-shadow-lg">
                {project.title}
              </h2>

              {/* Milk Splash Divider */}
              <div className="w-16 h-1 bg-amber-300/80 rounded-full mb-4 shadow-lg"></div>

              {/* Project Description */}
              <p className="mb-6 text-lg font-medium max-w-xs text-amber-800 drop-shadow-sm">
                {project.description}
              </p>

              {/* Technologies with Milk Drop Background */}
              <div className="flex gap-4 text-2xl">
                {(project.technologies || []).map((tech) => (
                  <div
                    key={tech}
                    className="relative p-3 bg-amber-100/40 rounded-full backdrop-blur-sm border border-amber-200/50 shadow-lg hover:scale-110 transition-transform duration-300"
                  >
                    <span className="relative z-10">{techIcons[tech]}</span>
                    <div className="absolute inset-0 bg-amber-50/30 rounded-full blur-sm"></div>
                  </div>
                ))}
              </div>

              {/* Floating Bubbles */}
              <div className="absolute top-8 right-8 w-4 h-4 bg-amber-200/40 rounded-full animate-bounce"></div>
              <div className="absolute bottom-8 left-8 w-3 h-3 bg-amber-100/50 rounded-full animate-bounce delay-700"></div>
              <div className="absolute top-16 left-16 w-2 h-2 bg-amber-300/50 rounded-full animate-bounce delay-1000"></div>
            </div>

            {/* Milk Pour Effect on Hover */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0 bg-amber-200/70 rounded-b-full transition-all duration-700 hover:h-16 opacity-0 hover:opacity-100"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;