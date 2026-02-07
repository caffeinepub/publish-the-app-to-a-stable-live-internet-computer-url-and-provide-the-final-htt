import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function CelebrationLayer() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        size: Math.random() * 20 + 20,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 0.5,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-fall"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          <Heart
            className="fill-valentine-primary text-valentine-primary opacity-80"
            style={{ width: particle.size, height: particle.size }}
          />
        </div>
      ))}
    </div>
  );
}
