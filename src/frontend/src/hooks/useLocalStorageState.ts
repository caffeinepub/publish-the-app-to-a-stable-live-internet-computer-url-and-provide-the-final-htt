import { useState, useEffect } from 'react';

export interface PersonalizationState {
  girlfriendName: string;
  subtitle: string;
  loveLetterText: string;
  reasonsList: string[];
  memoryTimeline: Array<{ title: string; description: string; date: string }>;
  enableBackgroundEffects: boolean;
}

const DEFAULT_PERSONALIZATION: PersonalizationState = {
  girlfriendName: 'My Dearest',
  subtitle: 'You light up my world in ways I never imagined possible',
  loveLetterText: `My love,\n\nEvery moment with you feels like a beautiful dream I never want to wake up from. You bring joy, laughter, and warmth into my life in ways I can't fully express with words.\n\nYou are my best friend, my partner, and my everything. Thank you for being you.\n\nForever yours,\nWith all my heart ❤️`,
  reasonsList: [
    'Your smile brightens even my darkest days',
    'The way you laugh at my silly jokes',
    'How you always know when I need a hug',
    'Your kindness and compassion for everyone',
    'The way you make ordinary moments extraordinary',
    'How you believe in me even when I doubt myself',
  ],
  memoryTimeline: [
    {
      title: 'Our First Meeting',
      description: 'When I heard your voice in PUBG, I knew you would be someone special. There was something about the way you spoke that made my heart skip a beat. From that very first moment, I felt a connection I had never experienced before. Little did I know that voice would become my favorite sound in the world.',
      date: 'The beginning of forever',
    },
    {
      title: 'Our First Date',
      description: 'Time flew by as we talked for hours. I never wanted that evening to end.',
      date: 'A magical night',
    },
    {
      title: 'When I Knew',
      description: 'The moment I realized I was falling in love with you. Everything just felt right.',
      date: 'The best realization',
    },
  ],
  enableBackgroundEffects: true,
};

const STORAGE_KEY = 'valentine-personalization';

export function usePersonalization() {
  const [personalization, setPersonalization] = useState<PersonalizationState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PERSONALIZATION, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load personalization:', error);
    }
    return DEFAULT_PERSONALIZATION;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(personalization));
    } catch (error) {
      console.error('Failed to save personalization:', error);
    }
  }, [personalization]);

  const updatePersonalization = (updates: Partial<PersonalizationState>) => {
    setPersonalization((prev) => ({ ...prev, ...updates }));
  };

  const resetToDefaults = () => {
    setPersonalization(DEFAULT_PERSONALIZATION);
  };

  return {
    personalization,
    updatePersonalization,
    resetToDefaults,
  };
}
