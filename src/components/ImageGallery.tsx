/**
 * BioSphere Explorer - Interactive Multi-Behavior Image Gallery & Lightbox
 * Displays natural animal behaviors, plant structures, and scientific reconstructions
 * with full-screen zoom, detailed behavioral captions, and legal attributions.
 */

import React, { useState } from 'react';
import { GalleryImage } from '../types/organism';
import { BioImage } from './BioImage';
import { Maximize2, X, ChevronLeft, ChevronRight, Info, ShieldCheck, Sparkles } from 'lucide-react';

interface ImageGalleryProps {
  organismName: string;
  scientificName: string;
  gallery: GalleryImage[];
  primaryImage: string;
  defaultCredit?: string;
  isReconstruction?: boolean;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  organismName,
  scientificName,
  gallery,
  primaryImage,
  defaultCredit,
  isReconstruction,
}) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Fallback to primary image if gallery is empty
  const allImages: GalleryImage[] = gallery.length > 0 ? gallery : [
    {
      id: 'primary',
      url: primaryImage,
      caption: `High-resolution wildlife photograph of ${organismName} in natural habitat.`,
      behavior: 'Primary Scientific Profile',
      credit: defaultCredit || 'BioSphere Natural History Archive',
      isReconstruction,
    }
  ];

  const currentLightboxImage = activeLightboxIndex !== null ? allImages[activeLightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + allImages.length) % allImages.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % allImages.length);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Natural Behaviors & Image Gallery ({allImages.length} Photographs)</span>
        </div>
        <div className="text-xs text-slate-400">
          Click any photograph to enlarge in high resolution
        </div>
      </div>

      {/* Horizontal Scrollable Gallery Row */}
      <div className="flex items-center gap-4 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {allImages.map((img, idx) => (
          <div
            key={img.id || idx}
            onClick={() => setActiveLightboxIndex(idx)}
            className="group relative flex-shrink-0 w-64 sm:w-72 bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
              <BioImage
                src={img.url}
                alt={`${organismName} - ${img.behavior || img.caption}`}
                scientificName={scientificName}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Behavior Tag */}
              {img.behavior && (
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-slate-900/90 text-emerald-300 border border-slate-700 text-[11px] font-semibold backdrop-blur-md">
                  {img.behavior}
                </span>
              )}

              {/* Click to expand hover indicator */}
              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900/80 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Caption & attribution */}
            <div className="p-3.5 text-left">
              <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed font-sans">
                {img.caption}
              </p>
              {img.credit && (
                <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 truncate flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{img.credit}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Full-Screen Modal */}
      {currentLightboxImage && (
        <div
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  {organismName}
                </h3>
                <div className="text-xs italic font-serif text-emerald-400">
                  {scientificName} · {currentLightboxImage.behavior || 'Field Observation'}
                </div>
              </div>
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Stage Image */}
            <div className="relative flex-1 bg-slate-950 flex items-center justify-center min-h-[300px] sm:min-h-[460px] overflow-hidden">
              <BioImage
                src={currentLightboxImage.url}
                alt={currentLightboxImage.caption}
                scientificName={scientificName}
                priority={true}
                className="max-h-[60vh] w-auto max-w-full object-contain mx-auto"
                containerClassName="relative w-full h-full flex items-center justify-center"
              />

              {/* Prev / Next Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl backdrop-blur-md transition-transform hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl backdrop-blur-md transition-transform hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Details Deck */}
            <div className="p-5 sm:p-6 bg-slate-900 border-t border-slate-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-emerald-400">
                <span>{currentLightboxImage.behavior || 'Scientific Observation'}</span>
                <span>
                  Photo {(activeLightboxIndex ?? 0) + 1} of {allImages.length}
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {currentLightboxImage.caption}
              </p>
              {currentLightboxImage.credit && (
                <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>Attribution: {currentLightboxImage.credit}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
