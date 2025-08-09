import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const EagleAnimation = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const eagleRef = useRef(null);
  const animationMixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const animationIdRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!mountRef.current || isInitialized) {
      return;
    }

    let scene, camera, renderer, pointLight;

    const initializeScene = () => {
      try {
        // Scene setup
        scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera setup - adjusted for better view
        camera = new THREE.PerspectiveCamera(
          75, // Increased FOV for better visibility
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.set(0, 2, 8); // Moved camera closer and lower
        camera.lookAt(0, 3, 0);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({ 
          alpha: true,
          antialias: true 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        rendererRef.current = renderer;

        // Ensure the canvas overlays properly within the hero container
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.pointerEvents = 'none';

        mountRef.current.appendChild(renderer.domElement);

        // Enhanced lighting for dramatic effect
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Increased ambient light
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0); // Increased intensity
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);

        // Add warm rim light for dramatic effect
        const rimLight = new THREE.DirectionalLight(0xffa500, 1.2); // Increased intensity
        rimLight.position.set(-10, 5, -5);
        scene.add(rimLight);

        // Add a subtle point light that follows the eagle
        pointLight = new THREE.PointLight(0xffffff, 0.8, 20); // Increased intensity
        pointLight.position.set(0, 5, 0);
        scene.add(pointLight);

        return true;
      } catch (error) {
        console.error('Error initializing scene:', error);
        return false;
      }
    };

    // Fallback eagle creation function
    const createFallbackEagle = () => {
      try {
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
        
        eagleGroup.scale.set(1.0, 1.0, 1.0); // Increased scale
        eagleGroup.position.set(-6, 3, 0); // Start position for better visibility
        
        eagleRef.current = eagleGroup;
        scene.add(eagleGroup);
        
        console.log('Fallback eagle created successfully at position:', eagleGroup.position);
        return true;
      } catch (error) {
        console.error('Error creating fallback eagle:', error);
        return false;
      }
    };

    // Enhanced flying animation with more visible movement
    const animateEagle = () => {
      if (!eagleRef.current) {
        console.log('No eagle reference found');
        return;
      }

      const eagle = eagleRef.current;
      const time = Date.now() * 0.001;
      
      // More dramatic flight pattern - figure-8 pattern for better visibility
      const radiusX = 6; // Horizontal radius
      const radiusY = 2; // Vertical radius
      const centerX = 0;
      const centerY = 3; // Lower center for better visibility
      const centerZ = 0;
      
      // Figure-8 motion for more interesting flight
      eagle.position.x = centerX + Math.sin(time * 0.5) * radiusX;
      eagle.position.y = centerY + Math.sin(time * 1.0) * radiusY;
      eagle.position.z = centerZ + Math.cos(time * 0.5) * 1; // Slight depth variation
      
      // Realistic eagle rotation based on movement direction
      const speed = 0.5;
      const nextX = centerX + Math.sin((time + 0.1) * speed) * radiusX;
      const nextY = centerY + Math.sin((time + 0.1) * 1.0) * radiusY;
      
      // Calculate direction vector
      const dirX = nextX - eagle.position.x;
      const dirY = nextY - eagle.position.y;
      
      // Rotate eagle to face direction of travel
      eagle.rotation.y = Math.atan2(dirX, Math.abs(dirY));
      
      // Add realistic tilting based on vertical movement
      eagle.rotation.z = Math.sin(time * 1.0) * 0.1; // Gentle roll
      eagle.rotation.x = Math.cos(time * 0.5) * 0.05; // Slight pitch
      
      // Wing flapping animation for fallback eagle
      if (eagle.children.length > 0 && eagle.children[1] && eagle.children[1].geometry) {
        eagle.children.forEach((child, index) => {
          if (index === 1 || index === 2) { // Wings
            const flapSpeed = 8;
            const flapAmount = 0.3;
            child.rotation.z = Math.sin(time * flapSpeed) * flapAmount + (index === 1 ? Math.PI / 4 : -Math.PI / 4);
          }
        });
      }
      
      // Debug logging every 2 seconds
      if (Math.floor(time * 2) % 2 === 0 && Math.floor(time * 10) % 10 === 0) {
        console.log('Eagle position:', eagle.position, 'Rotation:', eagle.rotation);
      }
    };

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

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

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    // Load eagle model with timeout
    const loadEagleModel = () => {
      return new Promise((resolve) => {
        const loader = new GLTFLoader();
        const timeout = setTimeout(() => {
          console.log('Model loading timeout, using fallback eagle');
          resolve(false);
        }, 3000); // Reduced timeout to 3 seconds

        loader.load(
          '/models/eagle.glb',
          (gltf) => {
            clearTimeout(timeout);
            try {
              const eagle = gltf.scene;
              eagleRef.current = eagle;
              
              eagle.scale.set(1.5, 1.5, 1.5); // Increased scale
              eagle.position.set(-6, 3, 0); // Start position for better visibility
              
              eagle.traverse((child) => {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
              });

              scene.add(eagle);

              if (gltf.animations && gltf.animations.length > 0) {
                const mixer = new THREE.AnimationMixer(eagle);
                animationMixerRef.current = mixer;
                
                gltf.animations.forEach((clip) => {
                  mixer.clipAction(clip).play();
                });
              }

              console.log('Eagle model loaded successfully at position:', eagle.position);
              resolve(true);
            } catch (error) {
              console.error('Error setting up eagle model:', error);
              resolve(false);
            }
          },
          (progress) => {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
          },
          (error) => {
            clearTimeout(timeout);
            console.error('Error loading eagle model:', error);
            resolve(false);
          }
        );
      });
    };

    // Main initialization
    const initialize = async () => {
      console.log('Starting eagle animation initialization...');
      
      if (!initializeScene()) {
        console.error('Failed to initialize scene');
        return;
      }

      // Try to load the model, fallback to geometric eagle if it fails
      const modelLoaded = await loadEagleModel();
      if (!modelLoaded) {
        console.log('Model failed to load, creating fallback eagle...');
        if (!createFallbackEagle()) {
          console.error('Failed to create any eagle');
          return;
        }
      }

      // Start animation loop
      console.log('Starting animation loop...');
      // Use WebGLRenderer's animation loop for more robust timing
      if (renderer) {
        renderer.setAnimationLoop(() => {
          animate();
        });
      } else {
        animate();
      }
      setIsInitialized(true);
      console.log('Eagle animation initialized successfully');
    };

    // Handle window resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Start initialization
    initialize();

    // Cleanup
    return () => {
      console.log('Cleaning up eagle animation...');
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (renderer) {
        // Stop the renderer's animation loop if active
        renderer.setAnimationLoop(null);
      }
      
      if (mountRef.current && renderer && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      if (renderer) {
        renderer.dispose();
      }
      
      if (animationMixerRef.current) {
        animationMixerRef.current.stopAllAction();
      }
      
      setIsInitialized(false);
    };
  }, [isInitialized]);

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
        zIndex: 15
      }}
    />
  );
};

export default EagleAnimation; 