import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const footerRef = useRef(null);
  const headlineRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(null);

  // Initialize Three.js vibrant water effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    const geometry = new THREE.PlaneGeometry(25, 25, 120, 120);
    
    // Vibrant color-focused shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        // Bold, vibrant colors inspired by the image
        color1: { value: new THREE.Color(0xff6b35) }, // Orange
        color2: { value: new THREE.Color(0xff1744) }, // Red-pink
        color3: { value: new THREE.Color(0xffc107) }, // Yellow
        color4: { value: new THREE.Color(0x8e24aa) }, // Purple
        color5: { value: new THREE.Color(0XA26833) }  // Hot Ginger
      },
      vertexShader: `
        uniform float time;
        uniform vec2 mouse;
        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          
          // Dynamic wave patterns
          float wave1 = sin(pos.x * 0.8 + time * 1.2) * 0.4;
          float wave2 = sin(pos.y * 0.6 + time * 1.8) * 0.3;
          float wave3 = sin((pos.x + pos.y) * 0.5 + time * 2.2) * 0.25;
          float wave4 = sin(pos.x * pos.y * 0.1 + time * 1.5) * 0.2;
          
            // Enhanced bouncing mouse interaction
  float mouseDistance = distance(vec2(pos.x, pos.y), mouse * 12.0);
  float bounce1 = sin(mouseDistance * 0.4 - time * 5.0) * exp(-mouseDistance * 0.06) * 0.8;
  float bounce2 = sin(mouseDistance * 0.8 - time * 7.0) * exp(-mouseDistance * 0.1) * 0.6;
  float bounce3 = sin(mouseDistance * 1.2 - time * 9.0) * exp(-mouseDistance * 0.14) * 0.4;
  
  // Elastic bounce effect
  float elasticBounce = sin(mouseDistance * 0.2 - time * 3.0) * exp(-mouseDistance * 0.04) * 1.2;
          
          pos.z = wave1 + wave2 + wave3 + wave4 + bounce1 + bounce2 + bounce3 + elasticBounce;
          vElevation = pos.z;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec3 color4;
        uniform vec3 color5;
        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vPosition;
        
        void main() {
          // Create dynamic color zones
          float zone1 = sin(vUv.x * 3.14159 + time * 0.8) * 0.5 + 0.5;
          float zone2 = sin(vUv.y * 3.14159 + time * 1.2) * 0.5 + 0.5;
          float zone3 = sin((vUv.x + vUv.y) * 1.5 + time * 1.5) * 0.5 + 0.5;
          float elevation = (vElevation + 1.0) * 0.5;
          
          // Mix vibrant colors based on position and elevation
          vec3 color = mix(color1, color2, zone1);
          color = mix(color, color3, zone2 * 0.7);
          color = mix(color, color4, zone3 * 0.5);
          color = mix(color, color5, elevation * 0.6);
          
          // Add intensity based on wave height
          color *= (1.0 + elevation * 0.8);
          
          // Dynamic alpha for depth
          float alpha = 0.7 + vElevation * 0.3;
          alpha = clamp(alpha, 0.3, 0.9);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.25;
    mesh.position.z = -6;
    scene.add(mesh);
    meshRef.current = mesh;

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      
      if (material.uniforms) {
        material.uniforms.time.value += 0.015;
        
        // Add bouncing effect to mouse position
        const bounceX = mouseRef.current.x + Math.sin(Date.now() * 0.005) * 0.1;
        const bounceY = mouseRef.current.y + Math.cos(Date.now() * 0.003) * 0.1;
        
        material.uniforms.mouse.value.set(bounceX, bounceY);
      }
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (material.uniforms) {
        material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  // Enhanced GSAP animation with color effects
  useEffect(() => {
    if (!headlineRef.current || !footerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    const headline = headlineRef.current;
    const words = headline.textContent.split(' ');
    headline.innerHTML = words.map((word, i) => 
      `<span class="word" data-word="${i}">${word}</span>`
    ).join(' ');
    
    // Animate words with color transitions
    tl.fromTo(headline.querySelectorAll('.word'), 
      { 
        y: 120, 
        opacity: 0,
        rotationX: -90,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "elastic.out(1, 0.6)"
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const rect = footerRef.current?.getBoundingClientRect();
      if (rect) {
        // Add bouncing effect to mouse movement
        const targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const targetY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Smooth bouncing transition
        mouseRef.current.x += (targetX - mouseRef.current.x) * 0.1;
        mouseRef.current.y += (targetY - mouseRef.current.y) * 0.1;
        
        // Add some bounce oscillation
        mouseRef.current.x += Math.sin(Date.now() * 0.01) * 0.02;
        mouseRef.current.y += Math.cos(Date.now() * 0.008) * 0.02;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { 
      icon: Linkedin, 
      href: "https://linkedin.com/in/yourprofile", 
      label: "LinkedIn",
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-400"
    },
    { 
      icon: Mail, 
      href: "mailto:your.email@example.com", 
      label: "Email",
      bgColor: "bg-red-500",
      hoverColor: "hover:bg-red-400"
    },
    { 
      icon: Twitter, 
      href: "https://twitter.com/yourhandle", 
      label: "Twitter",
      bgColor: "bg-#A26833-500",
      hoverColor: "hover:bg-#A26833-400"
    }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: '#f5f5dc' }}
    >
      {/* Three.js Vibrant Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />
      
      {/* Dynamic Color Overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/15 via-transparent to-yellow-400/15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-bl from-red-400/10 via-transparent to-pink-400/10 pointer-events-none" />
      
      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Bold Colorful Headlines */}
        <div className="mb-8">
          <div className="inline-block bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-3 rounded-lg text-lg font-bold mb-4 transform -rotate-2 shadow-2xl">
            GET READY
          </div>
        </div>
        
        <h2 
          ref={headlineRef}
          className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 mb-8 leading-tight tracking-tight"
          style={{ 
            perspective: '1000px',
            textShadow: '0 0 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          LET'S WORK TOGETHER
        </h2>
        
        <div className="mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-#A26833-500 text-white px-8 py-3 rounded-lg text-lg font-bold transform rotate-1 shadow-2xl">
            INFINITELY CREATIVE
          </div>
        </div>
        
        {/* Vibrant Subtitle */}
        <p className="text-2xl md:text-3xl text-gray-800 font-semibold mb-16 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
          Ready to build something <span className="text-orange-600 font-bold">AMAZING</span>? 
          Let's create the <span className="text-red-600 font-bold">FUTURE</span> together!
        </p>
        
        {/* Colorful Social Media Icons */}
        <div className="flex justify-center items-center space-x-6 mb-16">
          {socialLinks.map(({ icon: Icon, href, label, bgColor, hoverColor }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-6 rounded-2xl ${bgColor} ${hoverColor} transition-all duration-300 hover:scale-110 hover:rotate-6 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2`}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              aria-label={label}
            >
              <Icon 
                size={36} 
                className="text-white drop-shadow-md" 
              />
              
              {/* Dynamic Tooltip */}
              <span 
                className={`absolute -top-16 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black text-white text-sm font-bold rounded-lg transition-all duration-300 ${
                  isHovered === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {label}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
              </span>
              
              {/* Glow Effect */}
              <div 
                className={`absolute inset-0 rounded-2xl bg-white/30 blur-xl transition-opacity duration-300 ${
                  isHovered === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </a>
          ))}
        </div>
        
        {/* Bold Copyright */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
          <p className="text-gray-800 font-semibold text-lg">
            © 2025 <span className="text-orange-600 font-bold">YOUR NAME</span> 
            <br />
            <span className="text-sm text-gray-600">Crafted with passion, code, and lots of ☕</span>
          </p>
        </div>
      </div>
      
      {/* Enhanced Floating Elements with Bouncing */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              i % 5 === 0 ? 'bg-yellow-400' :
              i % 5 === 1 ? 'bg-red-500' :
              i % 5 === 2 ? 'bg-blue-500' :
              i % 5 === 3 ? 'bg-green-500' : 'bg-purple-500'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `${i % 3 === 0 ? 'bounce' : i % 3 === 1 ? 'elasticBounce' : 'floatBounce'} ${1.5 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `scale(${0.8 + Math.random() * 0.4})`
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default FooterSection;