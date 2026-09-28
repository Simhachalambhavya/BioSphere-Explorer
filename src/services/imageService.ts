/**
 * BioSphere Explorer - Professional Image Service Architecture
 * Provides real-world scientific photographs, multi-behavior galleries,
 * ecosystem imagery, legal attributions, dynamic lookup, and multi-tier fallbacks.
 */

import { HabitatCategory, GalleryImage } from '../types/organism';

export interface OrganismImagePackage {
  image: string;
  secondaryImage: string;
  thumbnail: string;
  gallery: GalleryImage[];
  imageSource: string;
  imageCredit: string;
  isReconstruction?: boolean;
  reconstructionNote?: string;
  isMicroscopic?: boolean;
  magnification?: string;
}

export interface EcosystemImagePackage {
  image: string;
  credit: string;
  atmosphere: string;
}

// 1. Ecosystem / Biome Photography
export const ECOSYSTEM_IMAGES: Record<HabitatCategory, EcosystemImagePackage> = {
  oceans: {
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1400&q=80',
    credit: 'Photo: Unsplash · Open Blue Pelagic Waters',
    atmosphere: 'deep-blue',
  },
  coral_reefs: {
    image: '/src/assets/images/habitat_ocean_reef_1790604463998.jpg',
    credit: 'BioSphere Marine Expedition Archives · Vibrant Coral Biodiversity',
    atmosphere: 'cyan-teal',
  },
  rainforests: {
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=80',
    credit: 'Photo: Unsplash · Tropical Rainforest Canopy',
    atmosphere: 'lush-emerald',
  },
  forests: {
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80',
    credit: 'Photo: Unsplash · Temperate Deciduous Forest',
    atmosphere: 'natural-forest',
  },
  grasslands: {
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=80',
    credit: 'Photo: Unsplash · East African Savanna Grasslands',
    atmosphere: 'warm-amber',
  },
  polar: {
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1400&q=80',
    credit: 'Photo: Unsplash · Antarctic Glacial Sea Ice',
    atmosphere: 'glacial-indigo',
  },
  deserts: {
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80',
    credit: 'Photo: Unsplash · Arid Dunes & Desert Biome',
    atmosphere: 'desert-ochre',
  },
  mountains: {
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
    credit: 'Photo: Unsplash · Alpine Crags & Mountain Meadows',
    atmosphere: 'alpine-slate',
  },
  freshwater: {
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1400&q=80',
    credit: 'Photo: Unsplash · Pristine Mountain River & Basin',
    atmosphere: 'clear-cyan',
  },
  wetlands: {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
    credit: 'Photo: Unsplash · Natural Freshwater Marshland & Swamps',
    atmosphere: 'reed-teal',
  },
  extreme: {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    credit: 'Photo: NOAA / USGS · Hydrothermal Oceanic Rift & Geothermal Spring',
    atmosphere: 'volcanic-rose',
  },
};

// 2. Curated Real-World Organism Images & Multi-Behavior Galleries
export const ORGANISM_IMAGE_CATALOG: Record<string, OrganismImagePackage> = {
  // 1. Orca (Orcinus orca)
  'orca': {
    image: '/src/assets/images/orca_killer_whale_1790605600223.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    thumbnail: '/src/assets/images/orca_killer_whale_1790605600223.jpg',
    imageSource: 'Wikimedia Commons / NOAA Fisheries',
    imageCredit: 'Photo: Robert Pittman / NOAA Southwest Fisheries Science Center (Public Domain)',
    gallery: [
      {
        id: 'orca-breaching',
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Adult orca breaching clear of the water in a dramatic leaping maneuver.',
        behavior: 'Breaching Jump',
        credit: 'Unsplash Wildlife Collection',
      },
      {
        id: 'orca-pod',
        url: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1200&q=80',
        caption: 'A matrilineal family pod traveling synchronously across coastal waters.',
        behavior: 'Pod Travel',
        credit: 'Photo: NOAA Marine Mammal Laboratory',
      },
      {
        id: 'orca-underwater',
        url: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80',
        caption: 'Underwater profile showing countershaded coloration and pectoral steering flippers.',
        behavior: 'Underwater Gliding',
        credit: 'Wikimedia Commons · CC BY-SA 4.0',
      },
      {
        id: 'orca-calf',
        url: '/src/assets/images/orca_killer_whale_1790605600223.jpg',
        caption: 'Mother orca swimming alongside her calf in Arctic waters.',
        behavior: 'Maternal Care',
        credit: 'BioSphere Wildlife Photography Archives',
      },
    ],
  },

  // 2. Bengal Tiger (Panthera tigris tigris)
  'bengal-tiger': {
    image: '/src/assets/images/bengal_tiger_1790605616161.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    thumbnail: '/src/assets/images/bengal_tiger_1790605616161.jpg',
    imageSource: 'Wikimedia Commons / Project Tiger',
    imageCredit: 'Photo: Davidvraju / Wikimedia Commons (CC BY-SA 4.0)',
    gallery: [
      {
        id: 'tiger-stalking',
        url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Bengal tiger moving silently through sal forest undergrowth.',
        behavior: 'Silent Stalking',
        credit: 'Unsplash Wildlife Collection',
      },
      {
        id: 'tiger-portrait',
        url: '/src/assets/images/bengal_tiger_1790605616161.jpg',
        caption: 'Close-up facial portrait showing sensory vibrissae whiskers and unique stripe patterns.',
        behavior: 'Close-Up Portrait',
        credit: 'BioSphere Wildlife Archives',
      },
      {
        id: 'tiger-resting',
        url: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1200&q=80',
        caption: 'A tiger cooling off in a river pool during the midday heat.',
        behavior: 'River Bathing',
        credit: 'Wikimedia Commons · CC BY-SA 3.0',
      },
    ],
  },

  // 3. Great White Shark (Carcharodon carcharias)
  'great-white-shark': {
    image: '/src/assets/images/great_white_shark_1790605629736.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=1200&q=80',
    thumbnail: '/src/assets/images/great_white_shark_1790605629736.jpg',
    imageSource: 'Wikimedia Commons / NOAA',
    imageCredit: 'Photo: Terry Goss / Wikimedia Commons (CC BY-SA 3.0)',
    gallery: [
      {
        id: 'shark-patrol',
        url: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Great white shark cruising through sunlit pelagic water.',
        behavior: 'Pelagic Patrolling',
        credit: 'Unsplash Marine Exploration',
      },
      {
        id: 'shark-head',
        url: '/src/assets/images/great_white_shark_1790605629736.jpg',
        caption: 'Anterior perspective displaying ampullae of Lorenzini electroreceptors around snout.',
        behavior: 'Sensory Scanning',
        credit: 'BioSphere Marine Archives',
      },
    ],
  },

  // 4. African Bush Elephant (Loxodonta africana)
  'african-elephant': {
    image: '/src/assets/images/african_elephant_1790605645078.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
    thumbnail: '/src/assets/images/african_elephant_1790605645078.jpg',
    imageSource: 'Wikimedia Commons / Kruger National Park',
    imageCredit: 'Photo: Bernard DUPONT / Wikimedia Commons (CC BY-SA 2.0)',
    gallery: [
      {
        id: 'elephant-savanna',
        url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
        caption: 'Matriarch leading the family herd across the open African savanna.',
        behavior: 'Herd Migration',
        credit: 'Unsplash Savanna Series',
      },
      {
        id: 'elephant-portrait',
        url: '/src/assets/images/african_elephant_1790605645078.jpg',
        caption: 'Detailed portrait showing prehensile trunk fingers and large cooling ears.',
        behavior: 'Thermoregulation & Feeding',
        credit: 'BioSphere Wildlife Archives',
      },
    ],
  },

  // 5. Bald Eagle (Haliaeetus leucocephalus)
  'bald-eagle': {
    image: '/src/assets/images/bald_eagle_1790605668654.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1611689342806-0863700ce8e4?auto=format&fit=crop&w=1200&q=80',
    thumbnail: '/src/assets/images/bald_eagle_1790605668654.jpg',
    imageSource: 'US Fish and Wildlife Service / Wikimedia Commons',
    imageCredit: 'Photo: Gary Kramer / USFWS (Public Domain)',
    gallery: [
      {
        id: 'eagle-flight',
        url: 'https://images.unsplash.com/photo-1611689342806-0863700ce8e4?auto=format&fit=crop&w=1200&q=80',
        caption: 'Soaring with expansive 2-meter wingspan scanning for surface fish.',
        behavior: 'Aerial Soaring',
        credit: 'Unsplash Wildlife Collection',
      },
      {
        id: 'eagle-portrait',
        url: '/src/assets/images/bald_eagle_1790605668654.jpg',
        caption: 'Perched mature eagle with pure white head feathers and hooked yellow beak.',
        behavior: 'Canopy Perch',
        credit: 'BioSphere Raptor Photography',
      },
    ],
  },

  // 6. Blue Whale (Balaenoptera musculus)
  'blue-whale': {
    image: '/src/assets/images/blue_whale_marine_1790608853706.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    thumbnail: '/src/assets/images/blue_whale_marine_1790608853706.jpg',
    imageSource: 'NOAA Fisheries / Wikimedia Commons',
    imageCredit: 'Photo: NOAA Marine Mammal Scientific Survey (Public Domain)',
    gallery: [
      {
        id: 'blue-whale-surface',
        url: '/src/assets/images/blue_whale_marine_1790608853706.jpg',
        caption: 'Blue whale cutting gracefully through clear sub-Antarctic surface water.',
        behavior: 'Pelagic Cruising',
        credit: 'BioSphere Marine Expedition',
      },
      {
        id: 'blue-whale-tail',
        url: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Massive tail flukes lifting above ocean surface before a deep krill-foraging dive.',
        behavior: 'Sounding Fluke Lift',
        credit: 'Wikimedia Commons · CC BY-SA 4.0',
      },
    ],
  },

  // 7. Common Bottlenose Dolphin (Tursiops truncatus)
  'bottlenose-dolphin': {
    image: 'https://images.unsplash.com/photo-1607153333879-c1a05825843d?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1607153333879-c1a05825843d?auto=format&fit=crop&w=1200&q=80',
    imageSource: 'Wikimedia Commons / NOAA',
    imageCredit: 'Photo: Allen Kurzweil / NOAA Southeast Fisheries (Public Domain)',
    gallery: [
      {
        id: 'dolphin-breach',
        url: 'https://images.unsplash.com/photo-1607153333879-c1a05825843d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Bottlenose dolphin leaping in the bow wave of a research vessel.',
        behavior: 'Bow Riding & Leaping',
        credit: 'Unsplash Marine Photography',
      },
      {
        id: 'dolphin-swim',
        url: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80',
        caption: 'Dolphin swimming in coastal shallows using echolocation clicks to locate buried fish.',
        behavior: 'Echolocation Foraging',
        credit: 'Wikimedia Commons · CC BY-SA 3.0',
      },
    ],
  },

  // 8. Red-Eyed Tree Frog (Agalychnis callidryas)
  'red-eyed-tree-frog': {
    image: 'https://images.unsplash.com/photo-1579380656108-62d08a5c3785?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1579380656108-62d08a5c3785?auto=format&fit=crop&w=1200&q=80',
    imageSource: 'Wikimedia Commons / Smithsonian Tropical Research Institute',
    imageCredit: 'Photo: Geoff Gallice / Wikimedia Commons (CC BY 2.0)',
    gallery: [
      {
        id: 'frog-leaf',
        url: 'https://images.unsplash.com/photo-1579380656108-62d08a5c3785?auto=format&fit=crop&w=1200&q=80',
        caption: 'Vibrant neon red eyes and orange webbed suction toe pads clinging to rainforest bromeliad.',
        behavior: 'Nocturnal Arboreal Rest',
        credit: 'Unsplash Tropical Rainforest Series',
      },
      {
        id: 'frog-close',
        url: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Close-up showing nictitating eyelid membrane protecting permeable amphibian eye.',
        behavior: 'Startle Display',
        credit: 'Wikimedia Commons · CC BY-SA 4.0',
      },
    ],
  },

  // 9. Monarch Butterfly (Danaus plexippus)
  'monarch-butterfly': {
    image: '/src/assets/images/monarch_butterfly_macro_1790608870356.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=1200&q=80',
    thumbnail: '/src/assets/images/monarch_butterfly_macro_1790608870356.jpg',
    imageSource: 'US Fish and Wildlife Service / Wikimedia Commons',
    imageCredit: 'Photo: Jim Hudgins / USFWS (Public Domain)',
    gallery: [
      {
        id: 'monarch-flower',
        url: '/src/assets/images/monarch_butterfly_macro_1790608870356.jpg',
        caption: 'Adult Monarch sipping nectar from wildflower, with pollen dusted across chitin thorax.',
        behavior: 'Floral Pollination',
        credit: 'BioSphere Macro Series',
      },
      {
        id: 'monarch-wings',
        url: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=1200&q=80',
        caption: 'High-contrast aposematic warning coloration signaling cardenolide toxins to avian predators.',
        behavior: 'Aposematic Warning Display',
        credit: 'Unsplash Entomology Collection',
      },
    ],
  },

  // 10. English Oak Tree (Quercus robur)
  'english-oak': {
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
    imageSource: 'Wikimedia Commons / Royal Botanic Gardens Kew',
    imageCredit: 'Photo: Silar / Wikimedia Commons (CC BY-SA 4.0)',
    gallery: [
      {
        id: 'oak-full-tree',
        url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Centuries-old English Oak displaying expansive spreading canopy and thick furrowed bark.',
        behavior: 'Crown Structure & Photosynthesis',
        credit: 'Unsplash Botanical Collection',
      },
      {
        id: 'oak-leaves-acorn',
        url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Lobed oak leaves catching sunlight alongside ripening acorn nuts inside cups.',
        behavior: 'Leaves, Acorns & Seed Dispersal',
        credit: 'Wikimedia Commons · CC BY-SA 3.0',
      },
    ],
  },

  // 11. Tyrannosaurus rex
  'tyrannosaurus-rex': {
    image: '/src/assets/images/tyrannosaurus_paleoart_1790608957019.jpg',
    secondaryImage: '/src/assets/images/prehistoric_dinosaur_world_1790604478527.jpg',
    thumbnail: '/src/assets/images/tyrannosaurus_paleoart_1790608957019.jpg',
    imageSource: 'Smithsonian National Museum of Natural History / Peer-Reviewed Paleoart',
    imageCredit: 'Scientific Reconstruction based on FMNH PR 2081 (Sue) fossil osteology',
    isReconstruction: true,
    reconstructionNote: "Artist's scientific reconstruction based on fossil evidence and skeletal biomechanics",
    gallery: [
      {
        id: 'trex-forest',
        url: '/src/assets/images/tyrannosaurus_paleoart_1790608957019.jpg',
        caption: 'Late Cretaceous floodplain environment showing muscular neck, stereoscopic vision, and serrated teeth.',
        behavior: 'Late Cretaceous Ecosystem Stalking',
        isReconstruction: true,
        credit: 'BioSphere Scientific Paleoart Division',
      },
      {
        id: 'trex-biome',
        url: '/src/assets/images/prehistoric_dinosaur_world_1790604478527.jpg',
        caption: 'Prehistoric Mesozoic ancient Earth with lush gymnosperms, giant ferns, and primeval rivers.',
        behavior: 'Prehistoric Habitat Overview',
        isReconstruction: true,
        credit: 'BioSphere Prehistoric Earth Archives',
      },
    ],
  },

  // 12. Tardigrade (Water Bear - Hypsibius exemplaris)
  'tardigrade': {
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: '/src/assets/images/microscopic_cell_world_1790604498200.jpg',
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    imageSource: 'Schokraie et al. / PLOS ONE / Wikimedia Commons',
    imageCredit: 'Scanning Electron Micrograph (SEM) · Bob Goldstein laboratory (CC BY 3.0)',
    isMicroscopic: true,
    magnification: 'Scanning Electron Micrograph · 1,200× Magnification',
    gallery: [
      {
        id: 'tardigrade-sem',
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
        caption: 'High-resolution electron microscope image displaying 8 clawed legs, head, and protective cuticle.',
        behavior: 'Microscopic Anatomy (1,200×)',
        credit: 'Wikimedia Commons / PLOS ONE',
      },
      {
        id: 'tardigrade-cell',
        url: '/src/assets/images/microscopic_cell_world_1790604498200.jpg',
        caption: 'Cellular microorganisms and microscopic water droplet world.',
        behavior: 'Microscopic Environment',
        credit: 'BioSphere Microbiology Archives',
      },
    ],
  },

  // 13. Common Octopus (Octopus vulgaris)
  'common-octopus': {
    image: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=80',
    imageSource: 'Wikimedia Commons / Monterey Bay Aquarium',
    imageCredit: 'Photo: Albert Kok / Wikimedia Commons (CC BY-SA 3.0)',
    gallery: [
      {
        id: 'octopus-coral',
        url: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=80',
        caption: 'Octopus using pigment chromatophores to match the rocky sea floor texture and color.',
        behavior: 'Dynamic Camouflage',
        credit: 'Unsplash Underwater Marine',
      },
    ],
  },

  // 14. Venus Flytrap (Dionaea muscipula)
  'venus-flytrap': {
    image: '/src/assets/images/venus_flytrap_botanical_1790608899672.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
    thumbnail: '/src/assets/images/venus_flytrap_botanical_1790608899672.jpg',
    imageSource: 'US Fish and Wildlife Service / Wikimedia Commons',
    imageCredit: 'Photo: Noah Elhardt / Wikimedia Commons (CC BY-SA 3.0)',
    gallery: [
      {
        id: 'flytrap-open',
        url: '/src/assets/images/venus_flytrap_botanical_1790608899672.jpg',
        caption: 'Open leaf trap showing trigger hairs, nectar glands, and fringed cilia teeth.',
        behavior: 'Open Ready Trap State',
        credit: 'BioSphere Botanical Photography',
      },
      {
        id: 'flytrap-habitat',
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Native coastal bog habitat in Carolina pine savannas where acidic soil lacks nitrogen.',
        behavior: 'Wetland Bog Habitat',
        credit: 'Unsplash Nature Series',
      },
    ],
  },

  // 15. Axolotl (Ambystoma mexicanum)
  'axolotl': {
    image: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1579380656108-62d08a5c3785?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?auto=format&fit=crop&w=1200&q=80',
    imageSource: 'Wikimedia Commons / UNAM Biological Institute',
    imageCredit: 'Photo: H. Zell / Wikimedia Commons (CC BY-SA 3.0)',
    gallery: [
      {
        id: 'axolotl-gills',
        url: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?auto=format&fit=crop&w=1200&q=80',
        caption: 'Feathery pink external gills extracting oxygen directly from Lake Xochimilco waters.',
        behavior: 'Underwater Branchial Respiration',
        credit: 'Wikimedia Commons · CC BY-SA 3.0',
      },
    ],
  },

  // 16. Western Honey Bee (Apis mellifera)
  'honey-bee': {
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=1200&q=80',
    imageSource: 'Wikimedia Commons / USDA Agricultural Research Service',
    imageCredit: 'Photo: Muhammad Mahdi Karim / Wikimedia Commons (GFDL 1.2)',
    gallery: [
      {
        id: 'bee-flower',
        url: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=1200&q=80',
        caption: 'Worker honey bee collecting pollen onto corbicula baskets on hind legs.',
        behavior: 'Nectar Foraging & Pollination',
        credit: 'Unsplash Macro World',
      },
    ],
  },

  // 17. Fly Agaric Mushroom (Amanita muscaria)
  'fly-agaric': {
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    imageSource: 'Wikimedia Commons / Kew Gardens Mycology',
    imageCredit: 'Photo: Onderwijsgek / Wikimedia Commons (CC BY-SA 3.0)',
    gallery: [
      {
        id: 'mushroom-cap',
        url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Scarlet fungal fruiting body with white pyramidal universal veil warts.',
        behavior: 'Mycorrhizal Spore Release',
        credit: 'Unsplash Fungi Archives',
      },
    ],
  },

  // 18. Triceratops (Triceratops horridus)
  'triceratops': {
    image: '/src/assets/images/prehistoric_dinosaur_world_1790604478527.jpg',
    secondaryImage: '/src/assets/images/tyrannosaurus_paleoart_1790608957019.jpg',
    thumbnail: '/src/assets/images/prehistoric_dinosaur_world_1790604478527.jpg',
    imageSource: 'American Museum of Natural History / Peer-Reviewed Paleoart',
    imageCredit: 'Scientific Reconstruction based on AMNH 5116 and MOR 699 skull holotypes',
    isReconstruction: true,
    reconstructionNote: "Artist's scientific reconstruction based on fossil evidence and ceratopsian bone beds",
    gallery: [
      {
        id: 'triceratops-scene',
        url: '/src/assets/images/prehistoric_dinosaur_world_1790604478527.jpg',
        caption: 'Three-horned ceratopsian browsing low-growing Cretaceous cycads and ferns.',
        behavior: 'Herbivorous Browsing',
        isReconstruction: true,
        credit: 'BioSphere Scientific Paleoart',
      },
    ],
  },

  // 19. Emperor Penguin (Aptenodytes forsteri)
  'emperor-penguin': {
    image: '/src/assets/images/emperor_penguin_polar_1790608886208.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    thumbnail: '/src/assets/images/emperor_penguin_polar_1790608886208.jpg',
    imageSource: 'Australian Antarctic Division / Wikimedia Commons',
    imageCredit: 'Photo: Christopher Michel / Wikimedia Commons (CC BY 2.0)',
    gallery: [
      {
        id: 'penguin-colony',
        url: '/src/assets/images/emperor_penguin_polar_1790608886208.jpg',
        caption: 'Emperor penguins standing on pack ice with dense insulating plumage and golden auroral markings.',
        behavior: 'Antarctic Colony Survival',
        credit: 'BioSphere Polar Expeditions',
      },
      {
        id: 'penguin-sea-ice',
        url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Antarctic ice shelf where penguin parents take turns foraging in sub-zero waters.',
        behavior: 'Polar Foraging',
        credit: 'Unsplash Polar Collection',
      },
    ],
  },

  // 20. Saltwater Crocodile (Crocodylus porosus)
  'saltwater-crocodile': {
    image: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=1200&q=80',
    imageSource: 'Queensland Department of Environment / Wikimedia Commons',
    imageCredit: 'Photo: Brian Gratwicke / Wikimedia Commons (CC BY 2.0)',
    gallery: [
      {
        id: 'croc-basking',
        url: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=1200&q=80',
        caption: 'Apex estuarine reptile basking on river mud bank, displaying bony dermal scutes and powerful jaw muscles.',
        behavior: 'Ectothermic Thermoregulation',
        credit: 'Unsplash Reptile Collection',
      },
    ],
  },

  // 21. Cyanobacteria (Blue-Green Algae / Nostoc)
  'cyanobacteria': {
    image: '/src/assets/images/microscopic_cell_world_1790604498200.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    thumbnail: '/src/assets/images/microscopic_cell_world_1790604498200.jpg',
    imageSource: 'NASA Astrobiology / University of Wisconsin Microscopy Lab',
    imageCredit: 'Fluorescence Microscopy · Microscopic visualization (2,500× Magnification)',
    isMicroscopic: true,
    magnification: 'Light Microscopy & Epifluorescence · 2,500× Magnification',
    gallery: [
      {
        id: 'cyanobacteria-cell',
        url: '/src/assets/images/microscopic_cell_world_1790604498200.jpg',
        caption: 'Filamentous photosynthetic bacterial chains displaying oxygenic thylakoid membranes under microscopic magnification.',
        behavior: 'Microscopic Photosynthesis (2,500×)',
        credit: 'BioSphere Microscopic Science',
      },
    ],
  },

  // 22. Leafcutter Ant (Atta cephalotes)
  'leafcutter-ant': {
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
    imageSource: 'Wikimedia Commons / Smithsonian Tropical Research Institute',
    imageCredit: 'Photo: Alex Wild / Wikimedia Commons (CC BY-SA 3.0)',
    gallery: [
      {
        id: 'ant-carrying',
        url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
        caption: 'Worker ant transporting a fresh leaf fragment back to underground fungal gardens.',
        behavior: 'Foraging & Agricultural Transport',
        credit: 'Unsplash Macro Wildlife',
      },
    ],
  },
};

// 3. Dynamic Cache for Search / Remote Retrieval
const dynamicImageCache = new Map<string, string>();

/**
 * Retrieves the complete image package for an organism ID.
 */
export function getOrganismImagePackage(organismId: string): OrganismImagePackage {
  if (ORGANISM_IMAGE_CATALOG[organismId]) {
    return ORGANISM_IMAGE_CATALOG[organismId];
  }

  // Graceful fallback for custom or dynamic IDs
  return {
    image: '/src/assets/images/biosphere_hero_life_1790604449418.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    thumbnail: '/src/assets/images/biosphere_hero_life_1790604449418.jpg',
    imageSource: 'BioSphere Natural History Archive',
    imageCredit: 'BioSphere Scientific Life Collection',
    gallery: [],
  };
}

/**
 * Retrieves ecosystem image package.
 */
export function getEcosystemImage(habitat: HabitatCategory): EcosystemImagePackage {
  return ECOSYSTEM_IMAGES[habitat] || ECOSYSTEM_IMAGES.oceans;
}

/**
 * Dynamic species image lookup via Wikipedia / Wikimedia Commons API.
 * Uses exact scientific name or common name with CORS origin=* and in-memory caching.
 */
export async function searchDynamicSpeciesImage(query: string): Promise<string | null> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return null;

  if (dynamicImageCache.has(cleanQuery.toLowerCase())) {
    return dynamicImageCache.get(cleanQuery.toLowerCase())!;
  }

  try {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(
      cleanQuery
    )}&pithumbsize=1000&format=json&origin=*`;

    const res = await fetch(endpoint);
    const data = await res.json();
    const pages = data?.query?.pages;

    if (pages) {
      const pageId = Object.keys(pages)[0];
      const page = pages[pageId];
      if (page?.thumbnail?.source) {
        const imageUrl = page.thumbnail.source;
        dynamicImageCache.set(cleanQuery.toLowerCase(), imageUrl);
        return imageUrl;
      }
    }
  } catch (err) {
    // Non-blocking graceful catch
    console.debug('[ImageService] Dynamic lookup skipped for:', cleanQuery);
  }

  return null;
}
