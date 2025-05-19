
import { useRef, useEffect } from 'react';
import { Particle, ParticleVariant, ParticleDensity, ParticleSpeed } from './types';
import { 
  getParticleColor, 
  particleCountMap, 
  speedFactorMap, 
  createParticles,
  drawParticleConnections,
  drawParticle 
} from './utils';

interface UseParticleAnimationProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  variant: ParticleVariant;
  density: ParticleDensity;
  speed: ParticleSpeed;
  starEffect: boolean;
  interactive: boolean;
}

export const useParticleAnimation = ({
  canvasRef,
  variant,
  density,
  speed,
  starEffect,
  interactive
}: UseParticleAnimationProps) => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const isMouseMoving = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to parent size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleCount = particleCountMap[density];
    const speedFactor = speedFactorMap[speed];
    const colors = getParticleColor(variant);
    const isNeuralNetwork = variant === 'neural';
    const connectionDistance = isNeuralNetwork ? 150 : 100;
    const connectionOpacity = isNeuralNetwork ? 0.6 : 0.2;
    const lineWidth = isNeuralNetwork ? 0.8 : 0.5;

    // Create particles with additional properties for star effect
    const particles = createParticles(
      particleCount,
      canvas.width,
      canvas.height,
      colors,
      speedFactor,
      isNeuralNetwork
    );

    // Mouse move event
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      isMouseMoving.current = true;
      
      // Reset mouse moving state after delay
      setTimeout(() => {
        isMouseMoving.current = false;
      }, 100);
    };

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // First pass: draw all connections
      drawParticleConnections(ctx, particles, connectionDistance, connectionOpacity, lineWidth);

      // Update time for animations
      const now = Date.now() / 1000;

      // Second pass: draw and update all particles
      particles.forEach((particle) => {
        // If mouse is moving and interactive, apply gentle force towards cursor
        if (isMouseMoving.current && interactive) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) { // Cursor influence radius
            const force = isNeuralNetwork ? 0.15 : 0.1;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        // Apply velocity limits
        const maxVelocity = 0.7 * speedFactor;
        particle.vx = Math.max(Math.min(particle.vx, maxVelocity), -maxVelocity);
        particle.vy = Math.max(Math.min(particle.vy, maxVelocity), -maxVelocity);
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Apply star effect (twinkling/pulsing)
        if (starEffect) {
          // Calculate pulsing based on sine wave
          const pulse = Math.sin(now * particle.twinkleSpeed + particle.pulsePhase);
          particle.radius = particle.baseRadius * (1 + pulse * 0.5);
          
          // Opacity also fluctuates slightly
          particle.opacity = 0.5 + Math.abs(pulse) * 0.5;
        }

        // Draw particle
        drawParticle(ctx, particle, isNeuralNetwork, starEffect);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [variant, density, speed, interactive, starEffect]);
};
