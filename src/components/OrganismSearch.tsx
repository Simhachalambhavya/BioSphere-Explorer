import React, { useState, useMemo } from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { ORGANISMS, HABITATS_INFO, CATEGORIES_INFO } from '../data/organisms';
import { OrganismCard } from './OrganismCard';
import { Search, Filter, X, Compass, Sparkles } from 'lucide-react';
import { HabitatCategory, OrganismCategory } from '../types/organism';

export const OrganismSearch: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedHabitat, selectedCategory, setSelectedHabitat, setSelectedCategory } = useBioSphere();
  const [internalQuery, setInternalQuery] = useState(searchQuery || '');
  const [activeHabitatFilter, setActiveHabitatFilter] = useState<HabitatCategory | 'all'>(selectedHabitat || 'all');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<OrganismCategory | 'all'>(selectedCategory || 'all');

  const popularSuggestions = ['Orca', 'Butterfly', 'Venus flytrap', 'T-Rex', 'Cyanobacteria', 'Octopus', 'Elephant', 'Shark'];

  // Filtered organisms list
  const filteredOrganisms = useMemo(() => {
    const q = internalQuery.trim().toLowerCase();

    return ORGANISMS.filter((org) => {
      // Search matching (common name, scientific name, adaptations, amazing facts)
      const matchesSearch =
        !q ||
        org.commonName.toLowerCase().includes(q) ||
        org.scientificName.toLowerCase().includes(q) ||
        org.habitat.toLowerCase().includes(q) ||
        org.categoryLabel.toLowerCase().includes(q) ||
        org.amazingFacts.some(f => f.toLowerCase().includes(q));

      // Habitat filter
      const matchesHabitat =
        activeHabitatFilter === 'all' || org.habitatCategory === activeHabitatFilter;

      // Category filter
      const matchesCategory =
        activeCategoryFilter === 'all' || org.category === activeCategoryFilter;

      return matchesSearch && matchesHabitat && matchesCategory;
    });
  }, [internalQuery, activeHabitatFilter, activeCategoryFilter]);

  const clearAllFilters = () => {
    setInternalQuery('');
    setSearchQuery('');
    setActiveHabitatFilter('all');
    setActiveCategoryFilter('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
          What would you like to discover?
        </h2>
        <p className="text-slate-400 text-sm">
          Search across 21+ forms of life by common name, scientific name, diet, or habitat.
        </p>

        {/* Search Input Box */}
        <div className="relative mt-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={internalQuery}
            onChange={(e) => {
              setInternalQuery(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search e.g. Orca, T-Rex, Butterfly, Shark, Plant..."
            className="w-full pl-11 pr-10 py-3.5 bg-slate-900 border border-slate-700/80 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-sm sm:text-base shadow-xl"
          />
          {internalQuery && (
            <button
              onClick={() => {
                setInternalQuery('');
                setSearchQuery('');
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips (Functional Buttons, not static pills) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 text-xs">
          <span className="text-slate-500 font-medium">Try:</span>
          {popularSuggestions.map((sug) => (
            <button
              key={sug}
              onClick={() => {
                setInternalQuery(sug);
                setSearchQuery(sug);
              }}
              className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700/60"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs / Controls */}
      <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
        {/* Habitats Filter Bar */}
        <div>
          <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Filter by Habitat:
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveHabitatFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeHabitatFilter === 'all'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Habitats
            </button>
            {(Object.keys(HABITATS_INFO) as HabitatCategory[]).map((habKey) => {
              const info = HABITATS_INFO[habKey];
              const isSelected = activeHabitatFilter === habKey;
              return (
                <button
                  key={habKey}
                  onClick={() => setActiveHabitatFilter(habKey)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>{info.icon}</span>
                  <span>{info.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Bar */}
        <div>
          <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Filter by Life Form:
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeCategoryFilter === 'all'
                  ? 'bg-teal-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Life Forms
            </button>
            {(Object.keys(CATEGORIES_INFO) as OrganismCategory[]).map((catKey) => {
              const info = CATEGORIES_INFO[catKey];
              const isSelected = activeCategoryFilter === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setActiveCategoryFilter(catKey)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>{info.icon}</span>
                  <span>{info.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-white font-mono">{filteredOrganisms.length}</strong> organism
          {filteredOrganisms.length === 1 ? '' : 's'}
        </span>
        {(internalQuery || activeHabitatFilter !== 'all' || activeCategoryFilter !== 'all') && (
          <button
            onClick={clearAllFilters}
            className="text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Reset filters</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Organisms Grid */}
      {filteredOrganisms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOrganisms.map((org) => (
            <OrganismCard key={org.id} organism={org} />
          ))}
        </div>
      ) : (
        /* Friendly Error & Empty State */
        <div className="py-16 text-center p-8 bg-slate-900/50 border border-slate-800 rounded-2xl max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-400">
            <Compass className="w-7 h-7 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <h3 className="font-display font-bold text-xl text-white">
            Oops! We couldn't find that explorer.
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Scientists don't currently have records matching your search. Try checking your spelling or explore popular organisms below.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-emerald-400 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
