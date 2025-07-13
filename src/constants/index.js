  const flavorlists = [
  {
    name: "Dickman Discovery",
    color: "brown",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    name: "Onroadz",
    color: "red",
    rotation: "md:rotate-[8deg] rotate-0",
  },
  {
    name: "OneTouch",
    color: "blue",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    name: "Driving School",
    color: "orange",
    rotation: "md:rotate-[8deg] rotate-0",
  },
  {
    name: "Easy Field Services",
    color: "white",
    rotation: "md:rotate-[-8deg] rotate-0",
  },
  {
    name: "Talkpay",
    color: "black",
    rotation: "md:rotate-[8deg] rotate-0",
  },
];

const nutrientLists = [
  { label: "Potassium", amount: "245mg" },
  { label: "Calcium", amount: "500mg" },
  { label: "Vitamin A", amount: "176mcg" },
  { label: "Vitamin D", amount: "5mcg" },
  { label: "Iron", amount: "1mg" },
];

const cards = [
  {
    src: "/videos/f1.mp4",
    rotation: "rotate-z-[-10deg]",
    name: "Madison",
    img: "/images/p1.png",
    translation: "translate-y-[-5%]",
  },
  {
    src: "/videos/f2.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Alexander",
    img: "/images/p2.png",
  },
  {
    src: "/videos/f3.mp4",
    rotation: "rotate-z-[-4deg]",
    name: "Andrew",
    img: "/images/p3.png",
    translation: "translate-y-[-5%]",
  },
  {
    src: "/videos/f4.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Bryan",
    img: "/images/p4.png",
    translation: "translate-y-[5%]",
  },
  {
    src: "/videos/f5.mp4",
    rotation: "rotate-z-[-10deg]",
    name: "Chris",
    img: "/images/p5.png",
  },
  {
    src: "/videos/f6.mp4",
    rotation: "rotate-z-[4deg]",
    name: "Devante",
    img: "/images/p6.png",
    translation: "translate-y-[5%]",
  },
  {
    src: "/videos/f7.mp4",
    rotation: "rotate-z-[-3deg]",
    name: "Melisa",
    img: "/images/p7.png",
    translation: "translate-y-[10%]",
  },
];

export const projectLists = [
  {
    id: 1,
    title: "Dickman Discovery",
    description: "A full-stack e-commerce platform built with modern technologies. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.",
    technologies: ["react", "nodejs", "mongodb", "express", "stripe"],
    image: "/images/p1.png",
    color: "blue"
  },
  {
    id: 2,
    title: "Onroadz",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["react", "firebase", "typescript", "tailwind"],
    image: "/images/p2.png",
    color: "red"
  },
  {
    id: 3,
    title: "OneTouch",
    description: "Analytics dashboard for social media management with data visualization, scheduling tools, and performance metrics.",
    technologies: ["react", "d3", "nodejs", "postgresql"],
    image: "/images/p3.png",
    color: "green"
  },
  {
    id: 4,
    title: "Driving School",
    description: "Real-time weather application with location-based forecasts, interactive maps, and weather alerts.",
    technologies: ["react", "openweather", "leaflet", "axios"],
    image: "/images/p4.png",
    color: "blue"
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Modern portfolio website with smooth animations, responsive design, and interactive project showcases.",
    technologies: ["react", "gsap", "framer-motion", "sass"],
    image: "/images/p5.png",
    color: "yellow"
  },
  {
    id: 6,
    title: "Chat Application",
    description: "Real-time chat application with message encryption, file sharing, and group chat functionality.",
    technologies: ["react", "socket.io", "nodejs", "mongodb"],
    image: "p6.png",
    color: "teal"
  }
];

export { flavorlists, nutrientLists, cards };
