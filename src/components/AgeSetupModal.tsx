import React, { useState } from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { ShieldCheck, Sparkles, BookOpen, Compass, ArrowRight } from 'lucide-react';

interface AgeSetupModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const AgeSetupModal: React.FC<AgeSetupModalProps> = ({ isOpen, onClose }) => {
  const { profile, completeSetup } = useBioSphere();
  const [selectedAge, setSelectedAge] = useState<number>(profile.age || 9);
  const [selectedLevel, setSelectedLevel] = useState<
    'Beginner' | 'Curious Explorer' | 'Young Scientist'
  >(
    selectedAge <= 7
      ? 'Beginner'
      : selectedAge >= 11
      ? 'Young Scientist'
      : 'Curious Explorer'
  );

  if (!isOpen) return null;

  const handleAgeChange = (age: number) => {
    setSelectedAge(age);
    if (age <= 7) setSelectedLevel('Beginner');
    else if (age <= 10) setSelectedLevel('Curious Explorer');
    else setSelectedLevel('Young Scientist');
  };

  const handleStart = () => {
    completeSetup(selectedAge, selectedLevel);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Who are we exploring with today?
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              BioSphere Explorer adapts vocabulary, scientific complexity, and interactive activities to your child's age.
            </p>
          </div>

          {/* Age Selection Buttons */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-200">
                Child's Age
              </label>
              <span className="text-xs font-semibold text-emerald-400">
                {selectedAge} Years Old
              </span>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 sm:gap-2">
              {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(a => {
                const isSelected = selectedAge === a;
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => handleAgeChange(a)}
                    className={`py-2 text-sm font-semibold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 font-bold scale-105 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                    }`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Learning Track / Level Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              Learning Profile Focus
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'Beginner',
                  title: 'Beginner',
                  ageHint: 'Ages 5–7',
                  desc: 'Short sentences, large pictures, fun facts, simple words.',
                },
                {
                  id: 'Curious Explorer',
                  title: 'Curious Explorer',
                  ageHint: 'Ages 8–10',
                  desc: 'Habitats, food chains, adaptations, and behavior.',
                },
                {
                  id: 'Young Scientist',
                  title: 'Young Scientist',
                  ageHint: 'Ages 11–15',
                  desc: 'Scientific taxonomy, evolutionary biology, and research.',
                },
              ].map(level => {
                const active = selectedLevel === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() =>
                      setSelectedLevel(
                        level.id as 'Beginner' | 'Curious Explorer' | 'Young Scientist'
                      )
                    }
                    className={`p-3 text-left rounded-xl transition-all border ${
                      active
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-white ring-1 ring-emerald-500/40'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{level.title}</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {level.ageHint}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {level.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Child Privacy & Reassurance Banner */}
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl mb-6 flex items-start gap-2.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-300">Child Privacy Guarantee:</strong> We use age{' '}
              <em>only</em> to adjust educational content and vocabulary. We never collect names,
              emails, locations, or personal data. Settings can be changed anytime by a parent.
            </p>
          </div>

          {/* Start Button */}
          <button
            type="button"
            onClick={handleStart}
            className="w-full py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/60 transition-all duration-200"
          >
            <span>Start Exploring BioSphere</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
