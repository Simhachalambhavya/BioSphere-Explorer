export type AgeBand = '5-7' | '8-10' | '11-13' | '14-15';

export type OrganismCategory =
  | 'mammals'
  | 'birds'
  | 'reptiles'
  | 'amphibians'
  | 'fish'
  | 'insects'
  | 'arachnids'
  | 'marine_life'
  | 'plants'
  | 'fungi'
  | 'microorganisms'
  | 'dinosaurs';

export type HabitatCategory =
  | 'forests'
  | 'oceans'
  | 'deserts'
  | 'polar'
  | 'grasslands'
  | 'rainforests'
  | 'mountains'
  | 'freshwater'
  | 'wetlands'
  | 'coral_reefs'
  | 'extreme';

export type ConservationStatus =
  | 'least_concern'
  | 'near_threatened'
  | 'vulnerable'
  | 'endangered'
  | 'critically_endangered'
  | 'extinct'
  | 'data_deficient';

export type DietType =
  | 'herbivore'
  | 'carnivore'
  | 'omnivore'
  | 'filter_feeder'
  | 'detritivore'
  | 'parasite'
  | 'photosynthetic'
  | 'decomposer';

export interface Taxonomy {
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
}

export interface BodyPart {
  id: string;
  name: string;
  function: string;
  description: string;
  x: number; // percentage coordinate 0-100 on visual diagram
  y: number;
}

export interface FoodChain {
  trophicLevel: 'Producer' | 'Primary Consumer' | 'Secondary Consumer' | 'Tertiary Consumer' | 'Apex Predator' | 'Decomposer';
  chainSteps: string[];
  eats: string[];
  eatenBy: string[];
  ecologicalRole: string;
}

export interface HumanSafety {
  scoreOutOf10: number; // 1-10 educational scale
  level: 'Very Low' | 'Low' | 'Moderate' | 'High';
  context: string;
  safeBehaviorGuide: string;
}

export interface SourceReference {
  name: string;
  organization: string;
  year?: string;
  type: string;
  url?: string;
}

export interface AgeAdaptedContent {
  '5-7': {
    summary: string;
    howItBreathes: string;
    whatItEats: string;
    howItMoves: string;
    howItProtects: string;
    funFactCallout: string;
  };
  '8-10': {
    summary: string;
    howItBreathes: string;
    whatItEats: string;
    howItMoves: string;
    howItProtects: string;
    adaptationsSummary: string;
  };
  '11-13': {
    summary: string;
    physiology: string;
    ecologicalNiche: string;
    adaptationsSummary: string;
    conservationInsight: string;
  };
  '14-15': {
    summary: string;
    physiology: string;
    ecologicalNiche: string;
    evolutionaryContext: string;
    conservationScience: string;
  };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ageBand?: AgeBand;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  behavior?: string; // Natural behavior e.g. "Swimming", "Breaching", "Hunting", "Close-up", "Flower & Seeds"
  credit?: string; // Photographer / source attribution
  sourceUrl?: string;
  isReconstruction?: boolean;
}

export interface Story {
  title: string;
  synopsis: string;
  content: string;
  scientificLesson: string;
}

export interface Organism {
  id: string;
  commonName: string;
  scientificName: string;
  category: OrganismCategory;
  categoryLabel: string;
  habitat: string;
  habitatCategory: HabitatCategory;
  geographicDistribution: string;
  diet: DietType;
  dietLabel: string;
  breathingMethod: string;
  bodyCovering: string;
  locomotion: string;
  reproduction: string;
  lifecycle: string;
  lifespan: string;
  size: string;
  weight: string;
  adaptations: string[];
  behavior: string;
  socialStructure: string;
  ecologicalRole: string;
  conservationStatus: ConservationStatus;
  populationEstimate: {
    numberOrRange: string;
    isUncertain: boolean;
    estimateYear?: string;
    notes?: string;
  };
  threats: string[];
  humanSafety: HumanSafety;
  amazingFacts: string[]; // exactly 5 facts
  bodyParts: BodyPart[];
  foodChain: FoodChain;
  taxonomy: Taxonomy;
  sources: SourceReference[];
  heroImage: string;
  // Image Source Architecture Fields
  image?: string; // High-resolution primary photograph
  thumbnail?: string; // Fast loading thumbnail for search & cards
  gallery?: GalleryImage[]; // Multiple natural behavior photos
  imageSource?: string; // Source repository e.g. "Wikimedia Commons", "NOAA", "Smithsonian"
  imageCredit?: string; // Specific photographer & license
  isReconstruction?: boolean; // For prehistoric organisms
  reconstructionNote?: string; // E.g. "Scientifically informed paleoart reconstruction based on fossil evidence"
  isExtinct?: boolean;
  geologicalEra?: string; // e.g. "Late Cretaceous (68–66 million years ago)"
  isMicroscopic?: boolean;
  magnification?: string; // E.g. "Image shown under a microscope (1,500× magnification)"
  ageAdaptations: AgeAdaptedContent;
  fallbackQuiz: QuizQuestion[];
  story: Story;
}

export interface ChildProfile {
  age: number;
  explorerLevel: 'Beginner' | 'Curious Explorer' | 'Young Scientist';
  favorites: string[];
  discoveredOrganismIds: string[];
  exploredHabitats: HabitatCategory[];
  quizStats: {
    questionsAnswered: number;
    correctAnswers: number;
  };
  badges: Array<{
    id: string;
    name: string;
    icon: string;
    description: string;
    unlockedAt?: string;
  }>;
  settings: {
    soundEffects: boolean;
    animations: boolean;
    speechRate: number;
  };
}
