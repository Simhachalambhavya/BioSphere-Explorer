/**
 * BioSphere Explorer - Resilient Biodiversity Image Component
 * Enforces Zero-Broken-Image Policy with 4-tier fallback:
 * 1. Primary high-res URL
 * 2. Secondary verified URL
 * 3. Tertiary archive URL
 * 4. Scientifically styled vector SVG fallback container
 */

import React, { useState, useEffect } from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface BioImageProps {
  src: string;
  secondarySrc?: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  scientificName?: string;
  isReconstruction?: boolean;
  isMicroscopic?: boolean;
  magnification?: string;
}

export const BioImage: React.FC<BioImageProps> = ({
  src,
  secondarySrc,
  fallbackSrc,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative w-full h-full bg-slate-950 overflow-hidden',
  priority = false,
  scientificName,
  isReconstruction,
  isMicroscopic,
  magnification,
}) => {
  // Source resolution list
  const sources = [src, secondarySrc, fallbackSrc].filter(Boolean) as string[];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hasErrorAll, setHasErrorAll] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Reset when primary src changes
  useEffect(() => {
    setCurrentIndex(0);
    setHasErrorAll(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    if (currentIndex + 1 < sources.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setHasErrorAll(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const currentUrl = sources[currentIndex] || src;

  return (
    <div className={containerClassName}>
      {/* 1. Subtle Animated Loading State Skeleton */}
      {isLoading && !hasErrorAll && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/90 text-slate-400 p-4 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin mb-2" />
          <div className="text-[11px] font-medium tracking-wide flex items-center gap-1.5 text-slate-300">
            <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Finding species photograph...</span>
          </div>
        </div>
      )}

      {/* 2. Real Image Element with Resilient Error Handling */}
      {!hasErrorAll ? (
        <img
          key={currentUrl}
          src={currentUrl}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : (
        /* 3. Guaranteed Tier-4 Scientific Vector Fallback (Zero empty boxes) */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-center select-none border border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-2 shadow-inner">
            <Compass className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="font-display font-bold text-sm text-slate-200 truncate max-w-full">
            {alt}
          </div>
          {scientificName && (
            <div className="font-serif italic text-xs text-emerald-400/80 truncate max-w-full mt-0.5">
              {scientificName}
            </div>
          )}
          <div className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-wider">
            Natural History Catalog Visual
          </div>
        </div>
      )}

      {/* 4. Scientific Badges (Reconstruction / Microscopic) */}
      {isReconstruction && (
        <span className="absolute top-2.5 left-2.5 text-[10px] font-mono font-semibold bg-purple-950/90 text-purple-200 border border-purple-800/80 px-2 py-0.5 rounded-md backdrop-blur-sm z-20 shadow-md">
          Scientific Reconstruction
        </span>
      )}

      {isMicroscopic && (
        <span className="absolute top-2.5 left-2.5 text-[10px] font-mono font-semibold bg-cyan-950/90 text-cyan-200 border border-cyan-800/80 px-2 py-0.5 rounded-md backdrop-blur-sm z-20 shadow-md">
          {magnification ? 'Microscopic (Magnified)' : 'Microscopic Life'}
        </span>
      )}
    </div>
  );
};
