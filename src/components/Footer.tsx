import React from 'react';
import { useBioSphere } from '../context/BioSphereContext';

export const Footer: React.FC = () => {
  const { setActiveView } = useBioSphere();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 py-10 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm text-white">
              BioSphere Explorer
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">"Explore Every Form of Life."</span>
          </div>

          <nav className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <button onClick={() => setActiveView('home')} className="hover:text-emerald-400 transition-colors">
              Home
            </button>
            <button onClick={() => setActiveView('explore')} className="hover:text-emerald-400 transition-colors">
              Explore
            </button>
            <button onClick={() => setActiveView('habitats')} className="hover:text-emerald-400 transition-colors">
              Habitats
            </button>
            <button onClick={() => setActiveView('categories')} className="hover:text-emerald-400 transition-colors">
              Life Forms
            </button>
            <button onClick={() => setActiveView('ancient')} className="hover:text-emerald-400 transition-colors">
              Ancient Earth
            </button>
            <button onClick={() => setActiveView('microscopic')} className="hover:text-emerald-400 transition-colors">
              Tiny Worlds
            </button>
            <button onClick={() => setActiveView('plants')} className="hover:text-emerald-400 transition-colors">
              Plant Explorer
            </button>
            <button onClick={() => setActiveView('parent-settings')} className="hover:text-emerald-400 transition-colors">
              Parent Settings
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>
            Educational platform designed for children ages 5–15. Scientific data curated from IUCN, Smithsonian, and academic biodiversity repositories.
          </p>
          <p>© 2026 BioSphere Explorer · Safe, Responsible Child Learning</p>
        </div>
      </div>
    </footer>
  );
};
