import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import EagleAnimation from "../components/EagleAnimation";


const HeroSection = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 1,
    });

    // Circle mask animation first
    tl.to(".hero-circle-mask", {
      duration: 1.5,
      scale: 1,
      ease: "power2.out",
    })
      // Only show content after circle mask completes
      .to(".hero-content", {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
      })
      .to(
        ".hero-text-scroll",
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.5"
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      );

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "1% top",
        end: "bottom top",
        scrub: true,
      },
    });
    heroTl.to(".hero-container", {
      rotate: 7,
      scale: 0.9,
      yPercent: 30,
      ease: "power1.inOut",
    });
  });

  return (
    <section className="bg-amber-700 relative overflow-hidden">
      <div className="hero-container">
        {/* Eagle Animation */}
        <EagleAnimation />
        
        {/* Circle mask overlay */}
        <div 
          className="hero-circle-mask"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100vw",
            height: "100vw",
            background: "#eacaa6",
            borderRadius: "50%",
            transform: "translate(-50%, -50%) scale(0)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
       
        <div className="hero-content opacity-0" style={{ zIndex: 20 }}>
          <div className="overflow-hidden">
            <h1 className="hero-title">Hi I'm</h1>
          </div>
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1> SURESH </h1>
            </div>
          </div>

          <h2>
          A passionate Full-Stack Developer crafting digital experiences with modern technologies and creative solutions.
          </h2>

          <div className="hero-button cursor-hover">
            <p>Get my CV</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
