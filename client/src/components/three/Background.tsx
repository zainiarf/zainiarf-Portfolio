import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize Three.js scene
    const initThree = () => {
      // Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      // Camera
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 50;
      cameraRef.current = camera;
      
      // Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
      rendererRef.current = renderer;
      
      // Create particles
      createParticles();
      
      // Start animation loop
      animate();
    };
    
    // Create particles for the background
    const createParticles = () => {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1000;
      
      // Create positions for particles
      const positions = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;     // x
        positions[i + 1] = (Math.random() - 0.5) * 100; // y
        positions[i + 2] = (Math.random() - 0.5) * 100; // z
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      // Material with custom color and size
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: 0x64FFDA,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      });
      
      // Create points
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      sceneRef.current?.add(particles);
      particlesRef.current = particles;
    };
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) return;
      
      // Rotate particles slowly for ambient movement
      particlesRef.current.rotation.x += 0.0003;
      particlesRef.current.rotation.y += 0.0005;
      
      // Render the scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      // Call animate again on the next frame
      requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      // Update camera aspect ratio
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      
      // Update renderer size
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Handle mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!particlesRef.current) return;
      
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(particlesRef.current.rotation, {
        x: mouseY * 0.1,
        y: mouseX * 0.1,
        duration: 2,
      });
    };
    
    // Initialize Three.js
    initThree();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Dispose of Three.js resources
      if (particlesRef.current) {
        if (particlesRef.current.geometry) particlesRef.current.geometry.dispose();
        if (particlesRef.current.material) {
          (particlesRef.current.material as THREE.Material).dispose();
        }
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="bg-canvas" 
      className="fixed top-0 left-0 w-full h-full z-[-1]"
    />
  );
};

export default Background;
