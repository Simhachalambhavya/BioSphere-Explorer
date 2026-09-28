import React, { useState } from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { ORGANISMS, HABITATS_INFO } from '../data/organisms';
import { TodayDiscoveryCard } from './TodayDiscoveryCard';
import { OrganismCard } from './OrganismCard';
import { HabitatsGrid } from './HabitatsGrid';
import { CategoriesGrid } from './CategoriesGrid';
import { Sparkles, ArrowRight, Compass, Layers, Globe } from 'lucide-react';

export const MainDashboard: React.FC = () => {
  const {
    profile,
    selectedHabitat,
    selectedCategory,
    navigateToHabitat,
    navigateToCategory,
    setActiveView,
  } = useBioSphere();

  const [explorerTab, setExplorerTab] = useState<'all' | 'habitats' | 'categories'>('all');

  // Filter organisms if a specific habitat or category is selected
  const activeOrganisms = ORGANISMS.filter(o => {
    if (selectedHabitat) return o.habitatCategory === selectedHabitat;
    if (selectedCategory) return o.category === selectedCategory;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Welcome Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Age-Adapted Explorer Dashboard</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Welcome, {profile.explorerLevel}! 🌎
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Learning content currently configured for <strong className="text-white">Age {profile.age}</strong>.
          </p>
        </div>

        {/* Quick Mode Switcher buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => {
              setExplorerTab('all');
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              explorerTab === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            All Organisms
          </button>
          <button
            onClick={() => setExplorerTab('habitats')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              explorerTab === 'habitats'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            By Habitat
          </button>
          <button
            onClick={() => setExplorerTab('categories')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              explorerTab === 'categories'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            By Life Form
          </button>
        </div>
      </div>

      {/* Today's Discovery Spotlight */}
      {explorerTab === 'all' && <TodayDiscoveryCard />}

      {/* Explorer Mode: View by Habitat */}
      {explorerTab === 'habitats' && <HabitatsGrid />}

      {/* Explorer Mode: View by Category */}
      {explorerTab === 'categories' && <CategoriesGrid />}

      {/* Explorer Mode: All Organisms & Special Shortcuts */}
      {explorerTab === 'all' && (
        <>
          {/* Specialized Expeditions Spotlight Banners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Ancient Earth */}
            <div
              onClick={() => setActiveView('ancient')}
              className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-800/50 hover:border-purple-500 hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl block mb-2">🦖</span>
                <h3 className="font-display font-bold text-lg text-white">Ancient Earth</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Discover T-Rex, Triceratops, and deep time prehistoric timelines.
                </p>
              </div>
              <div className="mt-4 text-xs font-semibold text-purple-400 flex items-center gap-1">
                <span>Enter Prehistoric World</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Tiny Worlds */}
            <div
              onClick={() => setActiveView('microscopic')}
              className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-800/50 hover:border-cyan-500 hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl block mb-2">🔬</span>
                <h3 className="font-display font-bold text-lg text-white">Tiny Worlds</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Virtual microscope simulation viewing bacteria and tardigrades.
                </p>
              </div>
              <div className="mt-4 text-xs font-semibold text-cyan-400 flex items-center gap-1">
                <span>Launch Microscope</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Plant Explorer */}
            <div
              onClick={() => setActiveView('plants')}
              className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-800/50 hover:border-emerald-500 hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl block mb-2">🌱</span>
                <h3 className="font-display font-bold text-lg text-white">Plant Explorer</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Explore photosynthesis, leaf stomata, and botanical adaptations.
                </p>
              </div>
              <div className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <span>Inspect Plant Biology</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Active Filter Bar if a habitat/category is pre-selected */}
          {(selectedHabitat || selectedCategory) && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-slate-200">
              <span>
                Filtered by:{' '}
                <strong className="text-emerald-400 capitalize">
                  {selectedHabitat || selectedCategory}
                </strong>{' '}
                ({activeOrganisms.length} organisms)
              </span>
              <button
                onClick={() => {
                  navigateToHabitat('oceans'); // or reset
                }}
                className="text-emerald-400 hover:underline"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Organisms Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Featured Organisms
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click any creature to open its complete interactive profile.
                </p>
              </div>
              <button
                onClick={() => setActiveView('search')}
                className="text-xs text-emerald-400 hover:underline font-semibold"
              >
                Search all organisms →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeOrganisms.map((org) => (
                <OrganismCard key={org.id} organism={org} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
