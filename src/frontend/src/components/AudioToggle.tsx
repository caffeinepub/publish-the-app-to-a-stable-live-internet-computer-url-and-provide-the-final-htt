import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function AudioToggle() {
  const { isPlaying, isLoaded, toggle } = useAudioPlayer('/assets/audio/valentine-bgm.mp3');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={toggle}
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
            disabled={!isLoaded}
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5 text-valentine-primary" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isPlaying ? 'Pause music' : 'Play music'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
