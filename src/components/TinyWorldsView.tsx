import React, { useState } from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { ORGANISMS, HERO_ASSETS } from '../data/organisms';
import { OrganismCard } from './OrganismCard';
import { Sparkles, CheckCircle2, AlertTriangle, ZoomIn } from 'lucide-react';

export const TinyWorldsView: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<'100x' | '400x' | '1000x'>('400x');

  const microOrganisms = ORGANISMS.filter(
    o => o.category === 'microorganisms' || o.isMicroscopic
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Tiny Worlds Header */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_ASSETS.microscopicWorld}
            alt="Luminous microscopic microorganisms under darkfield microscope"
            className="w-full h-full object-cover opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <span className="text-base">🔬</span>
            <span>Microbiology Expedition · Tiny Worlds</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            The Invisible Universe Beneath the Lens
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            In every drop of pond water, teaspoon of garden soil, and even inside our own bodies,
            trillions of microscopic single-celled organisms power the living Earth.
          </p>

          <div className="p-3 bg-cyan-950/40 border border-cyan-800/40 rounded-xl text-xs text-cyan-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong>Crucial Science Note:</strong> Microorganisms are NOT automatically "bad" or "germs"!
              The vast majority are helpful heroes: they digest food in our stomachs, make oxygen in oceans, and recycle forest soil!
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Microscope Simulator Lens */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <ZoomIn className="w-5 h-5 text-cyan-400" />
              <span>Virtual Microscope Objective Lens</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select magnification to adjust the optical resolution of the micro-universe.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {(['100x', '400x', '1000x'] as const).map((mag) => (
              <button
                key={mag}
                onClick={() => setZoomLevel(mag)}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors ${
                  zoomLevel === mag
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mag}
              </button>
            ))}
          </div>
        </div>

        {/* Circular Microscope Field of View */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
          <img
            src={HERO_ASSETS.microscopicWorld}
            alt="Microscope view"
            className={`w-full h-full object-cover transition-transform duration-500 ${
              zoomLevel === '100x' ? 'scale-100' : zoomLevel === '400x' ? 'scale-150' : 'scale-225'
            }`}
          />
          <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-slate-950/90 pointer-events-none" />

          {/* Reticle Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-cyan-400/30 flex items-center justify-center relative">
              <div className="w-full h-[1px] bg-cyan-400/20 absolute" />
              <div className="h-full w-[1px] bg-cyan-400/20 absolute" />
              <span className="absolute bottom-3 text-[10px] font-mono text-cyan-400/80 bg-slate-950/80 px-2 py-0.5 rounded">
                Darkfield Lens · {zoomLevel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Helpful vs Harmful Microbes Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Helpful Heroes */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
            <CheckCircle2 className="w-5 h-5" />
            <h3>Helpful Microbes (Our Tiny Allies)</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <strong className="text-white">Gut Microbiome:</strong> Trillions of friendly bacteria living in our intestines digest fiber, synthesize vitamin K, and protect against illnesses.
            </li>
            <li className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <strong className="text-white">Nitrogen Fixers:</strong> Soil bacteria transform inert atmospheric nitrogen into natural fertilizer for wheat, rice, and fruit trees.
            </li>
            <li className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <strong className="text-white">Ocean Phytoplankton:</strong> Microscopic cyanobacteria and diatoms produce over 50% of the world's oxygen through photosynthesis.
            </li>
          </ul>
        </div>

        {/* Harmful Microorganisms & Safety */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
            <AlertTriangle className="w-5 h-5" />
            <h3>Harmful Microbes (Pathogens) & Safe Habits</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Only a tiny percentage of microorganisms cause illnesses in humans. Understanding how they spread keeps young scientists safe:
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <strong className="text-white">Soap & Water:</strong> Washing hands with warm soapy water for 20 seconds physically dissolves the fatty lipid membrane of harmful bacteria.
            </li>
            <li className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <strong className="text-white">Refrigeration & Cooking:</strong> Heat kills bacteria in food, while refrigerators slow their reproduction down to a crawl.
            </li>
            <li className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <strong className="text-white">Vaccines:</strong> Train our white blood cells to recognize bad microbes before they ever cause illness.
            </li>
          </ul>
        </div>
      </div>

      {/* Featured Microbes */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
          Featured Microscopic Organisms
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {microOrganisms.map((org) => (
            <OrganismCard key={org.id} organism={org} />
          ))}
        </div>
      </div>
    </div>
  );
};
