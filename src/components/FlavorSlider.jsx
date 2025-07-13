import { useGSAP } from "@gsap/react";
import { projectLists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa"; // import more as needed

// Map your color names to actual color codes or Tailwind classes
const colorMap = {
  blue: "from-blue-400 via-blue-300 to-blue-500",
  red: "from-red-400 via-red-300 to-red-500",
  green: "from-green-400 via-green-300 to-green-500",
  yellow: "from-yellow-400 via-yellow-300 to-yellow-500",
  teal: "from-teal-400 via-teal-300 to-teal-500",
};

const techIcons = {
  react: <FaReact className="text-blue-500" />,
  nodejs: <FaNodeJs className="text-green-600" />,
  mongodb: <FaDatabase className="text-green-800" />,
  // add more mappings as needed
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
  });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {projectLists.map((project) => (
          <div
            key={project.title}
            className={`
              relative z-30 lg:w-[35vw] w-80 lg:h-[55vh] md:w-[70vw] md:h-[45vh] h-72 flex-none
              rounded-3xl overflow-hidden
              bg-mid-brown/80 backdrop-blur-md border border-white/20 shadow-2xl
              hover:bg-mid-brown/90 transition-all duration-300
              ${colorMap[project.color] || "from-amber-600 via-amber-600 to-amber-600"}
            `}
          >
            <div className="relative p-6 h-full flex flex-col justify-center items-center text-center">
              {/* Project Title - Big, Stylish, Centered */}
              <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight leading-tight text-dark-brown-600">
                {project.title}
              </h2>
              {/* Project Description */}
              <p className="mb-4 text-lg font-medium max-w-xs text-amber-100">{project.description}</p>
              {/* Technologies */}
              <div className="flex gap-3 text-2xl">
                {(project.technologies || []).map((tech) => (
                  <span key={tech}>{techIcons[tech]}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;
