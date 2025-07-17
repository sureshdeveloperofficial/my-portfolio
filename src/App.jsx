import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import MessageSection from "./sections/MessageSection";
import FlavorSection from "./sections/FlavorSection";
import { useGSAP } from "@gsap/react";
import NutritionSection from "./sections/NutritionSection";
import BenefitSection from "./sections/BenefitSection";
import SmoothSkillsAnimation from "./sections/SmoothSkillsAnimation";
import FooterSection from "./sections/FooterSection";
import Experience from "./sections/Experience";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  return (
    <main>
      <NavBar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <MessageSection />
          <BenefitSection />
          <FlavorSection />
          {/* <NutritionSection /> */}
          <SmoothSkillsAnimation />
          <Experience />
          <FooterSection />
        </div>
      </div>
    </main>
  );
};

export default App;
