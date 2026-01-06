
import React, { useState, useMemo } from 'react';
import { GameSettings, Bait, Fish, Rod } from '../types';
import { BAITS } from '../data/baits';
import { FISH_LIST } from '../data/fish';
import { RODS } from '../data/rods';

interface ControlsProps {
  resilience: number;
  setResilience: (val: number) => void;
  isResilienceManual: boolean;
  setIsResilienceManual: (val: boolean) => void;
  control: number;
  setControl: (val: number) => void;
  bait: Bait;
  setBait: (bait: Bait) => void;
  fish?: Fish;
  onSelectFish: (fish: Fish) => void;
  rod?: Rod;
  setRod: (rod: Rod) => void;
  settings: GameSettings;
  setSettings: (settings: GameSettings) => void;
  onReset: () => void;
  showPrediction: boolean;
  setShowPrediction: (val: boolean) => void;
}

type BaitFilter = 'all' | 'positive' | 'negative' | 'control';
type FishFilter = 'all' | 'hard' | 'medium' | 'easy' | 'fast' | 'slow';

const Controls: React.FC<ControlsProps> = ({ 
  resilience, setResilience, 
  isResilienceManual, setIsResilienceManual,
  control, setControl, 
  bait, setBait, 
  fish, onSelectFish,
  rod, setRod,
  settings, setSettings, 
  onReset,
  showPrediction, setShowPrediction
}) => {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isRodOpen, setIsRodOpen] = useState(false);
  const [isBaitOpen, setIsBaitOpen] = useState(false);
  const [isFishOpen, setIsFishOpen] = useState(false);
  
  const [rodSearch, setRodSearch] = useState('');
  const [baitSearch, setBaitSearch] = useState('');
  const [fishSearch, setFishSearch] = useState('');
  
  const [baitFilter, setBaitFilter] = useState<BaitFilter>('all');
  const [fishFilter, setFishFilter] = useState<FishFilter>('all');

  const filteredRods = useMemo(() => {
    return RODS.filter(r => r.name.toLowerCase().includes(rodSearch.toLowerCase()));
  }, [rodSearch]);

  const filteredBaits = useMemo(() => {
    return BAITS.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(baitSearch.toLowerCase());
      if (!matchesSearch) return false;
      if (baitFilter === 'all') return true;
      if (baitFilter === 'positive') return b.resBonus > 0;
      if (baitFilter === 'negative') return b.resBonus < 0;
      if (baitFilter === 'control') return b.controlBonus > 0;
      return true;
    });
  }, [baitSearch, baitFilter]);

  const [displayLimit, setDisplayLimit] = useState(60);

  const filteredFish = useMemo(() => {
    let result = FISH_LIST.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(fishSearch.toLowerCase());
      if (!matchesSearch) return false;
      if (fishFilter === 'all') return true;
      if (fishFilter === 'hard') return f.resilience < 0.5;
      if (fishFilter === 'medium') return f.resilience >= 0.5 && f.resilience < 1.0;
      if (fishFilter === 'easy') return f.resilience >= 1.0;
      if (fishFilter === 'fast') return f.speed > 0;
      if (fishFilter === 'slow') return f.speed < 0;
      return true;
    });
    return result;
  }, [fishSearch, fishFilter]);

  const displayedFish = useMemo(() => {
    return filteredFish.slice(0, displayLimit);
  }, [filteredFish, displayLimit]);

  const closeOthers = (section: 'stats' | 'rod' | 'bait' | 'fish') => {
    if (section !== 'stats') setIsStatsOpen(false);
    if (section !== 'rod') setIsRodOpen(false);
    if (section !== 'bait') setIsBaitOpen(false);
    if (section !== 'fish') setIsFishOpen(false);
  };

  return (
    <div className="w-full max-w-4xl flex flex-col gap-4 pb-24">
      {/* Simulation Config */}
      <div className="w-full bg-slate-800/20 backdrop-blur-md border border-slate-700/40 rounded-2xl shadow-xl overflow-hidden">
        <button 
          onClick={() => { setIsStatsOpen(!isStatsOpen); closeOthers('stats'); }}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/20 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-all ${isStatsOpen ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 group-hover:text-white">Simulation Config</span>
          </div>
          <span className="text-[10px] font-black text-indigo-500/50 uppercase">{isStatsOpen ? 'Close' : 'Expand'}</span>
        </button>

        <div className={`grid transition-all duration-300 ease-in-out ${isStatsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8 border-t border-slate-700/30">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Resilience</label>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{isResilienceManual ? 'Manual' : 'Auto'}</span>
                       <button 
                         onClick={() => setIsResilienceManual(!isResilienceManual)}
                         className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none ${isResilienceManual ? 'bg-indigo-600' : 'bg-slate-700'}`}
                       >
                         <span className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${isResilienceManual ? 'translate-x-5' : 'translate-x-1'}`} />
                       </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-black ${isResilienceManual ? 'text-white' : 'text-slate-400'}`}>{(resilience * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="-1.0" max="2.0" step="0.01" 
                    value={resilience} 
                    onChange={(e) => setResilience(parseFloat(e.target.value))} 
                    disabled={!isResilienceManual}
                    className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-500 transition-opacity ${isResilienceManual ? 'bg-slate-700 opacity-100' : 'bg-slate-800 opacity-50 cursor-not-allowed'}`} 
                  />
                  {!isResilienceManual && (
                    <p className="text-[8px] font-bold text-slate-600 italic">Auto-calculated: Fish + Rod + Bait</p>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Control</label>
                    <span className="text-sm font-black text-indigo-400">{(30 + control * 100).toFixed(0)}% Width</span>
                  </div>
                  <input type="range" min="-0.3" max="0.7" step="0.01" value={control} onChange={(e) => setControl(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-400" />
                </div>
              </div>

              <div className="space-y-6 md:border-l md:border-slate-700/30 md:pl-12">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Progress Speed</label>
                    <span className={`text-sm font-black ${settings.progressSpeed >= 0 ? 'text-green-400' : 'text-red-400'}`}>{settings.progressSpeed}%</span>
                  </div>
                  <input type="range" min="-99" max="400" step="1" value={settings.progressSpeed} onChange={(e) => setSettings({ ...settings, progressSpeed: parseInt(e.target.value) })} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500" />
                </div>
                
                <div className="pt-4 flex items-center">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={showPrediction} 
                        onChange={(e) => setShowPrediction(e.target.checked)} 
                        className="peer sr-only" 
                      />
                      <div className="h-5 w-5 rounded border border-slate-600 bg-slate-900 transition-all peer-checked:bg-yellow-500 peer-checked:border-yellow-400 flex items-center justify-center group-hover:border-slate-400">
                        <svg className={`w-3.5 h-3.5 text-slate-900 font-bold ${showPrediction ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} transition-all`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors">Show Prediction Zone</span>
                  </label>
                </div>
              </div>

              <div className="space-y-6 md:border-l md:border-slate-700/30 md:pl-12">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Gravity</label>
                    <span className="text-xs font-mono text-slate-300">{settings.gravity}</span>
                  </div>
                  <input type="range" min="20" max="1000" step="10" value={settings.gravity} onChange={(e) => setSettings({ ...settings, gravity: parseFloat(e.target.value) })} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Thrust</label>
                    <span className="text-xs font-mono text-slate-300">{settings.acceleration}</span>
                  </div>
                  <input type="range" min="50" max="1500" step="10" value={settings.acceleration} onChange={(e) => setSettings({ ...settings, acceleration: parseFloat(e.target.value) })} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rod Selection */}
      <div className="w-full bg-slate-800/20 backdrop-blur-md border border-slate-700/40 rounded-2xl shadow-xl overflow-hidden">
        <button 
          onClick={() => { setIsRodOpen(!isRodOpen); closeOthers('rod'); }}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/20 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg bg-blue-500/10 text-blue-400 ${isRodOpen ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Rod Selection</span>
          </div>
          <span className="text-[10px] font-black text-blue-500/50 uppercase">{rod ? rod.name : 'None'}</span>
        </button>

        <div className={`transition-all duration-300 ${isRodOpen ? 'max-h-[600px] opacity-100 p-4' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="flex gap-2 mb-4 px-2">
            <input type="text" placeholder="Search rods..." value={rodSearch} onChange={(e) => setRodSearch(e.target.value)} className="flex-1 bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-2 text-sm text-white" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-y-auto max-h-[300px] p-2 custom-scrollbar">
             <button onClick={() => { setRod(undefined as any); setIsRodOpen(false); }} className={`p-3 rounded-xl border text-left transition-all ${!rod ? 'bg-blue-600/20 border-blue-500/50' : 'bg-slate-900/40 border-slate-700 hover:bg-slate-700/40'}`}>
                <span className="text-[10px] font-black text-slate-300 block mb-1">None</span>
                <span className="text-[8px] font-bold text-slate-500">No Bonuses</span>
            </button>
            {filteredRods.map(r => (
              <button 
                key={r.name} 
                onClick={() => { setRod(r); setIsRodOpen(false); }} 
                className={`group relative p-3 rounded-xl border text-left transition-all ${rod?.name === r.name ? 'bg-blue-600/20 border-blue-500/50' : 'bg-slate-900/40 border-slate-700 hover:bg-slate-700/40'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black text-slate-300 block truncate pr-2">{r.name}</span>
                  {r.speedBonus !== 0 && (
                    <span className={`text-[8px] font-bold ${r.speedBonus > 0 ? 'text-green-400' : 'text-red-400'}`}>{r.speedBonus > 0 ? '+' : ''}{r.speedBonus}% Spd</span>
                  )}
                </div>
                <div className="flex gap-2 text-[8px] font-bold text-slate-500">
                  <span className={r.resilience > 0 ? 'text-blue-400' : ''}>{(r.resilience * 100).toFixed(0)}% Res</span>
                  <span className={r.control > 0 ? 'text-indigo-400' : ''}>{(r.control).toFixed(2)} Ctrl</span>
                </div>
                
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 border border-slate-600 p-3 rounded-lg z-50 pointer-events-none shadow-xl">
                  <p className="text-[10px] font-bold text-white mb-1">{r.name}</p>
                  <p className="text-[9px] text-slate-300 leading-tight">{r.description}</p>
                  <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-b border-r border-slate-600 rotate-45"></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bait Selection */}
      <div className="w-full bg-slate-800/20 backdrop-blur-md border border-slate-700/40 rounded-2xl shadow-xl overflow-hidden">
        <button 
          onClick={() => { setIsBaitOpen(!isBaitOpen); closeOthers('bait'); }}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/20 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 ${isBaitOpen ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Bait Selection</span>
          </div>
          <span className="text-[10px] font-black text-emerald-500/50 uppercase">{bait.name}</span>
        </button>

        <div className={`transition-all duration-300 ${isBaitOpen ? 'max-h-[600px] opacity-100 p-4' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="flex gap-2 mb-4 px-2">
            <input type="text" placeholder="Search baits..." value={baitSearch} onChange={(e) => setBaitSearch(e.target.value)} className="flex-1 bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-2 text-sm text-white" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 overflow-y-auto max-h-[250px] p-2 custom-scrollbar">
            {filteredBaits.map(b => (
              <button key={b.name} onClick={() => { setBait(b); setIsBaitOpen(false); }} className={`p-3 rounded-xl border text-left transition-all ${bait.name === b.name ? 'bg-emerald-600/20 border-emerald-500/50' : 'bg-slate-900/40 border-slate-700 hover:bg-slate-700/40'}`}>
                <span className="text-[10px] font-black text-slate-300 block mb-1">{b.name}</span>
                <span className="text-[8px] font-bold text-emerald-400">{(b.resBonus*100).toFixed(0)}% RES</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fish Library */}
      <div className="w-full bg-slate-800/20 backdrop-blur-md border border-slate-700/40 rounded-2xl shadow-xl overflow-hidden">
        <button 
          onClick={() => { setIsFishOpen(!isFishOpen); closeOthers('fish'); }}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/20 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg bg-orange-500/10 text-orange-400 ${isFishOpen ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Fish Library ({filteredFish.length})</span>
          </div>
          <span className="text-[10px] font-black text-orange-500/50 uppercase">{fish?.name || 'Default'}</span>
        </button>

        <div className={`transition-all duration-300 ${isFishOpen ? 'max-h-[800px] opacity-100 p-4' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col sm:flex-row gap-2 mb-4 px-2">
            <input type="text" placeholder="Search 500+ species..." value={fishSearch} onChange={(e) => { setFishSearch(e.target.value); setDisplayLimit(60); }} className="flex-1 bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50" />
            <select value={fishFilter} onChange={(e) => setFishFilter(e.target.value as FishFilter)} className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs font-bold text-slate-300">
              <option value="all">All Difficulty</option>
              <option value="hard">Hard (&lt;50% Res)</option>
              <option value="medium">Medium</option>
              <option value="easy">Easy (&gt;100% Res)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 overflow-y-auto max-h-[350px] p-2 custom-scrollbar">
            {displayedFish.map(f => (
              <button key={f.name} onClick={() => { onSelectFish(f); setIsFishOpen(false); }} className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${fish?.name === f.name ? 'bg-orange-600/20 border-orange-500/50' : 'bg-slate-900/40 border-slate-700 hover:bg-slate-700/40'}`}>
                <span className="text-[10px] font-black text-slate-300 truncate w-full mb-1">{f.name}</span>
                <div className="flex gap-1">
                  <span className="text-[8px] font-bold text-slate-500">{(f.resilience*100).toFixed(0)}% R</span>
                  <span className={`text-[8px] font-bold ${f.speed >= 0 ? 'text-green-400' : 'text-red-400'}`}>{f.speed}% S</span>
                </div>
              </button>
            ))}
            {filteredFish.length > displayLimit && (
              <button onClick={() => setDisplayLimit(prev => prev + 100)} className="col-span-full py-4 text-[10px] font-black text-orange-500 hover:text-orange-400 uppercase tracking-widest bg-orange-500/5 rounded-xl border border-dashed border-orange-500/20">
                Load More Species ({filteredFish.length - displayLimit} remaining)
              </button>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Controls;
