/**
 * BioSphere Explorer - Ecosystems & Biomes Grid
 * Uses real-world ecosystem photographs, atmospheric gradients, species counts,
 * and immersive hover states across Earth's major biological realms.
 */

import React from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { HABITATS_INFO, ORGANISMS } from '../data/organisms';
import { ECOSYSTEM_IMAGES } from '../services/imageService';
import { HabitatCategory } from '../types/organism';
import { BioImage } from './BioImage';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';

export const HabitatsGrid: React.FC = () => {
  const { navigateToHabitat } = useBioSphere();

  const habitatsList = Object.keys(HABITATS_INFO) as HabitatCategory[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Biomes & Ecosystem Realms</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
          Explore by Earth's Habitats
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Journey through authentic photographs of Earth's major ecosystems, from sunlit coral reefs
          and deep pelagic oceans to ancient forests, extreme hydrothermal vents, and icy polar tundra.
        </p>
      </div>

      {/* Grid of Ecosystem Cards with Real Background Photography */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {habitatsList.map((habKey) => {
          const info = HABITATS_INFO[habKey];
          const ecoData = ECOSYSTEM_IMAGES[habKey] || ECOSYSTEM_IMAGES.oceans;
          const count = ORGANISMS.filter(o => o.habitatCategory === habKey).length;

          return (
            <div
              key={habKey}
              onClick={() => navigateToHabitat(habKey)}
              className="group relative rounded-3xl border border-slate-800 hover:border-emerald-500/60 overflow-hidden cursor-pointer flex flex-col justify-between shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 min-h-[320px]"
            >
              {/* Real World Ecosystem Photograph Backdrop */}
              <div className="absolute inset-0 z-0">
                <BioImage
                  src={ecoData.image}
                  alt={info.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Visual Atmosphere Scrim Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30 group-hover:via-slate-950/65 transition-colors" />
              </div>

              {/* Card Header Content */}
              <div className="relative z-10 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-700/80 shadow-md">
                    {info.icon}
                  </span>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-slate-700/80">
                    {count} {count === 1 ? 'Species' : 'Species'}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-white group-hover:text-emerald-300 transition-colors drop-shadow">
                  {info.name}
                </h3>
              </div>

              {/* Card Footer Content */}
              <div className="relative z-10 p-5 space-y-3">
                <p className="text-xs text-slate-200/90 leading-relaxed font-sans line-clamp-3">
                  {info.description}
                </p>

                <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                  <span>Enter Biome</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
