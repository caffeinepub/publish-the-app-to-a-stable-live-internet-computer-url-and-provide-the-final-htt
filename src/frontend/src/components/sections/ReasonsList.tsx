import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Sparkles } from 'lucide-react';

interface ReasonsListProps {
  reasons: string[];
}

export function ReasonsList({ reasons }: ReasonsListProps) {
  const [revealedCount, setRevealedCount] = useState(1);

  const handleRevealNext = () => {
    if (revealedCount < reasons.length) {
      setRevealedCount((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-valentine-primary mb-2">
          Reasons I Love You
        </h2>
        <p className="text-valentine-muted">
          {revealedCount} of {reasons.length} revealed
        </p>
      </div>

      <div className="space-y-4">
        {reasons.slice(0, revealedCount).map((reason, index) => (
          <Card
            key={index}
            className="animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardContent className="p-6 flex items-start gap-4">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-full bg-valentine-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-valentine-primary fill-current" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-lg text-valentine-foreground">{reason}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        {revealedCount < reasons.length && (
          <div className="flex justify-center pt-4">
            <button
              onClick={handleRevealNext}
              className="group flex items-center gap-2 px-6 py-3 bg-valentine-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              <span className="font-semibold">Reveal Another Reason</span>
            </button>
          </div>
        )}

        {revealedCount === reasons.length && (
          <div className="text-center pt-4 animate-fade-in">
            <p className="text-xl text-valentine-primary font-semibold">
              And so many more reasons... ❤️
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
