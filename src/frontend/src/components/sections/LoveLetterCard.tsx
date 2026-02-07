import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MailOpen } from 'lucide-react';

interface LoveLetterCardProps {
  content: string;
}

export function LoveLetterCard({ content }: LoveLetterCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-valentine-primary mb-2">A Letter For You</h2>
        <p className="text-valentine-muted">Click to open and read my heart</p>
      </div>

      <Card
        className={`relative overflow-hidden transition-all duration-500 cursor-pointer ${
          isOpen ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardContent className="p-8 md:p-12">
          {!isOpen ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Mail className="w-24 h-24 text-valentine-primary animate-pulse" />
              <p className="text-xl text-valentine-secondary font-semibold">
                Click to open your letter
              </p>
            </div>
          ) : (
            <div className="animate-fade-in space-y-6">
              <div className="flex items-center justify-center mb-6">
                <MailOpen className="w-12 h-12 text-valentine-primary" />
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="whitespace-pre-wrap text-valentine-foreground font-serif leading-relaxed">
                  {content}
                </p>
              </div>
              <div className="flex justify-center pt-4">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  variant="outline"
                  className="border-valentine-primary text-valentine-primary hover:bg-valentine-primary/10"
                >
                  Close Letter
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
