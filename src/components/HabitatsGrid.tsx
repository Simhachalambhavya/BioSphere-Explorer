import React from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { HABITATS_INFO, ORGANISMS } from '../data/organisms';
import { HabitatCategory } from '../types/organism';
import { Compass, ArrowRight } from 'lucide-react';

export const HabitatsGrid: React.FC = () => {
  const { navigateToHabitat } = useBioSphere();

  const habitatsList = Object.keys(HABITATS_INFO) as HabitatCategory[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Biomes & Ecosystems</span>
        </div>
        <h2 className="font-display font-bold text-3xl text-white">
          Explore by Habitat
        </h2>
        <p className="text-slate-400 text-sm">
          Discover how life adapts across Earth’s 11 major natural habitats.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {habitatsList.map((habKey) => {
          const info = HABITATS_INFO[habKey];
          const count = ORGANISMS.filter(o => o.habitatCategory === habKey).length;

          return (
            <div
              key={habKey}
              onClick={() => navigateToHabitat(habKey)}
              className={`group p-5 rounded-2xl border border-slate-800 bg-gradient-to-br ${info.bgGradient} hover:border-emerald-500/50 hover:scale-[1.02] transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    {info.icon}
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-700">
                    {count} Species
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-emerald-300 transition-colors">
                  {info.name}
                </h3>

                <p className="text-xs text-slate-300/90 mt-2 leading-relaxed">
                  {info.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium text-emerald-400 group-hover:text-emerald-300">
                <span>Expedition organisms</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
