import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const EagleAnimation = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const eagleRef = useRef(null);
  const animationMixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    try {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup - adjusted for better view
      const camera = new THREE.PerspectiveCamera(
        60, // Reduced FOV for better perspective
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 3, 10); // Moved camera back and up for better eagle view

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;

      mountRef.current.appendChild(renderer.domElement);

      // Enhanced lighting for dramatic effect
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Increased ambient light
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8); // Increased intensity
      directionalLight.position.set(10, 10, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      scene.add(directionalLight);

      // Add warm rim light for dramatic effect
      const rimLight = new THREE.DirectionalLight(0xffa500, 1.0); // Increased intensity
      rimLight.position.set(-10, 5, -5);
      scene.add(rimLight);

      // Add a subtle point light that follows the eagle
      const pointLight = new THREE.PointLight(0xffffff, 0.5, 20);
      pointLight.position.set(0, 5, 0);
      scene.add(pointLight);

      // Fallback eagle creation function (in case model fails to load)
      const createFallbackEagle = () => {
        const eagleGroup = new THREE.Group();
        
        // Create eagle body
        const bodyGeometry = new THREE.ConeGeometry(0.5, 2, 8);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.rotation.x = Math.PI / 2;
        eagleGroup.add(body);
        
        // Create wings
        const wingGeometry = new THREE.PlaneGeometry(3, 1.5);
        const wingMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
        
        const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
        leftWing.position.set(-1.5, 0, 0);
        leftWing.rotation.z = Math.PI / 4;
        eagleGroup.add(leftWing);
        
        const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
        rightWing.position.set(1.5, 0, 0);
        rightWing.rotation.z = -Math.PI / 4;
        eagleGroup.add(rightWing);
        
        // Create head
        const headGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        const headMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 1.5, 0);
        eagleGroup.add(head);
        
        eagleGroup.scale.set(0.8, 0.8, 0.8);
        eagleGroup.position.set(-8, 3, 0);
        
        eagleRef.current = eagleGroup;
        scene.add(eagleGroup);
        
        // Start flying animation
        animateEagle();
      };

      // Load the actual eagle model
      const loader = new GLTFLoader();
      loader.load(
        '/models/eagle.glb',
        (gltf) => {
          const eagle = gltf.scene;
          eagleRef.current = eagle;
          
          // Scale and position the eagle - adjusted for circular flight
          eagle.scale.set(1.2, 1.2, 1.2);
          eagle.position.set(0, 4, 0); // Start at center for circular motion
          
          // Enable shadows
          eagle.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add(eagle);

          // Setup animation mixer for the model's built-in animations
          if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(eagle);
            animationMixerRef.current = mixer;
            
            // Play all animations
            gltf.animations.forEach((clip) => {
              mixer.clipAction(clip).play();
            });
          }

          // Start flying animation
          animateEagle();
        },
        (progress) => {
          // Loading progress (optional)
        },
        (error) => {
          console.error('Error loading eagle model:', error);
          // Create fallback eagle if model fails to load
          createFallbackEagle();
        }
      );

      // Circular flying animation
      const animateEagle = () => {
        if (!eagleRef.current) return;

        const eagle = eagleRef.current;
        const time = Date.now() * 0.001;
        
        // Circular flight pattern - stays within hero section boundaries
        const radius = 8; // Radius of the circle
        const centerX = 0;
        const centerY = 4; // Keep eagle at consistent height
        const centerZ = 0;
        
        // Smooth circular motion
        eagle.position.x = centerX + Math.cos(time * 0.3) * radius;
        eagle.position.y = centerY + Math.sin(time * 0.6) * 1; // Gentle vertical variation
        eagle.position.z = centerZ + Math.sin(time * 0.3) * 2; // Slight depth variation
        
        // Realistic eagle rotation based on circular movement
        eagle.rotation.y = Math.atan2(
          Math.cos(time * 0.3 + Math.PI/2), 
          Math.sin(time * 0.3 + Math.PI/2)
        ); // Eagle faces direction of travel
        eagle.rotation.z = Math.sin(time * 0.6) * 0.05; // Slight roll
        eagle.rotation.x = Math.cos(time * 0.3) * 0.03; // Slight pitch
        
        // Wing flapping animation for fallback eagle (only if it's the geometric version)
        if (eagle.children.length > 0 && eagle.children[1] && eagle.children[1].geometry) {
          eagle.children.forEach((child, index) => {
            if (index === 1 || index === 2) { // Wings
              child.rotation.z = Math.sin(time * 6) * 0.2 + (index === 1 ? Math.PI / 4 : -Math.PI / 4);
            }
          });
        }
      };

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Update animation mixer for GLB model animations
        if (animationMixerRef.current) {
          const delta = clockRef.current.getDelta();
          animationMixerRef.current.update(delta);
        }

        // Update eagle position
        animateEagle();

        // Animate point light to follow eagle
        if (eagleRef.current && pointLight) {
          pointLight.position.x = eagleRef.current.position.x;
          pointLight.position.y = eagleRef.current.position.y + 2;
          pointLight.position.z = eagleRef.current.position.z;
        }

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (error) {
      console.error('Error in Eagle Animation setup:', error);
    }
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 15 // Increased z-index to be above other elements
      }}
    />
  );
};

export default EagleAnimation; 