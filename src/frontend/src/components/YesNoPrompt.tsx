import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface YesNoPromptProps {
  onYes: () => void;
}

export function YesNoPrompt({ onYes }: YesNoPromptProps) {
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const noMessages = [
    'Are you sure? 🥺',
    'Please reconsider... 💔',
    'Give me a chance! 🙏',
    'I promise to make you happy! ✨',
    'Just click Yes! 💕',
    'Pretty please? 🥹',
  ];

  const handleNoClick = () => {
    setNoClickCount((prev) => prev + 1);
    
    // Move the No button to a random position
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 100;
    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = Math.random() * maxY - maxY / 2;
    
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  const currentMessage = noMessages[Math.min(noClickCount, noMessages.length - 1)];

  return (
    <div className="space-y-6 mt-12">
      {noClickCount > 0 && (
        <p className="text-2xl text-valentine-secondary animate-fade-in">
          {currentMessage}
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
        <Button
          onClick={onYes}
          size="lg"
          className="bg-valentine-primary hover:bg-valentine-primary-dark text-white px-12 py-6 text-2xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Heart className="w-6 h-6 mr-2 fill-current" />
          Yes! 💕
        </Button>

        <Button
          onClick={handleNoClick}
          variant="outline"
          size="lg"
          className="border-valentine-secondary text-valentine-secondary hover:bg-valentine-secondary/10 px-12 py-6 text-2xl rounded-full shadow-lg transition-all duration-300"
          style={{
            transform: noClickCount > 0 ? `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)` : 'none',
            transition: 'transform 0.3s ease-out',
          }}
        >
          No 😢
        </Button>
      </div>
    </div>
  );
}
