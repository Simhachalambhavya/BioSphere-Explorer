import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ChildProfile, HabitatCategory, OrganismCategory, AgeBand } from '../types/organism';
import { ORGANISMS } from '../data/organisms';

export type AppView =
  | 'home'
  | 'explore'
  | 'habitats'
  | 'categories'
  | 'search'
  | 'organism-detail'
  | 'compare'
  | 'ancient'
  | 'microscopic'
  | 'plants'
  | 'progress'
  | 'favorites'
  | 'parent-settings';

interface BioSphereContextType {
  profile: ChildProfile;
  ageBand: AgeBand;
  isSetupCompleted: boolean;
  activeView: AppView;
  selectedOrganismId: string | null;
  selectedHabitat: HabitatCategory | null;
  selectedCategory: OrganismCategory | null;
  compareOrganisms: [string, string];
  isSpeaking: boolean;
  searchQuery: string;

  // Actions
  setAge: (age: number) => void;
  setExplorerLevel: (level: 'Beginner' | 'Curious Explorer' | 'Young Scientist') => void;
  completeSetup: (age: number, level?: 'Beginner' | 'Curious Explorer' | 'Young Scientist') => void;
  toggleFavorite: (organismId: string) => void;
  isFavorite: (organismId: string) => boolean;
  markOrganismViewed: (organismId: string) => void;
  recordQuizScore: (correct: number, total: number) => void;
  resetAllProgress: () => void;
  updateSettings: (newSettings: Partial<ChildProfile['settings']>) => void;
  setActiveView: (view: AppView) => void;
  navigateToOrganism: (organismId: string) => void;
  navigateToHabitat: (habitat: HabitatCategory) => void;
  navigateToCategory: (category: OrganismCategory) => void;
  setSelectedHabitat: (habitat: HabitatCategory | null) => void;
  setSelectedCategory: (category: OrganismCategory | null) => void;
  setCompareSelection: (orgA: string, orgB: string) => void;
  setSearchQuery: (query: string) => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
}

const DEFAULT_PROFILE: ChildProfile = {
  age: 9,
  explorerLevel: 'Curious Explorer',
  favorites: ['orca', 'axolotl', 'monarch-butterfly'],
  discoveredOrganismIds: ['orca', 'blue-whale', 'axolotl'],
  exploredHabitats: ['oceans', 'freshwater'],
  quizStats: {
    questionsAnswered: 15,
    correctAnswers: 13,
  },
  badges: [
    {
      id: 'ocean-explorer',
      name: 'Ocean Explorer',
      icon: '🌊',
      description: 'Explored deep marine creatures and the oceanic food web.',
      unlockedAt: '2026-09-28',
    },
    {
      id: 'first-discovery',
      name: 'Curious Naturalist',
      icon: '🌱',
      description: 'Began the voyage of discovering Earth\'s biodiversity.',
      unlockedAt: '2026-09-28',
    },
  ],
  settings: {
    soundEffects: true,
    animations: true,
    speechRate: 0.95,
  },
};

const STORAGE_KEY = 'biosphere_explorer_profile_v1';
const SETUP_KEY = 'biosphere_explorer_setup_done';

const BioSphereContext = createContext<BioSphereContextType | undefined>(undefined);

export function getAgeBand(age: number): AgeBand {
  if (age <= 7) return '5-7';
  if (age <= 10) return '8-10';
  if (age <= 13) return '11-13';
  return '14-15';
}

export const BioSphereProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ChildProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read stored profile:', e);
    }
    return DEFAULT_PROFILE;
  });

  const [isSetupCompleted, setIsSetupCompleted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(SETUP_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedOrganismId, setSelectedOrganismId] = useState<string | null>('orca');
  const [selectedHabitat, setSelectedHabitat] = useState<HabitatCategory | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<OrganismCategory | null>(null);
  const [compareOrganisms, setCompareOrganisms] = useState<[string, string]>(['orca', 'bottlenose-dolphin']);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Could not persist profile:', e);
    }
  }, [profile]);

  const ageBand = getAgeBand(profile.age);

  // Set child's age
  const setAge = (age: number) => {
    const clampedAge = Math.max(5, Math.min(15, age));
    let explorerLevel: ChildProfile['explorerLevel'] = 'Curious Explorer';
    if (clampedAge <= 7) explorerLevel = 'Beginner';
    else if (clampedAge >= 11) explorerLevel = 'Young Scientist';

    setProfile(prev => ({
      ...prev,
      age: clampedAge,
      explorerLevel,
    }));
  };

  const setExplorerLevel = (level: ChildProfile['explorerLevel']) => {
    setProfile(prev => ({ ...prev, explorerLevel: level }));
  };

  const completeSetup = (age: number, level?: ChildProfile['explorerLevel']) => {
    const clampedAge = Math.max(5, Math.min(15, age));
    const chosenLevel =
      level || (clampedAge <= 7 ? 'Beginner' : clampedAge >= 11 ? 'Young Scientist' : 'Curious Explorer');

    setProfile(prev => ({
      ...prev,
      age: clampedAge,
      explorerLevel: chosenLevel,
    }));

    setIsSetupCompleted(true);
    try {
      localStorage.setItem(SETUP_KEY, 'true');
    } catch {}
    setActiveView('explore');
  };

  const toggleFavorite = (organismId: string) => {
    setProfile(prev => {
      const exists = prev.favorites.includes(organismId);
      return {
        ...prev,
        favorites: exists
          ? prev.favorites.filter(id => id !== organismId)
          : [...prev.favorites, organismId],
      };
    });
  };

  const isFavorite = (organismId: string) => profile.favorites.includes(organismId);

  // Mark organism viewed and check badge unlocks
  const markOrganismViewed = (organismId: string) => {
    const org = ORGANISMS.find(o => o.id === organismId);
    if (!org) return;

    setProfile(prev => {
      const discoveredIds = prev.discoveredOrganismIds.includes(organismId)
        ? prev.discoveredOrganismIds
        : [...prev.discoveredOrganismIds, organismId];

      const exploredHabitats = prev.exploredHabitats.includes(org.habitatCategory)
        ? prev.exploredHabitats
        : [...prev.exploredHabitats, org.habitatCategory];

      // Check badges
      const newBadges = [...prev.badges];
      const hasBadge = (id: string) => newBadges.some(b => b.id === id);

      // Ocean badge
      if (!hasBadge('ocean-explorer') && (org.habitatCategory === 'oceans' || org.habitatCategory === 'coral_reefs')) {
        newBadges.push({
          id: 'ocean-explorer',
          name: 'Ocean Explorer',
          icon: '🌊',
          description: 'Explored deep marine creatures and the oceanic food web.',
          unlockedAt: new Date().toISOString().split('T')[0],
        });
      }

      // Dinosaur badge
      if (!hasBadge('dino-discoverer') && org.category === 'dinosaurs') {
        newBadges.push({
          id: 'dino-discoverer',
          name: 'Dinosaur Discoverer',
          icon: '🦖',
          description: 'Uncovered prehistoric titans that ruled Ancient Earth.',
          unlockedAt: new Date().toISOString().split('T')[0],
        });
      }

      // Plant badge
      if (!hasBadge('plant-detective') && org.category === 'plants') {
        newBadges.push({
          id: 'plant-detective',
          name: 'Plant Detective',
          icon: '🌱',
          description: 'Investigated photosynthesis and botanical adaptations.',
          unlockedAt: new Date().toISOString().split('T')[0],
        });
      }

      // Microbe badge
      if (!hasBadge('microbe-master') && (org.category === 'microorganisms' || org.isMicroscopic)) {
        newBadges.push({
          id: 'microbe-master',
          name: 'Microbe Explorer',
          icon: '🔬',
          description: 'Journeyed into the hidden universe of microscopic cells.',
          unlockedAt: new Date().toISOString().split('T')[0],
        });
      }

      // 10 organisms explored badge
      if (!hasBadge('master-naturalist') && discoveredIds.length >= 10) {
        newBadges.push({
          id: 'master-naturalist',
          name: 'Master Naturalist',
          icon: '🏅',
          description: 'Discovered ten distinct species across Earth\'s kingdoms of life.',
          unlockedAt: new Date().toISOString().split('T')[0],
        });
      }

      return {
        ...prev,
        discoveredOrganismIds: discoveredIds,
        exploredHabitats,
        badges: newBadges,
      };
    });
  };

  const recordQuizScore = (correct: number, total: number) => {
    setProfile(prev => ({
      ...prev,
      quizStats: {
        questionsAnswered: prev.quizStats.questionsAnswered + total,
        correctAnswers: prev.quizStats.correctAnswers + correct,
      },
    }));
  };

  const resetAllProgress = () => {
    setProfile({
      ...DEFAULT_PROFILE,
      favorites: [],
      discoveredOrganismIds: [],
      exploredHabitats: [],
      quizStats: { questionsAnswered: 0, correctAnswers: 0 },
      badges: [],
    });
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SETUP_KEY);
    setIsSetupCompleted(false);
    setActiveView('home');
  };

  const updateSettings = (newSettings: Partial<ChildProfile['settings']>) => {
    setProfile(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings },
    }));
  };

  const navigateToOrganism = (organismId: string) => {
    setSelectedOrganismId(organismId);
    markOrganismViewed(organismId);
    setActiveView('organism-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHabitat = (habitat: HabitatCategory) => {
    setSelectedHabitat(habitat);
    setSelectedCategory(null);
    setActiveView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (category: OrganismCategory) => {
    setSelectedCategory(category);
    setSelectedHabitat(null);
    setActiveView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCompareSelection = (orgA: string, orgB: string) => {
    setCompareOrganisms([orgA, orgB]);
    setActiveView('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Text-to-speech for read-aloud features (accessible for young explorers!)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = profile.settings.speechRate || 0.95;
    utterance.pitch = profile.age <= 8 ? 1.05 : 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <BioSphereContext.Provider
      value={{
        profile,
        ageBand,
        isSetupCompleted,
        activeView,
        selectedOrganismId,
        selectedHabitat,
        selectedCategory,
        compareOrganisms,
        isSpeaking,
        searchQuery,
        setAge,
        setExplorerLevel,
        completeSetup,
        toggleFavorite,
        isFavorite,
        markOrganismViewed,
        recordQuizScore,
        resetAllProgress,
        updateSettings,
        setActiveView,
        navigateToOrganism,
        navigateToHabitat,
        navigateToCategory,
        setSelectedHabitat,
        setSelectedCategory,
        setCompareSelection,
        setSearchQuery,
        speakText,
        stopSpeaking,
      }}
    >
      {children}
    </BioSphereContext.Provider>
  );
};

export const useBioSphere = () => {
  const context = useContext(BioSphereContext);
  if (!context) {
    throw new Error('useBioSphere must be used within a BioSphereProvider');
  }
  return context;
};
