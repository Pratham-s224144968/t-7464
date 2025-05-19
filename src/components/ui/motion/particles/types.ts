
export interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleDirection: number;
  baseRadius: number;
  pulsePhase: number;
}

export type ParticleVariant = 'default' | 'blue' | 'purple' | 'cyber' | 'neural';
export type ParticleDensity = 'low' | 'medium' | 'high';
export type ParticleSpeed = 'slow' | 'normal' | 'fast';

export interface ParticleProps {
  variant?: ParticleVariant;
  density?: ParticleDensity;
  speed?: ParticleSpeed;
  starEffect?: boolean;
  interactive?: boolean;
  className?: string;
}
