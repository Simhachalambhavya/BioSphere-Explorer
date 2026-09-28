/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BioSphereProvider, useBioSphere } from './context/BioSphereContext';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { AgeSetupModal } from './components/AgeSetupModal';
import { MainDashboard } from './components/MainDashboard';
import { HabitatsGrid } from './components/HabitatsGrid';
import { CategoriesGrid } from './components/CategoriesGrid';
import { OrganismDetail } from './components/OrganismDetail';
import { OrganismSearch } from './components/OrganismSearch';
import { CompareView } from './components/CompareView';
import { AncientEarthView } from './components/AncientEarthView';
import { TinyWorldsView } from './components/TinyWorldsView';
import { PlantExplorerView } from './components/PlantExplorerView';
import { ProgressDashboard } from './components/ProgressDashboard';
import { ParentSettingsModal } from './components/ParentSettingsModal';
import { Footer } from './components/Footer';
import { ORGANISMS } from './data/organisms';

const AppContent: React.FC = () => {
  const {
    activeView,
    setActiveView,
    selectedOrganismId,
    isSetupCompleted,
  } = useBioSphere();

  const [setupModalOpen, setSetupModalOpen] = useState(false);
  const [parentSettingsOpen, setParentSettingsOpen] = useState(false);

  // Active organism for detail view
  const currentOrganism =
    ORGANISMS.find(o => o.id === selectedOrganismId) || ORGANISMS[0];

  const handleStartExploringClick = () => {
    if (!isSetupCompleted) {
      setSetupModalOpen(true);
    } else {
      setActiveView('explore');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* VIEW: HOME / LANDING */}
        {activeView === 'home' && (
          <div>
            <LandingHero onStartClick={handleStartExploringClick} />
            <MainDashboard />
          </div>
        )}

        {/* VIEW: MAIN EXPLORER DASHBOARD */}
        {activeView === 'explore' && <MainDashboard />}

        {/* VIEW: HABITATS */}
        {activeView === 'habitats' && <HabitatsGrid />}

        {/* VIEW: CATEGORIES / LIFE FORMS */}
        {activeView === 'categories' && <CategoriesGrid />}

        {/* VIEW: ORGANISM DETAIL */}
        {activeView === 'organism-detail' && (
          <OrganismDetail organism={currentOrganism} />
        )}

        {/* VIEW: SEARCH */}
        {activeView === 'search' && <OrganismSearch />}

        {/* VIEW: COMPARE */}
        {activeView === 'compare' && <CompareView />}

        {/* VIEW: ANCIENT EARTH */}
        {activeView === 'ancient' && <AncientEarthView />}

        {/* VIEW: TINY WORLDS */}
        {activeView === 'microscopic' && <TinyWorldsView />}

        {/* VIEW: PLANTS */}
        {activeView === 'plants' && <PlantExplorerView />}

        {/* VIEW: PROGRESS & BADGES / FAVORITES */}
        {(activeView === 'progress' || activeView === 'favorites') && (
          <ProgressDashboard />
        )}

        {/* VIEW: PARENT SETTINGS */}
        {activeView === 'parent-settings' && (
          <div className="py-12">
            <ParentSettingsModal
              isOpen={true}
              onClose={() => setActiveView('home')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Setup Modal on Initial Start Exploring */}
      <AgeSetupModal
        isOpen={setupModalOpen}
        onClose={() => setSetupModalOpen(false)}
      />

      {/* Global Parent Settings Modal Triggered from Nav */}
      <ParentSettingsModal
        isOpen={parentSettingsOpen}
        onClose={() => setParentSettingsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <BioSphereProvider>
      <AppContent />
    </BioSphereProvider>
  );
}
