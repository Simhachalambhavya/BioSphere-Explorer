import React from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { Organism } from '../types/organism';
import { Heart, ArrowUpRight } from 'lucide-react';

interface OrganismCardProps {
  organism: Organism;
}

export const OrganismCard: React.FC<OrganismCardProps> = ({ organism }) => {
  const { profile, ageBand, navigateToOrganism, toggleFavorite, isFavorite } = useBioSphere();

  const favorite = isFavorite(organism.id);
  const summary = organism.ageAdaptations[ageBand].summary;

  // Format conservation color
  const statusColors: Record<string, string> = {
    least_concern: 'text-emerald-400',
    near_threatened: 'text-yellow-400',
    vulnerable: 'text-amber-400',
    endangered: 'text-orange-400',
    critically_endangered: 'text-rose-500',
    extinct: 'text-purple-400',
  };

  return (
    <div
      onClick={() => navigateToOrganism(organism.id)}
      className="group relative bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-emerald-950/30 transition-all duration-200 cursor-pointer flex flex-col"
    >
      {/* Visual Image container with fallback */}
      <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
        <img
          src={organism.heroImage}
          alt={organism.commonName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/20" />

        {/* Favorite toggle button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(organism.id);
          }}
          className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-slate-900/80 backdrop-blur-sm text-slate-300 hover:text-rose-400 hover:bg-slate-900 transition-colors z-10"
          title={favorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Extinct or Microscopic indicator */}
        {organism.isExtinct && (
          <span className="absolute top-2.5 left-2.5 text-[11px] font-mono font-bold bg-purple-950/90 text-purple-300 border border-purple-800 px-2 py-0.5 rounded">
            Prehistoric
          </span>
        )}
        {organism.isMicroscopic && (
          <span className="absolute top-2.5 left-2.5 text-[11px] font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded">
            Microscopic
          </span>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Line (Zero-Pill discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5 font-medium">
            <span>{organism.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{organism.habitatCategory}</span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <h4 className="font-display font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
              {organism.commonName}
            </h4>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0 mt-1 transition-colors" />
          </div>

          {profile.age >= 8 && (
            <div className="text-xs italic text-slate-400 font-serif mb-2">
              {organism.scientificName}
            </div>
          )}

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mt-1">
            {summary}
          </p>
        </div>

        {/* Footer info line */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[11px]">{organism.dietLabel.split(' ')[0]}</span>
          <span className={`font-semibold capitalize text-[11px] ${statusColors[organism.conservationStatus] || 'text-slate-300'}`}>
            {organism.conservationStatus.replace('_', ' ')}
          </span>
        </div>
      </div>
    </div>
  );
};
