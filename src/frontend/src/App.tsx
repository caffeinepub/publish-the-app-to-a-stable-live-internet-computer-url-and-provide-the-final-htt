import { useState } from 'react';
import { usePersonalization } from './hooks/useLocalStorageState';
import { YesNoPrompt } from './components/YesNoPrompt';
import { CelebrationLayer } from './components/CelebrationLayer';
import { AmbientBackground } from './components/AmbientBackground';
import { PersonalizationPanel } from './components/PersonalizationPanel';
import { AudioToggle } from './components/AudioToggle';
import { PresentationModeToggle } from './components/PresentationModeToggle';
import { CopyLinkButton } from './components/CopyLinkButton';
import { LoveLetterCard } from './components/sections/LoveLetterCard';
import { ReasonsList } from './components/sections/ReasonsList';
import { MemoryTimeline } from './components/sections/MemoryTimeline';
import { Heart } from 'lucide-react';

function App() {
  const { personalization } = usePersonalization();
  const [hasAnsweredYes, setHasAnsweredYes] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const handleYes = () => {
    setHasAnsweredYes(true);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 5000);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Ambient Background */}
      <AmbientBackground enabled={personalization.enableBackgroundEffects} />

      {/* Celebration Layer */}
      {showCelebration && <CelebrationLayer />}

      {/* Controls - Hidden in Presentation Mode */}
      {!isPresentationMode && (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <AudioToggle />
          <PersonalizationPanel />
        </div>
      )}

      {/* Presentation Mode Toggle */}
      <div className="fixed top-4 left-4 z-50">
        <PresentationModeToggle
          isPresentationMode={isPresentationMode}
          onToggle={() => setIsPresentationMode(!isPresentationMode)}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-4xl w-full text-center space-y-8">
            {/* Hero Image */}
            <div className="relative w-full max-w-2xl mx-auto mb-8">
              <img
                src="/assets/generated/valentine-hero.dim_1600x900.png"
                alt="Valentine's Day"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>

            {/* Main Question */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-valentine-primary animate-fade-in">
                {personalization.girlfriendName}
              </h1>
              <h2 className="text-3xl md:text-5xl font-semibold text-valentine-secondary">
                Will you be my Valentine?
              </h2>
              <p className="text-xl md:text-2xl text-valentine-muted italic">
                {personalization.subtitle}
              </p>
            </div>

            {/* Yes/No Prompt */}
            {!hasAnsweredYes && <YesNoPrompt onYes={handleYes} />}

            {/* Thank You Message */}
            {hasAnsweredYes && (
              <div className="animate-fade-in space-y-4">
                <div className="flex items-center justify-center gap-2 text-valentine-primary">
                  <Heart className="w-8 h-8 fill-current animate-pulse" />
                  <p className="text-3xl md:text-4xl font-bold">
                    You made my day! ❤️
                  </p>
                  <Heart className="w-8 h-8 fill-current animate-pulse" />
                </div>
                <p className="text-xl text-valentine-secondary">
                  Scroll down to see why you're so special to me...
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Additional Sections - Revealed After Yes */}
        {hasAnsweredYes && (
          <div className="space-y-16 pb-16">
            {/* Love Letter Section */}
            <section className="px-4">
              <LoveLetterCard content={personalization.loveLetterText} />
            </section>

            {/* Reasons List Section */}
            <section className="px-4">
              <ReasonsList reasons={personalization.reasonsList} />
            </section>

            {/* Memory Timeline Section */}
            <section className="px-4">
              <MemoryTimeline memories={personalization.memoryTimeline} />
            </section>

            {/* Decorative Stickers */}
            <section className="px-4 flex justify-center">
              <img
                src="/assets/generated/valentine-stickers.dim_512x512.png"
                alt="Valentine Stickers"
                className="w-64 h-64 object-contain opacity-80"
              />
            </section>
          </div>
        )}

        {/* Footer */}
        <footer className="relative z-10 py-8 text-center text-valentine-muted space-y-4">
          <div className="flex justify-center">
            <CopyLinkButton />
          </div>
          <p className="flex items-center justify-center gap-2 text-sm">
            © 2026. Built with <Heart className="w-4 h-4 fill-current text-valentine-primary" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-valentine-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
