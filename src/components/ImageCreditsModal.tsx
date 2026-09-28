/**
 * BioSphere Explorer - Image Attribution & Legal Credits Modal
 * Details scientific image repositories, public domain archives,
 * Creative Commons licenses, and photographer acknowledgements.
 */

import React from 'react';
import { X, ShieldCheck, ExternalLink, Globe } from 'lucide-react';
import { ORGANISM_IMAGE_CATALOG } from '../services/imageService';
import { ORGANISMS } from '../data/organisms';

interface ImageCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageCreditsModal: React.FC<ImageCreditsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 max-h-[88vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          aria-label="Close Credits"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-emerald-400 mb-2">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Legal & Scientific Integrity</span>
        </div>

        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
          Image Sources & Attributions
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          BioSphere Explorer adheres strictly to scientific accuracy and legal attribution.
          Wildlife photographs and scientific visualizations are sourced from reputable public domain archives,
          Creative Commons licensed research collections, and educational institutions.
        </p>

        {/* Repositories Cited */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="font-semibold text-xs text-white">Wikimedia Commons</div>
            <div className="text-[11px] text-slate-400 mt-1">CC BY, CC BY-SA & Public Domain scientific natural history files.</div>
          </div>
          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="font-semibold text-xs text-white">NOAA & USFWS</div>
            <div className="text-[11px] text-slate-400 mt-1">Public domain federal marine and terrestrial wildlife surveys.</div>
          </div>
          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="font-semibold text-xs text-white">Smithsonian & Museums</div>
            <div className="text-[11px] text-slate-400 mt-1">Peer-reviewed paleoart and museum specimen osteology.</div>
          </div>
        </div>

        {/* Organism By Organism Credits List */}
        <div className="space-y-3 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Catalog Attributions:
          </div>
          <div className="divide-y divide-slate-800/80 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700">
            {ORGANISMS.map((org) => {
              const pkg = ORGANISM_IMAGE_CATALOG[org.id];
              return (
                <div key={org.id} className="py-2.5 flex items-start justify-between gap-4 text-xs">
                  <div>
                    <strong className="text-white">{org.commonName}</strong>{' '}
                    <span className="italic text-emerald-400 font-serif">({org.scientificName})</span>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      {pkg?.imageCredit || 'BioSphere Natural History Collection'}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">
                    {pkg?.imageSource || 'Wikimedia Commons'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-colors"
        >
          Return to Exploration
        </button>
      </div>
    </div>
  );
};
