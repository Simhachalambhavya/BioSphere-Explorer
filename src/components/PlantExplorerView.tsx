import React, { useState } from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { ORGANISMS, HERO_ASSETS } from '../data/organisms';
import { OrganismCard } from './OrganismCard';
import { Sun, Droplets, Wind, Sparkles, CheckCircle2 } from 'lucide-react';

export const PlantExplorerView: React.FC = () => {
  const { navigateToOrganism } = useBioSphere();
  const [activeStage, setActiveStage] = useState<'sun' | 'water' | 'co2' | 'sugar' | 'oxygen'>('sun');

  const plants = ORGANISMS.filter(o => o.category === 'plants');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Plant Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_ASSETS.heroBanner}
            alt="Lush green canopy and plant world"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <span className="text-base">🌱</span>
            <span>Botanical Expedition · Kingdom Plantae</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            The Solar Engines of the Living World
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From towering oak trees to delicate mosses and carnivorous snap traps, plants are the
            primary producers of the biosphere, transforming sunlight into life-giving oxygen and food.
          </p>

          <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Did You Know?</strong> Every single breath of oxygen you take was created by
              photosynthetic plants, trees, and marine algae!
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Photosynthesis Engine */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" />
              <span>How Photosynthesis Works</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click each element in the equation to see how green leaves make food out of thin air.
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-400 font-bold bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            6CO₂ + 6H₂O + Solar Energy → C₆H₁₂O₆ + 6O₂
          </div>
        </div>

        {/* Visual Reaction Pathway Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { id: 'sun', label: '1. Sunlight', icon: '☀️', color: 'border-amber-500 text-amber-300' },
            { id: 'water', label: '2. Water (H₂O)', icon: '💧', color: 'border-sky-500 text-sky-300' },
            { id: 'co2', label: '3. Carbon Dioxide', icon: '💨', color: 'border-teal-500 text-teal-300' },
            { id: 'sugar', label: '4. Glucose (Sugar)', icon: '🍯', color: 'border-emerald-500 text-emerald-300' },
            { id: 'oxygen', label: '5. Clean Oxygen (O₂)', icon: '🫧', color: 'border-cyan-500 text-cyan-300' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveStage(item.id as any)}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeStage === item.id
                  ? 'bg-slate-950 ring-2 ring-emerald-400 font-bold ' + item.color
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span className="text-2xl block mb-1">{item.icon}</span>
              <span className="text-xs font-semibold block">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Detail Card for Selected Element */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
          {activeStage === 'sun' && (
            <div>
              <h4 className="font-bold text-amber-400 text-sm">Solar Energy: Light Photons</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                Green plant leaves contain tiny solar panels called chloroplasts packed with chlorophyll pigments.
                Chlorophyll absorbs red and blue light wavelengths while bouncing green light away—which is why plants look green to our eyes!
              </p>
            </div>
          )}
          {activeStage === 'water' && (
            <div>
              <h4 className="font-bold text-sky-400 text-sm">Water Uptake from Roots (Xylem)</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                Deep root networks absorb rainfall and dissolved soil minerals. Microscopic plumbing pipes inside the stem
                called xylem pull water up to the highest leaves using capillary action and transpirational suction pull.
              </p>
            </div>
          )}
          {activeStage === 'co2' && (
            <div>
              <h4 className="font-bold text-teal-400 text-sm">Carbon Dioxide (CO₂) Through Stomata</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                The underside of leaves is covered in millions of microscopic breathing mouths called stomata.
                They open to inhale carbon dioxide gas exhaled by animals and engines, helping clean our atmosphere!
              </p>
            </div>
          )}
          {activeStage === 'sugar' && (
            <div>
              <h4 className="font-bold text-emerald-400 text-sm">Glucose: Plant Food & Energy</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                Using solar energy to split water molecules, the plant combines carbon, hydrogen, and oxygen into glucose sugars.
                Another set of tubes called phloem delivers this sweet food to roots, fruits, flowers, and growing wood.
              </p>
            </div>
          )}
          {activeStage === 'oxygen' && (
            <div>
              <h4 className="font-bold text-cyan-400 text-sm">Clean Oxygen Gas Released</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                As a wonderful gift to all living animals, plants release fresh oxygen gas through their leaf stomata back into the air,
                allowing humans, birds, mammals, and fish to breathe and stay alive!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Plant Anatomy Breakdown */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <h3 className="font-display font-bold text-xl text-white">
          The Anatomy of a Plant
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-emerald-400">1. Roots</span>
            <p className="text-slate-400 leading-relaxed">
              Anchors the plant in soil and absorbs vital moisture and mineral nitrates from the ground.
            </p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-emerald-400">2. Stem & Trunk</span>
            <p className="text-slate-400 leading-relaxed">
              Provides vertical support toward the sun and houses vascular transport pipelines (xylem and phloem).
            </p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-emerald-400">3. Leaves</span>
            <p className="text-slate-400 leading-relaxed">
              Solar collectors filled with green chlorophyll that conduct photosynthesis and transpiration.
            </p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-emerald-400">4. Flowers</span>
            <p className="text-slate-400 leading-relaxed">
              Reproductive organs featuring colorful petals and sweet nectar designed to attract pollinating bees and birds.
            </p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-emerald-400">5. Seeds & Fruit</span>
            <p className="text-slate-400 leading-relaxed">
              Protected baby plants packaged with nutrient reserves, designed to be carried away by wind or animals.
            </p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-emerald-400">6. Carnivorous Traps</span>
            <p className="text-slate-400 leading-relaxed">
              Specialized leaves (like the Venus flytrap) that catch insects to absorb nitrogen missing in bog soil!
            </p>
          </div>
        </div>
      </div>

      {/* Featured Plants */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
          Featured Botanical Organisms
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((org) => (
            <OrganismCard key={org.id} organism={org} />
          ))}
        </div>
      </div>
    </div>
  );
};
