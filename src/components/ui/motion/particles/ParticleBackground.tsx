
import React, { useRef } from 'react';
import { motion } from '@/components/ui/motion';
import { ParticleProps } from './types';
import { useParticleAnimation } from './useParticleAnimation';

const ParticleBackground: React.FC<ParticleProps> = ({ 
  variant = 'default', 
  density = 'medium',
  speed = 'normal',
  starEffect = false,
  interactive = true,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Use our custom hook to handle the particle animation
  useParticleAnimation({
    canvasRef,
    variant,
    density,
    speed,
    starEffect,
    interactive
  });

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
