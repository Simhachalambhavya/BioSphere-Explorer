import React from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { CATEGORIES_INFO, ORGANISMS } from '../data/organisms';
import { OrganismCategory } from '../types/organism';
import { Layers, ArrowRight } from 'lucide-react';

export const CategoriesGrid: React.FC = () => {
  const { navigateToCategory } = useBioSphere();

  const categoriesList = Object.keys(CATEGORIES_INFO) as OrganismCategory[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400 uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Kingdoms & Branches</span>
        </div>
        <h2 className="font-display font-bold text-3xl text-white">
          Explore by Life Form
        </h2>
        <p className="text-slate-400 text-sm">
          Select any life category to study its unique anatomy, reproduction, and evolutionary history.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {categoriesList.map((catKey) => {
          const info = CATEGORIES_INFO[catKey];
          const count = ORGANISMS.filter(o => o.category === catKey).length;

          return (
            <div
              key={catKey}
              onClick={() => navigateToCategory(catKey)}
              className="group p-5 rounded-2xl border border-slate-800 bg-slate-900 hover:border-emerald-500/50 hover:bg-slate-850 hover:scale-[1.02] transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800">
                    {info.icon}
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                    {count} Species
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-emerald-300 transition-colors">
                  {info.name}
                </h3>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {info.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-medium text-emerald-400 group-hover:text-emerald-300">
                <span>View organisms</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
