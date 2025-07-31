import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MagneticCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorTextRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorText = cursorTextRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorDotX = 0;
    let cursorDotY = 0;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // GSAP animation loop
    const animateCursor = () => {
      // Smooth cursor movement with magnetic effect
      cursorX += (mouseX - cursorX) * 0.08;
      cursorY += (mouseY - cursorY) * 0.08;
      
      // Smooth dot movement (faster)
      cursorDotX += (mouseX - cursorDotX) * 0.25;
      cursorDotY += (mouseY - cursorDotY) * 0.25;

      gsap.set(cursor, {
        x: cursorX - 20,
        y: cursorY - 20,
      });

      gsap.set(cursorDot, {
        x: cursorDotX - 4,
        y: cursorDotY - 4,
      });

      requestAnimationFrame(animateCursor);
    };

    // Handle hover effects on interactive elements
    const handleMouseEnter = (e) => {
      const target = e.target;
      
      // Check if element is interactive
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('button') || 
          target.closest('a') ||
          target.classList.contains('cursor-hover') ||
          target.closest('.cursor-hover')) {
        
        // Enhanced hover effect
        gsap.to(cursor, {
          scale: 2,
          duration: 0.4,
          ease: "back.out(1.7)",
          borderWidth: "3px"
        });
        
        gsap.to(cursorDot, {
          scale: 0.3,
          duration: 0.4,
          ease: "back.out(1.7)"
        });

        // Show text for buttons and links
        if (target.tagName === 'BUTTON' || target.closest('button') || target.tagName === 'A' || target.closest('a')) {
          const buttonText = target.textContent?.trim() || target.getAttribute('aria-label') || 'Click';
          if (cursorText) {
            cursorText.textContent = buttonText;
            gsap.to(cursorText, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      }
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        borderWidth: "2px"
      });
      
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      });

      if (cursorText) {
        gsap.to(cursorText, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    // Handle click effect
    const handleMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out"
      });
      
      gsap.to(cursorDot, {
        scale: 1.5,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
        ease: "elastic.out(1, 0.3)"
      });
      
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.2,
        ease: "elastic.out(1, 0.3)"
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Start animation
    animateCursor();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-dark-brown rounded-full pointer-events-none z-[9999] transition-transform duration-300 ease-out"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Cursor text */}
        <div
          ref={cursorTextRef}
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-bold text-milk opacity-0 whitespace-nowrap pointer-events-none bg-dark-brown px-2 py-1 rounded-md shadow-lg"
        >
          Click
        </div>
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-dark-brown rounded-full pointer-events-none z-[9999] transition-transform duration-300 ease-out"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default MagneticCursor; 