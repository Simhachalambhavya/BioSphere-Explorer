import React, { useState } from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { HERO_ASSETS, ORGANISM_IMAGES } from '../data/organisms';
import { BioImage } from './BioImage';
import { ArrowRight, Sparkles, BookOpen, Layers, CheckCircle2, X, Compass, Globe } from 'lucide-react';

interface LandingHeroProps {
  onStartClick: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStartClick }) => {
  const { profile, setAge, navigateToOrganism } = useBioSphere();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [demoAge, setDemoAge] = useState<number>(profile.age || 9);

  // Curated showcase matching user specification: Whale, Tiger, Eagle, Butterfly, Tree, Dinosaur
  const showcaseOrganisms = [
    { id: 'blue-whale', name: 'Blue Whale', scientific: 'Balaenoptera musculus', emoji: '🐋', category: 'Marine Giant', image: ORGANISM_IMAGES['blue-whale'] },
    { id: 'bengal-tiger', name: 'Bengal Tiger', scientific: 'Panthera tigris', emoji: '🐅', category: 'Apex Predator', image: ORGANISM_IMAGES['bengal-tiger'] },
    { id: 'bald-eagle', name: 'Bald Eagle', scientific: 'Haliaeetus leucocephalus', emoji: '🦅', category: 'Avian Raptor', image: ORGANISM_IMAGES['bald-eagle'] },
    { id: 'monarch-butterfly', name: 'Monarch Butterfly', scientific: 'Danaus plexippus', emoji: '🦋', category: 'Pollinator', image: ORGANISM_IMAGES['monarch-butterfly'] },
    { id: 'english-oak', name: 'English Oak', scientific: 'Quercus robur', emoji: '🌳', category: 'Ancient Plant', image: ORGANISM_IMAGES['english-oak'] },
    { id: 'tyrannosaurus-rex', name: 'T-Rex', scientific: 'Tyrannosaurus rex', emoji: '🦖', category: 'Paleoart Reconstruction', image: ORGANISM_IMAGES['tyrannosaurus-rex'], isReconstruction: true },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 pt-8 pb-16 lg:py-20 border-b border-slate-800">
      {/* Background Hero Image with Measured Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <BioImage
          src={HERO_ASSETS.heroBanner}
          alt="BioSphere Explorer biodiversity backdrop"
          className="w-full h-full object-cover object-center opacity-25 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Headline & Description */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Unboxed Metadata Header (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Interactive Biodiversity Encyclopedia</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Real Scientific Photography</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Ages 5–15</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] text-balance">
              Explore the incredible diversity of life on Earth.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              From giant blue whales and apex tigers to delicate pollinators, towering oaks, and ancient dinosaurs—experience
              authentic wildlife photography and scientifically verified anatomy adapted to your exact age.
            </p>

            {/* Core tagline & Value proposition */}
            <div className="py-2.5 px-4 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-emerald-200 text-xs sm:text-sm font-medium flex items-center gap-2 max-w-xl">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Age-adaptive intelligence recalibrates biology for learners ages 5 to 15.</span>
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
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Real Scientific Photography
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Vetted Zoological Data
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Zero Unrelated Placeholders
              </span>
            </div>
          </div>

          {/* Right Visual: Curated High-Fidelity Collage Composition */}
          <div className="lg:col-span-5">
            <div className="p-4 sm:p-5 bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-3xl shadow-2xl space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  Featured Living Kingdoms
                </span>
                <span className="text-[11px] font-mono text-emerald-400">22 Species Cataloged</span>
              </div>

              {/* Composition Grid of Real Organisms */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {showcaseOrganisms.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigateToOrganism(item.id)}
                    className="p-2 bg-slate-950/80 border border-slate-800/90 rounded-xl flex flex-col hover:border-emerald-500/60 hover:bg-slate-800/60 transition-all duration-300 group cursor-pointer shadow-md"
                    title={`Explore ${item.name} (${item.scientific})`}
                  >
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-1.5 bg-slate-900 border border-slate-800/80">
                      <BioImage
                        src={item.image}
                        alt={item.name}
                        scientificName={item.scientific}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute bottom-1 right-1 text-xs drop-shadow bg-slate-950/60 rounded px-1">
                        {item.emoji}
                      </span>
                      {item.isReconstruction && (
                        <span className="absolute top-1 left-1 text-[8px] font-mono font-bold bg-purple-950/90 text-purple-200 px-1 py-0.2 rounded border border-purple-800">
                          Paleoart
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-100 group-hover:text-emerald-300 truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] italic text-slate-400 font-serif truncate">
                      {item.scientific}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-center">
                <button
                  type="button"
                  onClick={onStartClick}
                  className="text-xs font-medium text-emerald-400 hover:text-emerald-300 hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <span>Select an age to begin your biodiversity expedition</span>
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
