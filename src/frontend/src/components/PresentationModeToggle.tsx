import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PresentationModeToggleProps {
  isPresentationMode: boolean;
  onToggle: () => void;
}

export function PresentationModeToggle({
  isPresentationMode,
  onToggle,
}: PresentationModeToggleProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onToggle}
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
          >
            {isPresentationMode ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isPresentationMode ? 'Exit presentation mode' : 'Enter presentation mode'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
