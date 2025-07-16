import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full">
        <g fill="#61DAFB">
          <circle cx="64" cy="64" r="11.4" className="react-core"/>
          <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8z" className="react-orbit-1"/>
          <path d="M92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9z" className="react-orbit-2"/>
          <path d="M64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3z" className="react-orbit-3"/>
        </g>
      </svg>
    ),
    name: "React.js",
    color: "#61DAFB",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073z" className="node-icon"/>
      </svg>
    ),
    name: "Node.js",
    color: "#83CD29",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#000" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z" className="next-icon"/>
      </svg>
    ),
    name: "Next.js",
    color: "#000000",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#fff" d="M22.67 47h99.67v73.67H22.67z"/>
        <path fill="#007acc" d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z" className="ts-icon"/>
      </svg>
    ),
    name: "TypeScript",
    color: "#007ACC",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#00618A" d="M116.948 97.807c-6.863-.187-12.104.452-16.585 2.341-1.273.537-3.305.552-3.513 2.147.7.733.809 1.829 1.365 2.731 1.07 1.73 2.876 4.052 4.488 5.268 1.762 1.33 3.577 2.751 5.465 3.902 3.358 2.047 7.107 3.217 10.34 5.268 1.906 1.21 3.799 2.733 5.658 4.097.92.675 1.537 1.724 2.732 2.147v-.194c-.628-.8-.79-1.898-1.366-2.733l-2.537-2.537c-2.48-3.292-5.629-6.184-8.976-8.585-2.669-1.916-8.642-4.504-9.755-7.609l-.195-.195c1.892-.214 4.107-.898 5.854-1.367 2.934-.786 5.556-.583 8.585-1.365l4.097-1.171v-.78c-1.531-1.571-2.623-3.651-4.292-5.073-4.37-3.72-9.138-7.437-14.048-10.537-2.724-1.718-6.089-2.835-8.976-4.292-.971-.491-2.677-.746-3.318-1.562-1.517-1.932-2.342-4.382-3.511-6.633-2.449-4.717-4.854-9.868-7.024-14.831-1.48-3.384-2.447-6.72-4.293-9.756-8.86-14.567-18.396-23.358-33.169-32-3.144-1.838-6.929-2.563-10.929-3.513-2.145-.129-4.292-.26-6.438-.391-1.311-.546-2.673-2.149-3.902-2.927C17.811 4.565 5.257-2.16 1.633 6.682c-2.289 5.581 3.421 11.025 5.462 13.854 1.434 1.982 3.269 4.207 4.293 6.438.674 1.467.79 2.938 1.367 4.489 1.417 3.822 2.652 7.98 4.487 11.511.927 1.788 1.949 3.67 3.122 5.268.718.981 1.951 1.413 2.145 2.927-1.204 1.686-1.273 4.304-1.95 6.44-3.05 9.615-1.899 21.567 2.537 28.683 1.36 2.186 4.567 6.871 8.975 5.073 3.856-1.57 2.995-6.438 4.098-10.732.249-.973.096-1.689.585-2.341v.195l3.513 7.024c2.6 4.187 7.212 8.562 11.122 11.514 2.027 1.531 3.623 4.177 6.244 5.073v-.196h-.195c-.508-.791-1.303-1.119-1.951-1.755-1.527-1.497-3.225-3.358-4.487-5.073-3.556-4.827-6.698-10.11-9.561-15.609-1.368-2.627-2.557-5.523-3.709-8.196-.444-1.03-.438-2.589-1.364-3.122-1.263 1.958-3.122 3.542-4.098 5.854-1.561 3.696-1.762 8.204-2.341 12.878-.342.122-.19.038-.391.194-2.718-.655-3.672-3.452-4.683-5.853-2.554-6.07-3.029-15.842-.781-22.829.582-1.809 3.21-7.501 2.146-9.172-.508-1.666-2.184-2.63-3.121-3.903-1.161-1.574-2.319-3.646-3.124-5.464-2.09-4.731-3.066-10.044-5.267-14.828-1.053-2.287-2.832-4.602-4.293-6.634-1.617-2.253-3.429-3.912-4.683-6.635-.446-.968-1.051-2.518-.391-3.513.21-.671.508-.951 1.171-1.17 1.132-.873 4.284.29 5.462.779 3.129 1.3 5.741 2.538 8.392 4.294 1.271.844 2.559 2.475 4.097 2.927h1.756c2.747.631 5.824.195 8.391.975 4.536 1.378 8.601 3.523 12.292 5.854 11.246 7.102 20.442 17.21 26.732 29.269 1.012 1.942 1.45 3.794 2.341 5.854 1.798 4.153 4.063 8.426 5.852 12.488 1.786 4.052 3.526 8.141 6.05 11.513 1.327 1.772 6.451 2.723 8.781 3.708 1.632.689 4.307 1.409 5.854 2.34 2.953 1.782 5.815 3.903 8.586 5.855 1.383.975 5.64 3.116 5.852 4.879z" className="mysql-icon"/>
      </svg>
    ),
    name: "MySQL",
    color: "#00618A",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#336791" d="M115.731 77.440c-13.925 2.873-14.882-1.842-14.882-1.842 14.703-21.816 20.849-49.510 15.545-56.287C101.924.823 76.875 9.566 76.457 9.793l-.135.024c-2.751-.571-5.83-.911-9.291-.967-6.301-.103-11.080 1.652-14.707 4.402 0 0-44.684-18.408-42.606 23.151.442 8.842 12.672 66.899 27.260 49.363 5.332-6.412 10.483-11.834 10.483-11.834 2.559 1.699 5.622 2.567 8.833 2.255l.250-.212c-.078.796-.042 1.575.100 2.497-3.758 4.199-2.654 4.936-10.167 6.482-7.602 1.566-3.136 4.355-.220 5.084 3.534.884 11.712 2.136 17.237-5.598l-.221.882c1.473 1.180 2.507 7.672 2.334 13.557-.174 5.885-.290 9.926.871 13.082 1.160 3.156 2.316 10.256 12.192 8.140 8.252-1.768 12.528-6.351 13.124-13.995.422-5.435 1.377-4.631 1.438-9.490l.767-2.300c.884-7.367.140-9.743 5.225-8.638l1.235.108c3.742.170 8.639-.602 11.514-1.938 6.190-2.871 9.861-7.667 3.758-6.408z" className="postgres-icon"/>
      </svg>
    ),
    name: "PostgreSQL",
    color: "#336791",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#000" d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 76 81.85 85.2 75.14 94.77c-2.4 3.42-4.92 4.91-9.4 3.7l26.92-36.13L67.6 29.71c4.31-.84 7.29-.41 9.93 3.45 5.83 8.52 12.26 16.63 18.67 25.21 6.45-8.55 12.8-16.67 18.8-25.11 2.41-3.42 5-4.72 9.33-3.46-3.28 4.35-6.49 8.63-9.72 12.88-4.36 5.73-8.64 11.53-13.16 17.14-1.61 2-1.35 3.3.09 5.19C109.9 76 118.16 87.1 126.67 98.44zM1.33 61.74c.72-3.61 1.2-7.29 2.2-10.83 6-21.43 30.6-30.34 47.5-17.06C60.93 41.64 63.39 52.62 62.9 65H7.1c-.84 22.21 15.15 35.62 35.53 28.78 7.15-2.4 11.36-8 13.47-15 1.07-3.51 2.84-4.06 6.14-3.06-1.69 8.76-5.52 16.08-13.52 20.66-12 6.86-29.13 4.64-38.14-4.89C5.26 85.89 3 78.92 2 71.39c-.15-1.2-.46-2.38-.7-3.57q.03-3.04.03-6.08zm5.87-1.49h50.43c-.33-16.06-10.33-27.47-24-27.57-15-.12-25.78 11.02-26.43 27.57z" className="express-icon"/>
      </svg>
    ),
    name: "Express.js",
    color: "#000000",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="python-original-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
          <stop offset="0" stopColor="#5A9FD4"/>
          <stop offset="1" stopColor="#306998"/>
        </linearGradient>
        <linearGradient id="python-original-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
          <stop offset="0" stopColor="#FFD43B"/>
          <stop offset="1" stopColor="#FFE873"/>
        </linearGradient>
        <path fill="url(#python-original-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" className="python-head"/>
        <path fill="url(#python-original-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521H91.682zM76.938 112.019c2.56 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" className="python-tail"/>
      </svg>
    ),
    name: "Python",
    color: "#306998",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#38bdf8" d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" className="tailwind-icon"/>
      </svg>
    ),
    name: "Tailwind CSS",
    color: "#38bdf8",
  }
];

const SmoothSkillsAnimation = () => {
  const containerRef = useRef(null);
  const skillsRefs = useRef([]);
  const titleRefs = useRef([]);

  useGSAP(() => {
    // Set initial state
    gsap.set(".skills-container", {
      opacity: 0,
      y: 100
    });

    gsap.set(".skill-item", {
      opacity: 0,
      y: 100,
      rotation: 0,
      scale: 0.8
    });

    gsap.set(".skill-title", {
      opacity: 0,
      y: 50
    });

    // Create main timeline
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Animate icons based on scroll progress
          skillsRefs.current.forEach((ref, index) => {
            if (ref) {
              const iconElement = ref.querySelector('.skill-icon svg');
              const progress = self.progress;
              
              // Rotate React atoms
              if (skills[index].name === "React.js" && iconElement) {
                gsap.set(iconElement.querySelector('.react-core'), {
                  rotation: progress * 360 * 4,
                  transformOrigin: "center"
                });
                gsap.set(iconElement.querySelector('.react-orbit-1'), {
                  rotation: progress * 360 * 2,
                  transformOrigin: "center"
                });
              }
              
              // Pulse effect for Node.js
              if (skills[index].name === "Node.js" && iconElement) {
                gsap.set(iconElement.querySelector('.node-icon'), {
                  scale: 1 + Math.sin(progress * Math.PI * 8) * 0.1,
                  transformOrigin: "center"
                });
              }
              
              // Wave effect for Python
              if (skills[index].name === "Python" && iconElement) {
                gsap.set(iconElement.querySelector('.python-head'), {
                  y: Math.sin(progress * Math.PI * 6) * 3,
                });
                gsap.set(iconElement.querySelector('.python-tail'), {
                  y: Math.cos(progress * Math.PI * 6) * 3,
                });
              }
            }
          });
        }
      }
    });

    // Animate container
    mainTl.to(".skills-container", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });

    // Animate title
    mainTl.to(".skill-title", {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    }, "-=0.3");

    // Animate skills with stagger
    mainTl.to(".skill-item", {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: (index) => [-10, 10, -5, 5, -15, 15, -8, 8, -12][index] || 0,
      duration: 0.8,
      stagger: {
        amount: 1.5,
        from: "center",
        ease: "power2.out"
      },
      ease: "back.out(1.7)"
    }, "-=0.2");

    // Create floating animation for each skill
    skills.forEach((_, index) => {
      gsap.to(`.skill-item-${index}`, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: `random(-5, 5)`,
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      });
    });

    // Individual skill hover animations
    skillsRefs.current.forEach((ref, index) => {
      if (ref) {
        const hoverTl = gsap.timeline({ paused: true });
        
        hoverTl.to(ref, {
          scale: 1.1,
          rotation: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(ref.querySelector('.skill-icon'), {
          rotation: 360,
          duration: 0.6,
          ease: "power2.inOut"
        }, "-=0.3")
        .to(ref.querySelector('.skill-name'), {
          color: '#ea580c', // Orange-600
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out"
        }, "-=0.4");

        ref.addEventListener('mouseenter', () => hoverTl.play());
        ref.addEventListener('mouseleave', () => hoverTl.reverse());
      }
    });

    // Background particle animation
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      gsap.set(particle, {
        x: `random(-50, ${window.innerWidth + 50})`,
        y: `random(-50, ${window.innerHeight + 50})`,
        opacity: 0.1,
        scale: `random(0.1, 0.3)`
      });

      gsap.to(particle, {
        y: `-=${window.innerHeight + 100}`,
        rotation: 360,
        duration: `random(10, 20)`,
        repeat: -1,
        ease: "none",
        delay: `random(0, 5)`
      });
    });

  }, []);

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 relative overflow-hidden flex items-center justify-center"
    >
      {/* Background Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-2 h-2 bg-orange-400 rounded-full opacity-20"
        />
      ))}

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-orange-200/20 to-amber-200/20"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animation: `float ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      <div className="skills-container relative z-10 max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="skill-title text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
            My Skills
          </h1>
          <div className="skill-title w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={(el) => (skillsRefs.current[index] = el)}
              className={`skill-item skill-item-${index} group cursor-pointer`}
            >
              <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-orange-200/50 shadow-2xl hover:shadow-orange-500/25 transition-all duration-300">
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${skill.color}40, transparent 70%)`
                  }}
                />
                
                {/* Icon */}
                <div className="skill-icon w-16 h-16 mx-auto mb-4 relative">
                  {skill.icon}
                  
                  {/* Rotating ring for special effects */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                    style={{ borderColor: '#ea580c' }} // Orange-600
                  />
                </div>
                
                {/* Name */}
                <h3 className="skill-name text-gray-800 text-sm font-semibold text-center group-hover:text-orange-600 transition-colors duration-300">
                  {skill.name}
                </h3>
                
                {/* Progress bar effect */}
                <div className="mt-3 h-1 bg-orange-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000 delay-500"
                    style={{ 
                      width: `${85 + Math.random() * 15}%`,
                      animation: `slideIn 2s ease-out ${index * 0.2}s both`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="skill-title text-gray-600 text-lg max-w-2xl mx-auto">
            Passionate about creating modern, scalable applications with cutting-edge technologies
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes slideIn {
          from { width: 0%; }
          to { width: var(--final-width); }
        }
        
        .skill-item {
          transform-style: preserve-3d;
        }
        
        .skill-icon svg {
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }
        
        .group:hover .skill-icon svg {
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
        }
      `}</style>
    </div>
  );
};

export default SmoothSkillsAnimation;