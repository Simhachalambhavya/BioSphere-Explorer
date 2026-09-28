/**
 * BioSphere Explorer - Redesigned Educational Discovery Card
 * Displays large real-world photography, clean typography, category badge,
 * scientific name, age-adapted synopsis, and smooth hover interaction.
 */

import React from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { Organism } from '../types/organism';
import { BioImage } from './BioImage';
import { Heart, ArrowRight } from 'lucide-react';

interface OrganismCardProps {
  organism: Organism;
}

export const OrganismCard: React.FC<OrganismCardProps> = ({ organism }) => {
  const { profile, ageBand, navigateToOrganism, toggleFavorite, isFavorite } = useBioSphere();

  const favorite = isFavorite(organism.id);
  const summary = organism.ageAdaptations[ageBand]?.summary || organism.amazingFacts[0];

  // Conservation status color accents
  const statusColors: Record<string, string> = {
    least_concern: 'text-emerald-400',
    near_threatened: 'text-yellow-400',
    vulnerable: 'text-amber-400',
    endangered: 'text-orange-400',
    critically_endangered: 'text-rose-500',
    extinct: 'text-purple-400',
  };

  const primaryPhoto = organism.image || organism.heroImage;

  return (
    <div
      onClick={() => navigateToOrganism(organism.id)}
      className="group relative bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-950/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* 1. Large Real-World Organism Photograph */}
      <div className="relative aspect-[16/11] w-full bg-slate-950 overflow-hidden">
        <BioImage
          src={primaryPhoto}
          secondarySrc={organism.thumbnail}
          alt={organism.commonName}
          scientificName={organism.scientificName}
          isReconstruction={organism.isReconstruction}
          isMicroscopic={organism.isMicroscopic}
          magnification={organism.magnification}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/25 pointer-events-none" />

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(organism.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-rose-400 hover:bg-slate-900 transition-colors z-20 shadow-md"
          title={favorite ? 'Remove from saved favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Bottom floating category indicator on image */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-slate-300 pointer-events-none z-10">
          <span className="bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-700/80 text-emerald-300">
            {organism.categoryLabel}
          </span>
          <span className="bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-slate-700/80 capitalize text-slate-300">
            {organism.habitatCategory.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* 2. Educational Discovery Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-display font-bold text-xl text-white group-hover:text-emerald-300 transition-colors tracking-tight">
              {organism.commonName}
            </h4>
          </div>

          {/* Scientific Name */}
          <div className="text-xs italic text-emerald-400 font-serif">
            {organism.scientificName}
          </div>

          {/* Age-Adapted Description */}
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
            {summary}
          </p>
        </div>

        {/* 3. Card Footer Action Bar */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className={`font-semibold capitalize text-[11px] ${statusColors[organism.conservationStatus] || 'text-slate-400'}`}>
            {organism.conservationStatus.replace('_', ' ')}
          </span>

          <span className="text-emerald-400 group-hover:text-emerald-300 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
