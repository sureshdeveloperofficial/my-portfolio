import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import {
  SiReact,
  SiVite,
  SiTailwindcss,
  SiGithub,
  SiGreensock,
  SiNodedotjs,
  SiFirebase,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const defaultProjects = [
  {
    image: "/images/p1.png",
    title: "Interactive Landing Page",
    category: "Frontend",
    description:
      "A highly-animated landing experience using GSAP timelines, ScrollTrigger scenes, and smooth parallax effects.",
    tech: [SiReact, SiVite, SiTailwindcss, SiGreensock],
    demo: "#",
    github: "#",
  },
  {
    image: "/images/p2.png",
    title: "Portfolio Grid",
    category: "UI",
    description:
      "Responsive project grid with hover tilt, staggered entrances, and accessible keyboard focus states.",
    tech: [SiReact, SiTailwindcss, SiGithub],
    demo: "#",
    github: "#",
  },
  {
    image: "/images/p3.png",
    title: "Realtime Dashboard",
    category: "Fullstack",
    description:
      "Realtime KPI dashboard backed by Firebase with smooth transitions and shared element animations.",
    tech: [SiReact, SiTailwindcss, SiFirebase],
    demo: "#",
    github: "#",
  },
  {
    image: "/images/p4.png",
    title: "Node API Starter",
    category: "Backend",
    description:
      "Opinionated starter API with auth, validation, and DX niceties. Frontend hooks in via React Query.",
    tech: [SiNodedotjs, SiReact, SiTailwindcss],
    demo: "#",
    github: "#",
  },
];

const MyProjects = ({ projects: incomingProjects }) => {
  const data = incomingProjects?.length ? incomingProjects : defaultProjects;
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const progressRef = useRef(null);
  const hoverTLRef = useRef(new Map());

  const categories = useMemo(() => {
    const set = new Set(["All"]);
    data.forEach((p) => p.category && set.add(p.category));
    return Array.from(set);
  }, [data]);

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return data;
    return data.filter((p) => p.category === activeCategory);
  }, [data, activeCategory]);

  useGSAP(
    () => {
      const section = sectionRef.current;

      // Elastic, scroll-triggered title entrance with forward/backward behavior
      const titleEl = section.querySelector(".projects-title");
      if (titleEl) {
        gsap
          .timeline({
            defaults: { duration: 1.2, ease: "elastic.out(1, 0.5)" },
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          })
          .fromTo(
            titleEl,
            {
              opacity: 0,
              y: 70,
              scaleY: 0.85,
              scaleX: 1.08,
              skewY: 6,
              transformOrigin: "center bottom",
              letterSpacing: "0.08em",
            },
            {
              opacity: 1,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              skewY: 0,
              letterSpacing: "0em",
            }
          );
      }

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      });

      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [filtered.length] }
  );

  useGSAP(
    () => {
      // Build hover timelines for each card
      hoverTLRef.current.clear();
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const icons = card.querySelectorAll(".tech-icon");
        const shine = card.querySelector(".shine");

        gsap.set(shine, { xPercent: -140, opacity: 0 });

        const tl = gsap
          .timeline({ paused: true })
          .to(
            card,
            {
              scale: 1.02,
              boxShadow: "0 16px 50px rgba(0,0,0,0.18)",
              duration: 0.35,
              ease: "power3.out",
            },
            0
          )
          .fromTo(
            icons,
            { y: 6, rotate: -8, scale: 0.9 },
            { y: 0, rotate: 0, scale: 1, stagger: 0.05, duration: 0.35, ease: "power3.out" },
            0.05
          )
          .to(
            shine,
            { xPercent: 140, opacity: 1, duration: 0.7, ease: "power2.out" },
            0.05
          )
          .to(shine, { opacity: 0, duration: 0.2 }, ">-");

        hoverTLRef.current.set(card, tl);
      });
    },
    { scope: sectionRef, dependencies: [filtered.length] }
  );

  const handleEnter = (index) => {
    const card = cardsRef.current[index];
    const tl = hoverTLRef.current.get(card);
    tl && tl.play();
  };

  const handleLeave = (index) => {
    const card = cardsRef.current[index];
    const tl = hoverTLRef.current.get(card);
    tl && tl.reverse();
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-milk text-dark-brown w-full py-20 md:py-28"
      aria-label="My Projects"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
          <h2 className="projects-title general-title md:leading-none">My Projects</h2>
        </div>

        <div className="h-1 w-full bg-[#e8ddca] rounded-full overflow-hidden mb-8">
          <div ref={progressRef} className="h-full w-full bg-[#a26833] origin-left scale-x-0" />
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategory(c)}
              aria-pressed={activeCategory === c}
              className={`px-4 py-2 rounded-full border transition-colors text-sm md:text-base focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-dark-brown/20 ${
                activeCategory === c
                  ? "bg-mid-brown text-[#fce1cd] border-mid-brown"
                  : "bg-[#ffffffcc] text-dark-brown border-[#e8ddca] hover:bg-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((project, index) => (
            <article
              key={project.title}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={() => handleLeave(index)}
              onFocusCapture={() => handleEnter(index)}
              onBlurCapture={() => handleLeave(index)}
              className="group relative bg-[#fdebd2] border-[.5vw] border-[#e8ddca] rounded-3xl md:rounded-[2vw] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-[box-shadow,transform] will-change-transform"
            >
              <span
                aria-hidden="true"
                className="shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent rotate-12 opacity-0"
              />
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="w-full aspect-[16/10] object-cover transform-gpu transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />
              </div>

              <div className="p-5 md:p-6 flex flex-col gap-4">
                <header>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {project.title}
                  </h3>
                </header>

                <p className="font-paragraph text-[#865720] leading-relaxed">
                  {project.description}
                </p>

                <ul
                  className="flex flex-wrap items-center gap-2 pt-1 text-[#865720]"
                  aria-label="Technologies used"
                >
                  {project.tech.map((Icon, i) => (
                    <li
                      key={`${project.title}-tech-${i}`}
                      className="size-9 md:size-10 flex-center rounded-full bg-[#ffffffcc] border border-[#e8ddca] shadow-sm"
                      title={Icon.name.replace("Si", "")}
                    >
                      <Icon className="tech-icon size-5 md:size-6" />
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 md:gap-4 pt-2">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="cursor-pointer hero-button !bg-mid-brown !text-[#fce1cd] !py-2.5 !px-6 !text-base !rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-dark-brown/20"
                    aria-label={`${project.title} live demo`}
                  >
                    Live Demo
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="cursor-pointer hero-button !bg-light-brown !text-dark-brown !py-2.5 !px-6 !text-base !rounded-full flex items-center gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-dark-brown/20"
                    aria-label={`${project.title} GitHub repository`}
                  >
                    <SiGithub className="size-5" /> GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyProjects;


