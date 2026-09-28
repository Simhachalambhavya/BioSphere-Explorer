import React, { useState } from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { HERO_ASSETS, ORGANISM_IMAGES } from '../data/organisms';
import { ArrowRight, Sparkles, BookOpen, Layers, CheckCircle2, X } from 'lucide-react';

interface LandingHeroProps {
  onStartClick: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStartClick }) => {
  const { profile, setAge, navigateToOrganism } = useBioSphere();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [demoAge, setDemoAge] = useState<number>(profile.age || 9);

  const lifeFormsPreview = [
    { id: 'orca', name: 'Orca Whale', emoji: '🐋', category: 'Marine Apex', image: ORGANISM_IMAGES['orca'] },
    { id: 'bengal-tiger', name: 'Bengal Tiger', emoji: '🐅', category: 'Apex Predator', image: ORGANISM_IMAGES['bengal-tiger'] },
    { id: 'bald-eagle', name: 'Bald Eagle', emoji: '🦅', category: 'Apex Raptor', image: ORGANISM_IMAGES['bald-eagle'] },
    { id: 'african-elephant', name: 'African Elephant', emoji: '🐘', category: 'Savanna Giant', image: ORGANISM_IMAGES['african-elephant'] },
    { id: 'great-white-shark', name: 'Great White', emoji: '🦈', category: 'Ocean Hunter', image: ORGANISM_IMAGES['great-white-shark'] },
    { id: 'monarch-butterfly', name: 'Monarch', emoji: '🦋', category: 'Pollinator', image: ORGANISM_IMAGES['monarch-butterfly'] },
    { id: 'tyrannosaurus-rex', name: 'T-Rex', emoji: '🦖', category: 'Dinosaurs', image: ORGANISM_IMAGES['tyrannosaurus-rex'] },
    { id: 'cyanobacteria', name: 'Cyanobacteria', emoji: '🦠', category: 'Microscopic', image: ORGANISM_IMAGES['cyanobacteria'] },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 pt-8 pb-16 lg:py-20 border-b border-slate-800">
      {/* Background Hero Image with Measured Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_ASSETS.heroBanner}
          alt="BioSphere Explorer biodiversity backdrop with orcas, eagles, ancient trees, and microscopic organisms"
          className="w-full h-full object-cover object-center opacity-30 select-none pointer-events-none"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Headline & Description */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Unboxed Metadata Header (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400">
              <span>Interactive Encyclopedia of Life</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>AI-Powered</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Age-Adaptive 5–15</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] text-balance">
              Explore the Amazing World of Life
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              From enormous whales to tiny bacteria, discover how living organisms survive, grow,
              communicate, and interact with our planet.
            </p>

            {/* Core tagline & Value proposition */}
            <div className="py-2.5 px-4 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-emerald-200 text-xs sm:text-sm font-medium flex items-center gap-2 max-w-xl">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>BioSphere Explorer adapts every lesson to the learner’s age.</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onStartClick}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowHowItWorks(true)}
                className="px-5 py-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                How It Works
              </button>
            </div>

            {/* Proof and Trust line */}
            <div className="pt-4 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Scientifically Verified Data
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Zero Private Data Collected
              </span>
            </div>
          </div>

          {/* Right Visual: Showcase Grid of 8 diverse life forms */}
          <div className="lg:col-span-5">
            <div className="p-4 sm:p-5 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-between mb-3 text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-semibold text-slate-200">Across Earth's Kingdoms</span>
                <span>21+ Organisms Ready</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {lifeFormsPreview.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => navigateToOrganism(item.id)}
                    className="p-2 sm:p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-xl flex flex-col items-center text-center hover:border-emerald-500/50 hover:bg-slate-800/60 transition-all duration-200 group cursor-pointer"
                    title={`Click to explore ${item.name}`}
                  >
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-1.5 bg-slate-900 border border-slate-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="absolute bottom-1 right-1 text-xs drop-shadow">
                        {item.emoji}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 truncate max-w-full">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate max-w-full">
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
                <button
                  type="button"
                  onClick={onStartClick}
                  className="text-xs font-medium text-emerald-400 hover:text-emerald-300 hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <span>Select an age to begin your expedition</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "How It Works" Interactive Explanation Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowHowItWorks(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Layers className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">The Age-Adaptive Engine</span>
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-2">
              How Age-Adaptive Learning Works
            </h3>
            <p className="text-slate-300 text-sm mb-6">
              Unlike static animal databases, BioSphere Explorer recalibrates every explanation,
              scientific term, quiz question, and body diagram to match the learner’s cognitive stage.
            </p>

            {/* Interactive Demo Slider */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl mb-6">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Drag to see explanation adapt:</span>
                <span className="text-emerald-400 font-bold text-sm">Age {demoAge}</span>
              </div>
              <input
                type="range"
                min="5"
                max="15"
                value={demoAge}
                onChange={(e) => setDemoAge(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer mb-4"
              />

              <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[11px] font-semibold text-slate-400 mb-1">
                  Example: How we explain an Orca to an Age {demoAge} learner:
                </div>
                <p className="text-sm text-slate-100 leading-relaxed font-sans">
                  {demoAge <= 7 &&
                    `"An orca is a giant, friendly ocean animal with black and white patches. Orcas love to swim fast, leap in the air, and breathe through a blowhole!"`}
                  {demoAge >= 8 && demoAge <= 10 &&
                    `"Orcas are intelligent marine mammals that belong to the oceanic dolphin family. They breathe air through a blowhole, use echolocation to find fish, and live in family groups called pods."`}
                  {demoAge >= 11 && demoAge <= 13 &&
                    `"Orcinus orca is an apex cetacean predator. Exhibiting cultural transmission of hunting tactics, pod dialects, and complex matrilineal social structures, orcas prevent trophic cascades in marine ecosystems."`}
                  {demoAge >= 14 &&
                    `"Orcinus orca represents secondarily adapted marine cetaceans within Delphinidae. Morphological, genetic, and acoustic differentiation suggests global ecotypes (Resident, Transient, Offshore) exhibit sympatric divergence bounded by bioenergetic niches."`}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Ages 5–7:</strong> Sensory vocabulary, simple body parts, short fun facts, and large illustrations.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Ages 8–10:</strong> Habitats, adaptations, diet classification, life cycles, and family behavior.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Ages 11–13:</strong> Scientific terminology, food web trophic cascades, ecological roles, and conservation status.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Ages 14–15:</strong> Full taxonomic hierarchy, evolutionary lineages, physiology, and peer-reviewed conservation science.
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowHowItWorks(false);
                setAge(demoAge);
                onStartClick();
              }}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-colors"
            >
              Start Exploring at Age {demoAge}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
