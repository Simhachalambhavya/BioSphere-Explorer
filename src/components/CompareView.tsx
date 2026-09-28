import React, { useState } from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { ORGANISMS } from '../data/organisms';
import { Scale, ArrowRight, Check, Sparkles } from 'lucide-react';

export const CompareView: React.FC = () => {
  const { compareOrganisms, setCompareSelection, ageBand, profile } = useBioSphere();
  const [orgAId, setOrgAId] = useState<string>(compareOrganisms[0] || 'orca');
  const [orgBId, setOrgBId] = useState<string>(compareOrganisms[1] || 'bottlenose-dolphin');
  const [aiInsight, setAiInsight] = useState<{ keySimilarity: string; differences: string[]; surprisingFact: string } | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  const orgA = ORGANISMS.find(o => o.id === orgAId) || ORGANISMS[0];
  const orgB = ORGANISMS.find(o => o.id === orgBId) || ORGANISMS[2];

  const handleCompare = async () => {
    setLoadingAi(true);
    try {
      const res = await fetch('/api/gemini/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organismA: orgA.commonName,
          organismB: orgB.commonName,
          age: profile.age,
        }),
      });
      const data = await res.json();
      setAiInsight(data);
    } catch {
      setAiInsight({
        keySimilarity: `Both ${orgA.commonName} and ${orgB.commonName} have evolved specialized physiological systems adapted to their respective environments.`,
        differences: [
          `${orgA.commonName} occupies the ${orgA.habitatCategory} biome, whereas ${orgB.commonName} is found in ${orgB.habitatCategory}.`,
          `Dietary trophic role: ${orgA.dietLabel} vs ${orgB.dietLabel}.`,
          `Locomotion and respiration mechanics: ${orgA.breathingMethod} vs ${orgB.breathingMethod}.`,
        ],
        surprisingFact: `All life forms on Earth trace back to a single shared universal ancestor, sharing core DNA codes despite outward anatomical variety.`,
      });
    } finally {
      setLoadingAi(false);
    }
  };

  const comparisonAttributes = [
    { label: 'Category / Group', valA: orgA.categoryLabel, valB: orgB.categoryLabel },
    { label: 'Primary Habitat', valA: orgA.habitat, valB: orgB.habitat },
    { label: 'Diet Classification', valA: orgA.dietLabel, valB: orgB.dietLabel },
    { label: 'Breathing Mechanism', valA: orgA.breathingMethod, valB: orgB.breathingMethod },
    { label: 'Body Covering', valA: orgA.bodyCovering, valB: orgB.bodyCovering },
    { label: 'Movement / Locomotion', valA: orgA.locomotion, valB: orgB.locomotion },
    { label: 'Average Size', valA: orgA.size, valB: orgB.size },
    { label: 'Average Lifespan', valA: orgA.lifespan, valB: orgB.lifespan },
    { label: 'Conservation Status', valA: orgA.conservationStatus.replace('_', ' '), valB: orgB.conservationStatus.replace('_', ' ') },
    { label: 'Human Safety Indicator', valA: `${orgA.humanSafety.scoreOutOf10}/10 (${orgA.humanSafety.level})`, valB: `${orgB.humanSafety.scoreOutOf10}/10 (${orgB.humanSafety.level})` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <Scale className="w-4 h-4" />
          <span>Comparative Biology</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
          Compare Living Organisms
        </h2>
        <p className="text-slate-400 text-sm">
          Select any two life forms to examine their similarities, differences, and ecological roles side-by-side.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Selector A */}
        <div className="w-full sm:w-72">
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Organism 1
          </label>
          <select
            value={orgAId}
            onChange={(e) => {
              setOrgAId(e.target.value);
              setAiInsight(null);
            }}
            className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {ORGANISMS.map(o => (
              <option key={o.id} value={o.id} disabled={o.id === orgBId}>
                {o.commonName} ({o.categoryLabel})
              </option>
            ))}
          </select>
        </div>

        <div className="p-2.5 rounded-full bg-slate-800 text-emerald-400 shrink-0">
          <Scale className="w-5 h-5" />
        </div>

        {/* Selector B */}
        <div className="w-full sm:w-72">
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Organism 2
          </label>
          <select
            value={orgBId}
            onChange={(e) => {
              setOrgBId(e.target.value);
              setAiInsight(null);
            }}
            className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {ORGANISMS.map(o => (
              <option key={o.id} value={o.id} disabled={o.id === orgAId}>
                {o.commonName} ({o.categoryLabel})
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2 sm:pt-5">
          <button
            onClick={handleCompare}
            disabled={loadingAi}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{loadingAi ? 'Analyzing...' : 'Generate AI Comparison'}</span>
          </button>
        </div>
      </div>

      {/* AI Comparison Analysis Box (if generated) */}
      {aiInsight && (
        <div className="p-6 bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Age-Adapted Comparison Insight (Age {profile.age})</span>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Key Shared Trait:</div>
            <p className="text-sm text-slate-200 mt-0.5 leading-relaxed">
              {aiInsight.keySimilarity}
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Major Distinctions:</div>
            <ul className="space-y-1 text-xs sm:text-sm text-slate-300">
              {aiInsight.differences.map((diff, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">●</span>
                  <span>{diff}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
            <strong className="text-emerald-400">Surprising Connection:</strong>{' '}
            {aiInsight.surprisingFact}
          </div>
        </div>
      )}

      {/* Side-by-Side Visual Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card A */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={orgA.heroImage}
              alt={orgA.commonName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl text-white">
              {orgA.commonName}
            </h3>
            <div className="text-xs font-serif italic text-emerald-400">
              {orgA.scientificName}
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {orgA.ageAdaptations[ageBand].summary}
            </p>
          </div>
        </div>

        {/* Card B */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={orgB.heroImage}
              alt={orgB.commonName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl text-white">
              {orgB.commonName}
            </h3>
            <div className="text-xs font-serif italic text-teal-400">
              {orgB.scientificName}
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {orgB.ageAdaptations[ageBand].summary}
            </p>
          </div>
        </div>
      </div>

      {/* Attribute Comparison Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950 border-b border-slate-800 text-xs font-bold text-slate-300 uppercase tracking-wider">
          Direct Anatomical & Ecological Comparison
        </div>

        <div className="divide-y divide-slate-800/80 text-xs">
          {comparisonAttributes.map((attr, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 p-3.5 sm:p-4 hover:bg-slate-800/30 transition-colors gap-2 items-center"
            >
              <div className="md:col-span-4 font-semibold text-slate-400">
                {attr.label}
              </div>
              <div className="md:col-span-4 text-slate-200 font-medium">
                {attr.valA}
              </div>
              <div className="md:col-span-4 text-slate-200 font-medium">
                {attr.valB}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
