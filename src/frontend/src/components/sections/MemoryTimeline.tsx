import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Calendar, Heart } from 'lucide-react';

interface Memory {
  title: string;
  description: string;
  date: string;
}

interface MemoryTimelineProps {
  memories: Memory[];
}

export function MemoryTimeline({ memories }: MemoryTimelineProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-valentine-primary mb-2">Our Journey</h2>
        <p className="text-valentine-muted">Special moments we've shared together</p>
      </div>

      <Card className="shadow-lg">
        <Accordion type="single" collapsible className="w-full">
          {memories.map((memory, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="px-6 hover:no-underline group">
                <div className="flex items-center gap-4 text-left">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-valentine-primary/10 flex items-center justify-center group-hover:bg-valentine-primary/20 transition-colors">
                    <Heart className="w-5 h-5 text-valentine-primary fill-current" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-valentine-foreground">
                      {memory.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-valentine-muted mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>{memory.date}</span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pl-14">
                  <p className="text-valentine-foreground leading-relaxed">
                    {memory.description}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
