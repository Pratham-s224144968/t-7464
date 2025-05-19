
import { ParticleVariant, ParticleDensity, ParticleSpeed, Particle } from './types';

export const getParticleColor = (variant: ParticleVariant): string[] => {
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
    case 'neural':
      return [
        'rgba(59, 130, 246, 0.8)', 
        'rgba(96, 165, 250, 0.7)',
        'rgba(147, 197, 253, 0.6)'
      ];
    default:
      return ['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.3)'];
  }
};

export const particleCountMap: Record<ParticleDensity, number> = { 
  low: 40, 
  medium: 70, 
  high: 120 
};

export const speedFactorMap: Record<ParticleSpeed, number> = { 
  slow: 0.3, 
  normal: 0.7, 
  fast: 1.5 
};

export const createParticles = (
  count: number, 
  canvasWidth: number, 
  canvasHeight: number, 
  colors: string[], 
  speedFactor: number, 
  isNeuralNetwork: boolean
): Particle[] => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    radius: Math.random() * 2 + (isNeuralNetwork ? 1.5 : 1),
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * speedFactor,
    vy: (Math.random() - 0.5) * speedFactor,
    opacity: Math.random() * 0.5 + 0.5,
    twinkleSpeed: Math.random() * 0.02 + 0.01,
    twinkleDirection: Math.random() > 0.5 ? 1 : -1,
    baseRadius: Math.random() * 2 + (isNeuralNetwork ? 1.5 : 1),
    pulsePhase: Math.random() * Math.PI * 2
  }));
};

export const drawParticleConnections = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  connectionDistance: number,
  connectionOpacity: number,
  lineWidth: number
) => {
  for (let i = 0; i < particles.length; i++) {
    const particle1 = particles[i];
    
    for (let j = i + 1; j < particles.length; j++) {
      const particle2 = particles[j];
      const dx = particle1.x - particle2.x;
      const dy = particle1.y - particle2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < connectionDistance) {
        ctx.beginPath();
        ctx.strokeStyle = particle1.color.replace('0.8', `${connectionOpacity * (1 - dist / connectionDistance)}`);
        ctx.lineWidth = lineWidth;
        ctx.moveTo(particle1.x, particle1.y);
        ctx.lineTo(particle2.x, particle2.y);
        ctx.stroke();
      }
    }
  }
};

export const drawParticle = (
  ctx: CanvasRenderingContext2D,
  particle: Particle,
  isNeuralNetwork: boolean,
  starEffect: boolean
) => {
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
  
  // Use opacity for twinkling effect
  const particleColor = particle.color.replace(
    /rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/,
    `rgba($1, $2, $3, ${particle.opacity})`
  );
  
  ctx.fillStyle = particleColor;
  ctx.fill();
  
  // Add glow effect for neural network style and stars
  if (isNeuralNetwork || starEffect) {
    const glowRadius = starEffect ? particle.radius * 3 : particle.radius * 2;
    const glowOpacity = starEffect ? particle.opacity * 0.2 : 0.1;
    
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color.replace('0.8', `${glowOpacity}`);
    ctx.fill();
  }
};
