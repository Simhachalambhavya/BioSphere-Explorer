import React, { useState, useEffect } from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { ORGANISMS } from '../data/organisms';
import { Organism } from '../types/organism';
import { Sparkles, ArrowRight, CheckCircle2, XCircle, Compass } from 'lucide-react';

export const TodayDiscoveryCard: React.FC = () => {
  const { profile, ageBand, navigateToOrganism, recordQuizScore } = useBioSphere();
  const [organism, setOrganism] = useState<Organism>(ORGANISMS[14]); // default Axolotl or daily
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  useEffect(() => {
    // Pick today's organism based on day of year to ensure daily consistency without duplicates
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    const index = dayOfYear % ORGANISMS.length;
    setOrganism(ORGANISMS[index] || ORGANISMS[0]);
    setSelectedQuizAnswer(null);
    setHasAnswered(false);
  }, []);

  const quiz = organism.fallbackQuiz[0];

  const handleAnswer = (index: number) => {
    if (hasAnswered) return;
    setSelectedQuizAnswer(index);
    setHasAnswered(true);
    const isCorrect = index === quiz.correctIndex;
    recordQuizScore(isCorrect ? 1 : 0, 1);
  };

  const ageData = organism.ageAdaptations[ageBand];

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span className="uppercase tracking-wider">Today's Daily Discovery</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Habitat: {organism.habitatCategory}</span>
            <span aria-hidden="true">·</span>
            <span>Level: {profile.explorerLevel}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Organism Visual & Hero Link */}
          <div className="md:col-span-4 relative group">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative shadow-inner">
              <img
                src={organism.heroImage}
                alt={organism.commonName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-semibold text-emerald-300 font-mono">
                  {organism.dietLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Organism Info & Age-adapted Summary */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {organism.commonName}
                </h3>
                {profile.age >= 8 && (
                  <span className="text-xs italic text-slate-400 font-serif">
                    ({organism.scientificName})
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {ageData.summary}
              </p>
            </div>

            {/* 3 Quick Facts */}
            <div className="space-y-1.5 pt-1">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Discovery Highlights:
              </div>
              <ul className="space-y-1 text-xs text-slate-300">
                {organism.amazingFacts.slice(0, 3).map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">{idx + 1}.</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Daily Mini-Quiz */}
            {quiz && (
              <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl mt-3">
                <div className="text-xs font-semibold text-slate-200 mb-2 flex items-center justify-between">
                  <span>Daily Explorer Question:</span>
                  <span className="text-[11px] text-emerald-400">Earn 10 XP</span>
                </div>
                <p className="text-xs text-slate-300 mb-2.5 font-medium">
                  {quiz.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {quiz.options.map((opt, idx) => {
                    let btnStyle = 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800';
                    if (hasAnswered) {
                      if (idx === quiz.correctIndex) {
                        btnStyle = 'bg-emerald-950 text-emerald-300 border-emerald-500 font-semibold';
                      } else if (idx === selectedQuizAnswer) {
                        btnStyle = 'bg-rose-950 text-rose-300 border-rose-500 line-through';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAnswer(idx)}
                        disabled={hasAnswered}
                        className={`p-2 text-xs rounded-lg text-left border transition-colors flex items-center justify-between ${btnStyle}`}
                      >
                        <span className="truncate">{opt}</span>
                        {hasAnswered && idx === quiz.correctIndex && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                        )}
                        {hasAnswered && idx === selectedQuizAnswer && idx !== quiz.correctIndex && (
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {hasAnswered && (
                  <p className="text-[11px] text-slate-400 mt-2 italic animate-in fade-in">
                    {quiz.explanation}
                  </p>
                )}
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Conservation:{' '}
                <span className="font-semibold text-slate-200 capitalize">
                  {organism.conservationStatus.replace('_', ' ')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigateToOrganism(organism.id)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <span>Full Expedition Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
