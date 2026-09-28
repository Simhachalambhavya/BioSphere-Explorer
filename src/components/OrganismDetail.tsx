import React, { useState } from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { Organism, BodyPart } from '../types/organism';
import {
  Heart,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  GitBranch,
  Layers,
  ChevronDown,
  ChevronUp,
  Scale,
} from 'lucide-react';

interface OrganismDetailProps {
  organism: Organism;
}

export const OrganismDetail: React.FC<OrganismDetailProps> = ({ organism }) => {
  const {
    profile,
    ageBand,
    toggleFavorite,
    isFavorite,
    recordQuizScore,
    speakText,
    stopSpeaking,
    isSpeaking,
    setCompareSelection,
    setAge,
  } = useBioSphere();

  // Active interactive body part
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>(
    organism.bodyParts[0] || {
      id: 'core',
      name: 'Main Body',
      function: 'Living System',
      description: 'The core anatomy of this organism.',
      x: 50,
      y: 50,
    }
  );

  // Taxonomy tree expand
  const [taxonomyExpanded, setTaxonomyExpanded] = useState<boolean>(profile.age >= 11);

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // AI Ask state
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Story state
  const [storySpeaking, setStorySpeaking] = useState<boolean>(false);

  const favorite = isFavorite(organism.id);
  const currentAgeAdapted = organism.ageAdaptations[ageBand];

  // Conservation status indicator styling
  const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    least_concern: { label: 'Least Concern', color: 'text-emerald-400', bg: 'bg-emerald-950/60 border-emerald-800', dot: 'bg-emerald-400' },
    near_threatened: { label: 'Near Threatened', color: 'text-yellow-400', bg: 'bg-yellow-950/60 border-yellow-800', dot: 'bg-yellow-400' },
    vulnerable: { label: 'Vulnerable', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-800', dot: 'bg-amber-400' },
    endangered: { label: 'Endangered', color: 'text-orange-400', bg: 'bg-orange-950/60 border-orange-800', dot: 'bg-orange-400' },
    critically_endangered: { label: 'Critically Endangered', color: 'text-rose-400', bg: 'bg-rose-950/60 border-rose-800', dot: 'bg-rose-400' },
    extinct: { label: 'Extinct (Prehistoric)', color: 'text-purple-400', bg: 'bg-purple-950/60 border-purple-800', dot: 'bg-purple-400' },
  };

  const statusInfo = statusConfig[organism.conservationStatus] || statusConfig.least_concern;

  // Ask AI handler
  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    setIsAiLoading(true);
    setAiAnswer(null);

    try {
      const response = await fetch('/api/gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userQuestion,
          organismName: organism.commonName,
          age: profile.age,
          context: `Scientific Name: ${organism.scientificName}, Habitat: ${organism.habitat}, Diet: ${organism.dietLabel}`,
        }),
      });

      const data = await response.json();
      setAiAnswer(data.answer || 'Thank you for your curious inquiry! Keep exploring.');
    } catch {
      setAiAnswer(
        `Great question about ${organism.commonName}! In nature, this organism relies on its unique adaptations in its ${organism.habitat} home to survive and thrive.`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  // Quiz submission
  const currentQuiz = organism.fallbackQuiz[currentQuizIndex];

  const handleSelectQuizOption = (index: number) => {
    if (quizSubmitted) return;
    setSelectedOption(index);
    setQuizSubmitted(true);

    const isCorrect = index === currentQuiz.correctIndex;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      recordQuizScore(1, 1);
    } else {
      recordQuizScore(0, 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex + 1 < organism.fallbackQuiz.length) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setQuizSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  // Resolve age-adapted biological descriptions safely across all age bands
  const howItBreathes =
    'howItBreathes' in currentAgeAdapted
      ? (currentAgeAdapted as any).howItBreathes
      : 'physiology' in currentAgeAdapted
      ? (currentAgeAdapted as any).physiology
      : organism.breathingMethod;

  const whatItEats =
    'whatItEats' in currentAgeAdapted
      ? (currentAgeAdapted as any).whatItEats
      : 'ecologicalNiche' in currentAgeAdapted
      ? (currentAgeAdapted as any).ecologicalNiche
      : organism.dietLabel;

  const howItMoves =
    'howItMoves' in currentAgeAdapted ? (currentAgeAdapted as any).howItMoves : organism.locomotion;

  const howItProtects =
    'howItProtects' in currentAgeAdapted
      ? (currentAgeAdapted as any).howItProtects
      : 'adaptationsSummary' in currentAgeAdapted
      ? (currentAgeAdapted as any).adaptationsSummary
      : organism.adaptations.join('; ');

  return (
    <div className="w-full bg-slate-950 text-slate-100 pb-20">
      {/* 1. HERO BANNER WITH QUICK PROFILE */}
      <section className="relative w-full bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Unboxed breadcrumb metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 mb-4">
            <span className="capitalize">{organism.categoryLabel}</span>
            <span aria-hidden="true">/</span>
            <span className="capitalize">{organism.habitatCategory.replace('_', ' ')}</span>
            <span aria-hidden="true">/</span>
            <span className="text-emerald-400 font-semibold">{organism.commonName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Large Visual Stage with Favorite & Audio read out */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
                <img
                  src={organism.heroImage}
                  alt={organism.commonName}
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20" />

                {/* Floating Action Controls */}
                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                  <button
                    onClick={() => speakText(`${organism.commonName}. ${currentAgeAdapted.summary}`)}
                    className="p-2.5 rounded-xl bg-slate-900/85 backdrop-blur-md text-slate-200 hover:text-emerald-400 border border-slate-700/60 transition-colors shadow-lg"
                    title={isSpeaking ? 'Stop speaking' : 'Read profile aloud'}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4 text-emerald-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => toggleFavorite(organism.id)}
                    className="p-2.5 rounded-xl bg-slate-900/85 backdrop-blur-md text-slate-200 hover:text-rose-400 border border-slate-700/60 transition-colors shadow-lg"
                    title={favorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                    {organism.dietLabel}
                  </span>
                  {organism.geologicalEra && (
                    <span className="bg-purple-950/80 text-purple-300 px-2.5 py-1 rounded-md border border-purple-800">
                      {organism.geologicalEra}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Title, Adaptive Summary, and Quick Profile Data Matrix */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                    {organism.commonName}
                  </h1>
                </div>
                <p className="font-serif italic text-base text-emerald-400 mt-1">
                  {organism.scientificName}
                </p>

                {/* Age-Adaptive Summary Card */}
                <div className="mt-4 p-4 bg-slate-950/80 border border-slate-800 rounded-xl relative">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1 pb-1 border-b border-slate-800/80">
                    <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Adapted for Learner Age {profile.age}
                    </span>
                    <button
                      onClick={() => setAge(profile.age <= 8 ? 12 : 7)}
                      className="text-[11px] text-slate-400 hover:text-emerald-300 underline"
                      title="Switch age level"
                    >
                      {profile.age <= 8 ? 'Try Scientist View (Age 12)' : 'Try Beginner View (Age 7)'}
                    </button>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans mt-2">
                    {currentAgeAdapted.summary}
                  </p>
                </div>
              </div>

              {/* Quick Profile Metric Grid */}
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Quick Profile
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="text-slate-500 font-medium">Habitat</div>
                    <div className="text-slate-200 font-semibold mt-0.5">{organism.habitatCategory}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Life Group</div>
                    <div className="text-slate-200 font-semibold mt-0.5">{organism.categoryLabel}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Diet Type</div>
                    <div className="text-slate-200 font-semibold mt-0.5 capitalize">{organism.diet.replace('_', ' ')}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Breathing</div>
                    <div className="text-slate-200 font-semibold mt-0.5 truncate">{organism.breathingMethod.split(' ')[0]}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Covering</div>
                    <div className="text-slate-200 font-semibold mt-0.5 truncate">{organism.bodyCovering.split(' ')[0]}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Average Size</div>
                    <div className="text-slate-200 font-semibold mt-0.5 truncate">{organism.size}</div>
                  </div>
                </div>
              </div>

              {/* Fast Jump / Action buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setCompareSelection(organism.id, 'bottlenose-dolphin')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Scale className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Compare Organisms</span>
                </button>
                <a
                  href="#quiz-section"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <span>Take Age-Adaptive Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "HOW DOES IT WORK?" BIOLOGY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Biological Systems & Anatomy</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            How Does It Work?
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Understanding the living physiology and daily survival mechanics of {organism.commonName}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Breathing */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="text-xl">🫁</span>
              <h3>How does it breathe?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {howItBreathes}
            </p>
            <div className="text-[11px] font-mono text-emerald-400 pt-1">
              Method: {organism.breathingMethod}
            </div>
          </div>

          {/* Card 2: Diet */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="text-xl">🍽️</span>
              <h3>What does it eat?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {whatItEats}
            </p>
            <div className="text-[11px] font-mono text-emerald-400 pt-1">
              Trophic Type: {organism.dietLabel}
            </div>
          </div>

          {/* Card 3: Locomotion */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="text-xl">🏃</span>
              <h3>How does it move?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {howItMoves}
            </p>
            <div className="text-[11px] font-mono text-emerald-400 pt-1">
              Locomotion: {organism.locomotion}
            </div>
          </div>

          {/* Card 4: Protection & Defense */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="text-xl">🛡️</span>
              <h3>How does it protect itself?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {howItProtects}
            </p>
            <div className="text-[11px] font-mono text-emerald-400 pt-1">
              Key Defense: {organism.adaptations[0] || 'Armor & camouflage'}
            </div>
          </div>

          {/* Card 5: Reproduction & Life Cycle */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="text-xl">🍼</span>
              <h3>How does it reproduce?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {organism.reproduction}
            </p>
            <div className="text-[11px] font-mono text-emerald-400 pt-1">
              Life Cycle: {organism.lifecycle}
            </div>
          </div>

          {/* Card 6: Habitat Distribution */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="text-xl">🏠</span>
              <h3>Where does it live?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {organism.geographicDistribution}
            </p>
            <div className="text-[11px] font-mono text-emerald-400 pt-1">
              Biome: {organism.habitat}
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE BODY DIAGRAM: "MEET MY BODY" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              Interactive Anatomy Explorer
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Meet My Body
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            Click any labeled anatomical hotspot to discover its function.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Interactive visual canvas with mapped hotspot buttons */}
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
            <img
              src={organism.heroImage}
              alt={organism.commonName}
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-slate-950/40" />

            {/* Hotspot markers */}
            {organism.bodyParts.map((part) => {
              const isSelected = selectedBodyPart.id === part.id;
              return (
                <button
                  key={part.id}
                  onClick={() => setSelectedBodyPart(part)}
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group p-1 z-20 focus:outline-none`}
                  title={part.name}
                >
                  <span
                    className={`relative flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-transform ${
                      isSelected
                        ? 'bg-emerald-400 text-slate-950 scale-125 ring-4 ring-emerald-500/40 shadow-lg'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-700 hover:scale-110 hover:bg-emerald-500 hover:text-slate-950'
                    }`}
                  >
                    {isSelected ? '●' : '+'}
                  </span>
                  <span className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-8 px-2 py-0.5 bg-slate-900/90 border border-slate-700 text-[10px] font-semibold text-slate-200 rounded whitespace-nowrap shadow-md pointer-events-none">
                    {part.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Annotation Deck for Active Part */}
          <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Active Structure
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Part of {organism.commonName}
              </span>
            </div>

            <div>
              <h3 className="font-display font-bold text-2xl text-white">
                {selectedBodyPart.name}
              </h3>
              <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                Primary Function: {selectedBodyPart.function}
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedBodyPart.description}
            </p>

            {/* Quick selector chips */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-400 mb-2">Explore all structures:</div>
              <div className="flex flex-wrap gap-1.5">
                {organism.bodyParts.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => setSelectedBodyPart(part)}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors border ${
                      selectedBodyPart.id === part.id
                        ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                    }`}
                  >
                    {part.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "WHO EATS WHOM?" FOOD CHAIN & ECOSYSTEM CONNECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="mb-6">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            Trophic Ecology & Energy Flow
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Who Eats Whom?
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            How {organism.commonName} connects to other species in the food web.
          </p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
          {/* Trophic Chain Flow Diagram */}
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-3">
              Energy Pathway in {organism.habitatCategory}:
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {organism.foodChain.chainSteps.map((step, idx) => {
                const isThisOrganism =
                  step.toLowerCase().includes(organism.commonName.toLowerCase()) ||
                  organism.commonName.toLowerCase().includes(step.toLowerCase());

                return (
                  <React.Fragment key={idx}>
                    <div
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-colors ${
                        isThisOrganism
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      {step}
                      {isThisOrganism && (
                        <span className="block text-[10px] text-emerald-400 uppercase font-mono mt-0.5">
                          (Target Organism)
                        </span>
                      )}
                    </div>
                    {idx < organism.foodChain.chainSteps.length - 1 && (
                      <span className="text-slate-500 font-bold text-lg select-none">
                        →
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div>
              <div className="font-semibold text-slate-200 mb-1">Dietary Prey:</div>
              <p className="text-slate-400 leading-relaxed">
                {organism.foodChain.eats.join(', ')}
              </p>
            </div>
            <div>
              <div className="font-semibold text-slate-200 mb-1">Natural Predators / Threats:</div>
              <p className="text-slate-400 leading-relaxed">
                {organism.foodChain.eatenBy.join(', ')}
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
            <strong className="text-emerald-400">Why is this organism important?</strong>{' '}
            {organism.foodChain.ecologicalRole}
          </div>
        </div>
      </section>

      {/* 5. 5 AMAZING FACTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="mb-6">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scientifically Verified</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            5 Amazing Facts
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {organism.amazingFacts.map((fact, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-start gap-3.5 hover:border-amber-500/40 transition-colors"
            >
              <span className="font-display font-extrabold text-2xl text-amber-400 shrink-0 select-none">
                0{idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {fact}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONSERVATION STATUS & HUMAN SAFETY CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Conservation Status Card */}
          <div className="lg:col-span-7 p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Conservation & Biodiversity
                </div>
                <h3 className="font-display font-bold text-xl text-white mt-0.5">
                  How many are there in the wild?
                </h3>
              </div>
              <div className={`px-3 py-1 rounded-lg border text-xs font-bold flex items-center gap-2 ${statusInfo.bg} ${statusInfo.color}`}>
                <span className={`w-2 h-2 rounded-full ${statusInfo.dot}`} />
                <span>{statusInfo.label}</span>
              </div>
            </div>

            {/* Estimated Population Banner */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="text-xs text-slate-400">Scientific Population Estimate:</div>
              <div className="font-display font-bold text-lg text-white">
                {organism.populationEstimate.numberOrRange}
              </div>
              {organism.populationEstimate.isUncertain && (
                <div className="text-[11px] text-amber-400 font-medium">
                  Note: Scientists caution that exact global estimates contain uncertainty across regional ecotypes.
                </div>
              )}
              {organism.populationEstimate.notes && (
                <p className="text-xs text-slate-400 pt-1">
                  {organism.populationEstimate.notes}
                </p>
              )}
            </div>

            {/* Relevant Threats List */}
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-2">
                Documented Threats to Survival:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {organism.threats.map((threat, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span>{threat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Human Safety Context Indicator */}
          <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Human Safety Context</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Educational Indicator</span>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xs text-slate-400">Safety Concern Level:</span>
                <span className="text-sm font-bold text-white">
                  {organism.humanSafety.level} ({organism.humanSafety.scoreOutOf10}/10)
                </span>
              </div>

              {/* Visual meter bar */}
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    organism.humanSafety.scoreOutOf10 <= 3
                      ? 'bg-emerald-400'
                      : organism.humanSafety.scoreOutOf10 <= 6
                      ? 'bg-amber-400'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${(organism.humanSafety.scoreOutOf10 / 10) * 100}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {organism.humanSafety.context}
            </p>

            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300">
              <strong className="text-emerald-400 block mb-1">Safe Explorer Behavior:</strong>
              {organism.humanSafety.safeBehaviorGuide}
            </div>

            <div className="text-[10px] text-slate-500 leading-tight">
              * The score is a simplified educational rating, not a scientific measurement. Wild organisms are never "evil" and deserve habitat respect.
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLASSIFICATION TREE (TAXONOMY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5" />
              <span>Taxonomic Hierarchy</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Scientific Classification Tree
            </h2>
          </div>
          <button
            onClick={() => setTaxonomyExpanded(!taxonomyExpanded)}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            <span>{taxonomyExpanded ? 'Collapse' : 'Expand Full Hierarchy'}</span>
            {taxonomyExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
            {[
              { rank: 'Kingdom', val: organism.taxonomy.kingdom },
              { rank: 'Phylum', val: organism.taxonomy.phylum },
              { rank: 'Class', val: organism.taxonomy.class },
              { rank: 'Order', val: organism.taxonomy.order },
              { rank: 'Family', val: organism.taxonomy.family },
              { rank: 'Genus', val: organism.taxonomy.genus },
              { rank: 'Species', val: organism.taxonomy.species },
            ].map((node, idx) => (
              <React.Fragment key={node.rank}>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl min-w-[120px]">
                  <div className="text-[10px] font-mono uppercase text-slate-400">
                    {node.rank}
                  </div>
                  <div className={`text-xs font-bold mt-0.5 ${node.rank === 'Species' ? 'italic font-serif text-emerald-400' : 'text-slate-100'}`}>
                    {node.val}
                  </div>
                </div>
                {idx < 6 && (
                  <span className="text-slate-600 font-bold text-base select-none">
                    ↓
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ASK BIOSPHERE AI (POWERED BY GEMINI 3.8 FLASH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>AI Nature Guide · Age-Adapted Intelligence</span>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Ask BioSphere AI about {organism.commonName}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Curious about how {organism.commonName} survives, hunts, or communicates? Ask any question and our AI will explain at Age {profile.age} level!
            </p>
          </div>

          {/* Question Input Form */}
          <form onSubmit={handleAskAI} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder={`Ask e.g. "Why can't ${organism.commonName} breathe underwater?" or "How does it sleep?"`}
                className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                disabled={isAiLoading || !userQuestion.trim()}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-sm rounded-xl transition-colors shrink-0"
              >
                {isAiLoading ? 'Thinking...' : 'Ask AI'}
              </button>
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="flex flex-wrap gap-2 text-xs text-slate-400 pt-1">
              <span>Try asking:</span>
              {[
                `How does ${organism.commonName} communicate?`,
                `What is its biggest natural enemy?`,
                `Can it see well at night?`,
              ].map((promptText, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setUserQuestion(promptText)}
                  className="text-emerald-400 hover:underline"
                >
                  "{promptText}"
                </button>
              ))}
            </div>
          </form>

          {/* AI Response Display */}
          {aiAnswer && (
            <div className="p-5 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  BioSphere AI Guide (Age {profile.age} Vocabulary)
                </span>
                <button
                  onClick={() => speakText(aiAnswer)}
                  className="text-slate-300 hover:text-emerald-400 flex items-center gap-1 text-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Read aloud</span>
                </button>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {aiAnswer}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 9. AGE-ADAPTIVE QUIZ */}
      <section id="quiz-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              Knowledge Check
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              {organism.commonName} Explorer Quiz
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            Adapted difficulty for Age {profile.age}
          </div>
        </div>

        <div className="max-w-3xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
          {!quizCompleted ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                <span>
                  Question {currentQuizIndex + 1} of {organism.fallbackQuiz.length}
                </span>
                <span className="font-mono text-emerald-400 font-bold">
                  Score: {quizScore} / {organism.fallbackQuiz.length}
                </span>
              </div>

              <div className="font-display font-bold text-lg sm:text-xl text-white">
                {currentQuiz.question}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuiz.options.map((option, idx) => {
                  let btnStyle = 'bg-slate-950 text-slate-200 hover:bg-slate-800 border-slate-800';

                  if (quizSubmitted) {
                    if (idx === currentQuiz.correctIndex) {
                      btnStyle = 'bg-emerald-950 text-emerald-300 border-emerald-500 font-semibold ring-1 ring-emerald-500';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-rose-950 text-rose-300 border-rose-500 line-through';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={quizSubmitted}
                      className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm border transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {quizSubmitted && idx === currentQuiz.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {quizSubmitted && idx === selectedOption && idx !== currentQuiz.correctIndex && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback explanation */}
              {quizSubmitted && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-300 animate-in fade-in space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {selectedOption === currentQuiz.correctIndex ? (
                      <span className="text-emerald-400">Correct! Great scientific reasoning!</span>
                    ) : (
                      <span className="text-amber-400">Good attempt! Keep learning:</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {currentQuiz.explanation}
                  </p>
                  <button
                    onClick={handleNextQuizQuestion}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                  >
                    {currentQuizIndex + 1 < organism.fallbackQuiz.length ? 'Next Question' : 'View Results'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed screen */
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white">
                Expedition Quiz Completed!
              </h3>
              <p className="text-slate-300 text-sm">
                You scored <strong className="text-emerald-400 font-mono text-base">{quizScore}</strong> out of{' '}
                <strong className="font-mono text-base">{organism.fallbackQuiz.length}</strong>!
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                >
                  Try Quiz Again
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 10. SHORT STORY MODE WITH READ ALOUD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Story Time · Educational Fiction</span>
            </div>
            <button
              onClick={() => {
                if (storySpeaking) {
                  stopSpeaking();
                  setStorySpeaking(false);
                } else {
                  speakText(organism.story.content);
                  setStorySpeaking(true);
                }
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {storySpeaking ? <VolumeX className="w-3.5 h-3.5 text-emerald-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{storySpeaking ? 'Stop Reading' : 'Read Aloud'}</span>
            </button>
          </div>

          <div>
            <h3 className="font-display font-bold text-2xl text-white">
              {organism.story.title}
            </h3>
            <p className="text-xs text-slate-400 italic mt-0.5">
              {organism.story.synopsis}
            </p>
          </div>

          <div className="text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line space-y-3">
            {organism.story.content}
          </div>

          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400">
            <strong className="text-emerald-400">Scientific Lesson:</strong>{' '}
            {organism.story.scientificLesson}
          </div>
        </div>
      </section>

      {/* 11. SOURCES & FACT-CHECKING SYSTEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Sources Used for This Page:
          </div>
          <div className="space-y-2">
            {organism.sources.map((src, i) => (
              <div
                key={i}
                className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs text-slate-400 flex items-center justify-between"
              >
                <div>
                  <strong className="text-slate-200">{src.name}</strong> — {src.organization}
                </div>
                {src.year && <span className="font-mono text-slate-500 text-[11px]">{src.year}</span>}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 leading-tight pt-1">
            BioSphere Explorer sources species status and physiological data from accredited research bodies (IUCN, Smithsonian, NOAA, and academic journals). Information is adapted strictly for cognitive age appropriateness.
          </p>
        </div>
      </section>
    </div>
  );
};
