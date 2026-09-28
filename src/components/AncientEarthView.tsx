import React, { useState } from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { ORGANISMS, HERO_ASSETS } from '../data/organisms';
import { OrganismCard } from './OrganismCard';
import { Compass, Sparkles, Clock, AlertCircle } from 'lucide-react';

export const AncientEarthView: React.FC = () => {
  const { navigateToOrganism } = useBioSphere();
  const [selectedEra, setSelectedEra] = useState<'all' | 'mesozoic' | 'cenozoic' | 'paleozoic'>('all');

  const dinosaurs = ORGANISMS.filter(o => o.category === 'dinosaurs' || o.isExtinct);

  const timelineEras = [
    {
      id: 'paleozoic',
      name: 'Paleozoic Era',
      period: '541–252 Million Years Ago',
      desc: 'The Age of Invertebrates, early fish, amphibians, and the first swamp forests.',
      keyEvents: ['Cambrian Explosion of animal body plans', 'First land plants & arthropods', 'Great Permian Extinction'],
    },
    {
      id: 'mesozoic',
      name: 'Mesozoic Era',
      period: '252–66 Million Years Ago',
      desc: 'The celebrated Age of Dinosaurs (Triassic, Jurassic, and Cretaceous periods).',
      keyEvents: ['Rise of gigantic sauropods & theropods', 'First flowering plants and birds', 'Chicxulub Asteroid Impact'],
    },
    {
      id: 'cenozoic',
      name: 'Cenozoic Era',
      period: '66 Million Years Ago to Today',
      desc: 'The Age of Mammals, modern birds, grasses, and human civilizations.',
      keyEvents: ['Mammalian adaptive radiation', 'Pleistocene Ice Ages (Mammoths)', 'Modern living biodiversity'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Ancient Earth Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_ASSETS.dinosaurWorld}
            alt="Prehistoric Cretaceous forest landscape with dinosaurs"
            className="w-full h-full object-cover opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 uppercase tracking-wider">
            <span className="text-base">🦖</span>
            <span>Prehistoric Expedition · Ancient Earth</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Journey Back in Deep Time
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Long before humans walked the Earth, magnificent prehistoric creatures ruled primeval
            forests, ancient seas, and skies. Discover how extinct organisms lived, hunted, and adapted.
          </p>

          <div className="p-3 bg-purple-950/40 border border-purple-800/40 rounded-xl text-xs text-purple-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>
              <strong>Scientific Fact:</strong> Extinct organisms are no longer alive today, but their
              living descendants include modern birds, which evolved directly from feathered theropod dinosaurs!
            </span>
          </div>
        </div>
      </div>

      {/* Geological Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>Earth’s Geological Timeline</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">4.5 Billion Years of Life</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {timelineEras.map((era) => (
            <div
              key={era.id}
              className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {era.period}
                </span>
              </div>
              <h4 className="font-display font-bold text-lg text-white">
                {era.name}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {era.desc}
              </p>
              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-400 mb-1">Key Milestones:</div>
                <ul className="space-y-0.5 text-[11px] text-slate-400">
                  {era.keyEvents.map((evt, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-emerald-400 text-xs">●</span>
                      <span>{evt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prehistoric Organism Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Prehistoric Organisms
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Explore bone-crushing predators and armored herbivores of the Cretaceous.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dinosaurs.map((org) => (
            <OrganismCard key={org.id} organism={org} />
          ))}
        </div>
      </div>

      {/* How Fossils Form Interactive Explainer */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <h4 className="font-display font-bold text-lg text-white">
          How do we know about ancient dinosaurs?
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
            <span className="font-mono text-emerald-400 font-bold text-sm">Step 1</span>
            <div className="font-bold text-white">Rapid Burial</div>
            <p className="text-slate-400 leading-relaxed">
              When an animal died near a river or lake, sand and mud rapidly washed over its skeleton, protecting it from scavengers and air.
            </p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
            <span className="font-mono text-emerald-400 font-bold text-sm">Step 2</span>
            <div className="font-bold text-white">Mineral Permineralization</div>
            <p className="text-slate-400 leading-relaxed">
              Over millions of years, water carrying dissolved silica and calcium seeped through the bone pores, turning organic material into stone!
            </p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
            <span className="font-mono text-emerald-400 font-bold text-sm">Step 3</span>
            <div className="font-bold text-white">Discovery & Reconstruction</div>
            <p className="text-slate-400 leading-relaxed">
              Natural erosion or paleontology digs reveal the petrified fossils, allowing scientists to reconstruct ancient skeletons and study their life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
