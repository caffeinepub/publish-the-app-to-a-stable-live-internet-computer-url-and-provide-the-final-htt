import { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'sparkle';
}

interface AmbientBackgroundProps {
  enabled: boolean;
}

export function AmbientBackground({ enabled }: AmbientBackgroundProps) {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    if (!enabled) {
      setElements([]);
      return;
    }

    const newElements: FloatingElement[] = [];
    for (let i = 0; i < 20; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 15,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
        type: Math.random() > 0.5 ? 'heart' : 'sparkle',
      });
    }
    setElements(newElements);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Pattern Background */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/valentine-pattern.dim_1024x1024.png)',
          backgroundSize: '512px 512px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {elements.map((element) => (
          <div
            key={element.id}
            className="absolute animate-float"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`,
            }}
          >
            {element.type === 'heart' ? (
              <Heart
                className="fill-valentine-accent text-valentine-accent opacity-20"
                style={{ width: element.size, height: element.size }}
              />
            ) : (
              <Sparkles
                className="text-valentine-accent opacity-20"
                style={{ width: element.size, height: element.size }}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
