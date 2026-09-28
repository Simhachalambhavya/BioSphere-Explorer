import React, { useState } from 'react';
import { useBioSphere } from '../context/BioSphereContext';
import { Settings, ShieldCheck, RefreshCw, Volume2, Sparkles, X, Check } from 'lucide-react';

interface ParentSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentSettingsModal: React.FC<ParentSettingsModalProps> = ({ isOpen, onClose }) => {
  const { profile, setAge, resetAllProgress, updateSettings } = useBioSphere();
  const [tempAge, setTempAge] = useState<number>(profile.age);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setAge(tempAge);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    resetAllProgress();
    setConfirmReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          aria-label="Close settings"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-emerald-400 mb-2">
          <Settings className="w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Parent & Guardian Controls</span>
        </div>

        <h3 className="font-display font-bold text-2xl text-white mb-1">
          BioSphere Settings
        </h3>
        <p className="text-slate-400 text-xs mb-6">
          Adjust learning preferences, manage sound, or update the learner's age.
        </p>

        <div className="space-y-6">
          {/* Age Selection */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Learner's Age (5–15)
              </label>
              <span className="text-sm font-bold text-emerald-400">
                Age {tempAge}
              </span>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5">
              {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setTempAge(a)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    tempAge === a
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-slate-400">
              Content complexity, scientific terms, and quizzes automatically adjust to this age.
            </p>
          </div>

          {/* Audio & Accessibility Settings */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Audio & Speech Settings
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">Speech Read-Aloud Rate:</span>
              <div className="flex items-center gap-1">
                {[0.8, 0.95, 1.1].map(rate => (
                  <button
                    key={rate}
                    onClick={() => updateSettings({ speechRate: rate })}
                    className={`px-2.5 py-1 text-xs rounded font-mono ${
                      profile.settings.speechRate === rate
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {rate === 0.8 ? 'Slow' : rate === 0.95 ? 'Normal' : 'Fast'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Child Privacy & Safety Review */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Child Safety & Privacy Standard</span>
            </div>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>✓ No personal names, emails, addresses, or phone numbers required.</li>
              <li>✓ No advertisements, sponsorships, or commercial marketing.</li>
              <li>✓ Zero public social chat or public user-to-user interactions.</li>
              <li>✓ All progress is stored strictly inside your local browser storage.</li>
            </ul>
          </div>

          {/* Reset Progress Section */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="text-xs text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Learning Progress</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-400 font-semibold">Are you sure?</span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded"
                >
                  Yes, Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded"
                >
                  Cancel
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Apply Settings</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
