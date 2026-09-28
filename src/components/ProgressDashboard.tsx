import React from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { ORGANISMS, HABITATS_INFO, CATEGORIES_INFO } from '../data/organisms';
import { OrganismCard } from './OrganismCard';
import { Award, Compass, Heart, CheckCircle2, BookOpen, Layers } from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
  const { profile, navigateToOrganism, setActiveView } = useBioSphere();

  const totalOrganisms = ORGANISMS.length;
  const discoveredCount = profile.discoveredOrganismIds.length;
  const totalHabitats = Object.keys(HABITATS_INFO).length;
  const exploredHabitatsCount = profile.exploredHabitats.length;

  const quizTotal = profile.quizStats.questionsAnswered;
  const quizCorrect = profile.quizStats.correctAnswers;
  const accuracy = quizTotal > 0 ? Math.round((quizCorrect / quizTotal) * 100) : 100;

  // Favorites list
  const favoriteOrganisms = ORGANISMS.filter(o => profile.favorites.includes(o.id));

  const allPossibleBadges = [
    {
      id: 'first-discovery',
      name: 'Curious Naturalist',
      icon: '🌱',
      desc: 'Began the voyage of discovering Earth\'s biodiversity.',
      unlocked: profile.badges.some(b => b.id === 'first-discovery') || discoveredCount >= 1,
    },
    {
      id: 'ocean-explorer',
      name: 'Ocean Explorer',
      icon: '🌊',
      desc: 'Explored deep marine creatures and oceanic food webs.',
      unlocked: profile.badges.some(b => b.id === 'ocean-explorer') || profile.exploredHabitats.includes('oceans'),
    },
    {
      id: 'dino-discoverer',
      name: 'Dinosaur Discoverer',
      icon: '🦖',
      desc: 'Uncovered prehistoric titans of ancient deep time.',
      unlocked: profile.badges.some(b => b.id === 'dino-discoverer') || profile.discoveredOrganismIds.includes('tyrannosaurus-rex') || profile.discoveredOrganismIds.includes('triceratops'),
    },
    {
      id: 'plant-detective',
      name: 'Plant Detective',
      icon: '🌿',
      desc: 'Investigated photosynthesis and botanical adaptations.',
      unlocked: profile.badges.some(b => b.id === 'plant-detective') || profile.discoveredOrganismIds.includes('english-oak') || profile.discoveredOrganismIds.includes('venus-flytrap'),
    },
    {
      id: 'microbe-master',
      name: 'Microbe Explorer',
      icon: '🔬',
      desc: 'Journeyed into the hidden universe of microscopic cells.',
      unlocked: profile.badges.some(b => b.id === 'microbe-master') || profile.discoveredOrganismIds.includes('tardigrade') || profile.discoveredOrganismIds.includes('cyanobacteria'),
    },
    {
      id: 'master-naturalist',
      name: 'Master Naturalist',
      icon: '🏅',
      desc: 'Discovered ten distinct species across Earth\'s kingdoms.',
      unlocked: profile.badges.some(b => b.id === 'master-naturalist') || discoveredCount >= 10,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>My Explorer Expedition Log</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
          Learning & Discovery Progress
        </h2>
        <p className="text-slate-400 text-sm">
          Track your personal journey through Earth’s ecosystems and celebrate your badges!
        </p>
      </div>

      {/* Stats Cards Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <div className="text-xs font-semibold text-slate-400">Organisms Discovered</div>
          <div className="font-display font-extrabold text-3xl text-emerald-400 font-mono">
            {discoveredCount} <span className="text-sm font-normal text-slate-500">/ {totalOrganisms}</span>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (discoveredCount / totalOrganisms) * 100)}%` }}
            />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <div className="text-xs font-semibold text-slate-400">Habitats Explored</div>
          <div className="font-display font-extrabold text-3xl text-sky-400 font-mono">
            {exploredHabitatsCount} <span className="text-sm font-normal text-slate-500">/ {totalHabitats}</span>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-sky-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (exploredHabitatsCount / totalHabitats) * 100)}%` }}
            />
          </div>
        </div>

        {/* Stat 3 */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <div className="text-xs font-semibold text-slate-400">Questions Answered</div>
          <div className="font-display font-extrabold text-3xl text-amber-400 font-mono">
            {quizTotal}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {quizCorrect} Correct Answers
          </div>
        </div>

        {/* Stat 4 */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <div className="text-xs font-semibold text-slate-400">Quiz Accuracy</div>
          <div className="font-display font-extrabold text-3xl text-teal-400 font-mono">
            {accuracy}%
          </div>
          <div className="text-[11px] text-slate-400">
            {accuracy >= 80 ? 'Master Naturalist Level!' : 'Keep Practicing!'}
          </div>
        </div>
      </div>

      {/* Explorer Badges Grid */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Explorer Expedition Badges</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Unlock special medals by investigating different kingdoms of life.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-400 font-mono">
            {allPossibleBadges.filter(b => b.unlocked).length} / {allPossibleBadges.length} Earned
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPossibleBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                badge.unlocked
                  ? 'bg-slate-950/80 border-amber-500/40 shadow-md'
                  : 'bg-slate-950/30 border-slate-800/60 opacity-50 grayscale'
              }`}
            >
              <span className="text-3xl shrink-0 p-2 rounded-xl bg-slate-900 border border-slate-800">
                {badge.icon}
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-white">{badge.name}</h4>
                  {badge.unlocked && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Favorites Showcase Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>Bookmarked Favorites ({favoriteOrganisms.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Quick access to your saved organisms.
            </p>
          </div>
          {favoriteOrganisms.length > 0 && (
            <button
              onClick={() => setActiveView('explore')}
              className="text-xs text-emerald-400 hover:underline"
            >
              Explore more organisms →
            </button>
          )}
        </div>

        {favoriteOrganisms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteOrganisms.map((org) => (
              <OrganismCard key={org.id} organism={org} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto space-y-3">
            <Heart className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="font-bold text-white text-base">
              You haven't discovered a favorite yet.
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Click the heart icon on any organism profile to save it here for quick reference during your expeditions!
            </p>
            <button
              onClick={() => setActiveView('explore')}
              className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-emerald-400 transition-colors"
            >
              Start Exploring Life
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
