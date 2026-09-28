import React, { useState } from 'react';
import { useBioSphere, AppView } from '../context/BioSphereContext';
import { Sparkles, Heart, Award, Settings, Search, Menu, X, Compass } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    profile,
    activeView,
    setActiveView,
    completeSetup,
  } = useBioSphere();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickAgeOpen, setQuickAgeOpen] = useState(false);

  const navLinks: Array<{ label: string; view: AppView }> = [
    { label: 'Explore', view: 'explore' },
    { label: 'Habitats', view: 'habitats' },
    { label: 'Life Forms', view: 'categories' },
    { label: 'Ancient Earth', view: 'ancient' },
    { label: 'Tiny Worlds', view: 'microscopic' },
    { label: 'Plants', view: 'plants' },
    { label: 'Compare', view: 'compare' },
  ];

  const handleNavClick = (view: AppView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark with integrated Leaf/DNA/Globe/Fauna emblem */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg p-1"
          >
            {/* Custom SVG Logo: Leaf + Fauna Tail + DNA helix + Globe */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-600 p-[2px] shadow-sm shadow-emerald-950/50 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Globe ring */}
                  <circle cx="12" cy="12" r="9" className="text-sky-500/40" />
                  {/* Leaf / Fauna curve */}
                  <path d="M12 3c4.5 0 9 4 9 9-4.5 0-9-4-9-9z" className="text-emerald-400 fill-emerald-500/20" />
                  {/* DNA cross bridge */}
                  <path d="M7 16c2-1 4-1 6 0m-4-6c2-1 4-1 6 0" className="text-teal-300" />
                  {/* Marine tail curve */}
                  <path d="M6 19c3-1 5-4 5-7" className="text-sky-400" />
                </svg>
              </div>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-emerald-300 transition-colors">
              BioSphere Explorer
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 Clean text navigation links (anti-slop: clean text with hover line, no pills) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(({ label, view }) => {
            const isActive = activeView === view;
            return (
              <button
                key={view}
                onClick={() => handleNavClick(view)}
                className={`whitespace-nowrap transition-colors py-1 relative ${
                  isActive
                    ? 'text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary functional controls (Age Indicator/Switcher, Search, Settings) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={() => handleNavClick('search')}
            title="Search organisms"
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Favorites shortcut */}
          <button
            onClick={() => handleNavClick('favorites')}
            title="My Saved Organisms"
            className="p-2 text-slate-300 hover:text-rose-400 hover:bg-slate-800/60 rounded-lg transition-colors relative focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <Heart className={`w-4 h-4 ${profile.favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {profile.favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          {/* Explorer Progress */}
          <button
            onClick={() => handleNavClick('progress')}
            title="Explorer Badges & Progress"
            className="p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Award className="w-4 h-4" />
          </button>

          {/* Age Selector Dropdown / Popover (Core adaptive feature) */}
          <div className="relative">
            <button
              onClick={() => setQuickAgeOpen(!quickAgeOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 whitespace-nowrap"
              title="Click to change adaptive learning age"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Age {profile.age}</span>
            </button>

            {quickAgeOpen && (
              <div className="absolute right-0 mt-2 w-56 p-3 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-xs font-medium text-slate-400 mb-2">
                  Learning Level: <span className="text-emerald-400 font-semibold">{profile.explorerLevel}</span>
                </div>
                <div className="text-xs text-slate-300 mb-2">Select learner age:</div>
                <div className="grid grid-cols-5 gap-1 mb-3">
                  {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(a => (
                    <button
                      key={a}
                      onClick={() => {
                        completeSetup(a);
                        setQuickAgeOpen(false);
                      }}
                      className={`h-7 text-xs font-semibold rounded ${
                        profile.age === a
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Content adapts instantly</span>
                  <button
                    onClick={() => {
                      setQuickAgeOpen(false);
                      handleNavClick('parent-settings');
                    }}
                    className="text-emerald-400 hover:underline font-medium"
                  >
                    All Settings
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Parent Settings Button */}
          <button
            onClick={() => handleNavClick('parent-settings')}
            title="Parent & Guardian Settings"
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map(({ label, view }) => (
            <button
              key={view}
              onClick={() => handleNavClick(view)}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeView === view
                  ? 'bg-emerald-950/60 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-3">
            <span>Explorer Age: {profile.age}</span>
            <button
              onClick={() => handleNavClick('parent-settings')}
              className="text-emerald-400 font-medium"
            >
              Parent Settings
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
