
import React, { useRef, useEffect } from 'react';
import { motion } from '@/components/ui/motion';

interface ParticleProps {
  variant?: 'default' | 'blue' | 'purple' | 'cyber';
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'normal' | 'fast';
  interactive?: boolean;
  className?: string;
}

const ParticleBackground: React.FC<ParticleProps> = ({ 
  variant = 'default', 
  density = 'medium',
  speed = 'normal',
  interactive = true,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const isMouseMoving = useRef(false);
  const particleCountMap = { low: 25, medium: 50, high: 100 };
  const speedFactorMap = { slow: 0.5, normal: 1, fast: 2 };
  
  const getParticleColor = () => {
    switch(variant) {
      case 'blue':
        return ['rgba(59, 130, 246, 0.8)', 'rgba(37, 99, 235, 0.7)', 'rgba(96, 165, 250, 0.6)'];
      case 'purple':
        return ['rgba(139, 92, 246, 0.8)', 'rgba(124, 58, 237, 0.7)', 'rgba(167, 139, 250, 0.6)'];
      case 'cyber':
        return [
          'rgba(59, 130, 246, 0.8)', 
          'rgba(139, 92, 246, 0.7)', 
          'rgba(236, 72, 153, 0.6)', 
          'rgba(16, 185, 129, 0.6)'
        ];
      default:
        return ['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.3)'];
    }
  };

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
    const colors = getParticleColor();

    // Create particles
    const particles = Array.from({ length: particleCount }, () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * speedFactor,
        vy: (Math.random() - 0.5) * speedFactor,
        opacity: Math.random() * 0.5 + 0.5
      };
    });

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
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // If mouse is moving and interactive, apply gentle force towards cursor
        if (isMouseMoving.current && interactive) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) { // Cursor influence radius
            const force = 0.1; 
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

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Connect nearby particles with lines
        particles.forEach((p2) => {
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) { // Connection distance threshold
            ctx.beginPath();
            ctx.strokeStyle = particle.color.replace('0.8', `${0.2 * (1 - dist / 100)}`);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [variant, density, speed, interactive]);

  return (
    <motion.div 
      className={`absolute inset-0 overflow-hidden -z-10 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
    </motion.div>
  );
};

export default ParticleBackground;
