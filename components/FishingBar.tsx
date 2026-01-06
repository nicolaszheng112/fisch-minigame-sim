
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { GameState } from '../types';

export interface FishingBarHandle {
  update: (fishPos: number, playerPos: number, progress: number, pStart: number, pWidth: number, isCatching: boolean) => void;
}

interface FishingBarProps {
  state: GameState;
  showPrediction: boolean;
  effectiveResilience: number;
}

const FishingBar = forwardRef<FishingBarHandle, FishingBarProps>(({ state, showPrediction, effectiveResilience }, ref) => {
  const fishRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const predictionRef = useRef<HTMLDivElement>(null);
  const fishIconRef = useRef<SVGSVGElement>(null);

  useImperativeHandle(ref, () => ({
    update: (fishPos, playerPos, progress, pStart, pWidth, isCatching) => {
      if (fishRef.current) fishRef.current.style.left = `${fishPos}%`;
      
      if (playerRef.current) {
        playerRef.current.style.left = `${playerPos}%`;
        playerRef.current.className = `absolute top-0 h-full z-20 border-x flex items-center justify-center transition-colors duration-200 ${
          isCatching ? 'bg-white/20 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-white/5 border-white/20'
        }`;
      }
      
      if (progressRef.current) progressRef.current.style.width = `${Math.max(0, progress)}%`;
      if (progressTextRef.current) progressTextRef.current.innerText = `${Math.max(0, progress).toFixed(1)}%`;
      
      if (predictionRef.current) {
        predictionRef.current.style.left = `${pStart}%`;
        predictionRef.current.style.width = `${Math.max(0.1, pWidth)}%`;
      }
      
      if (fishIconRef.current) {
        fishIconRef.current.style.fill = isCatching ? '#fb923c' : '#ffffff';
        fishIconRef.current.style.transform = isCatching ? 'scale(1.1)' : 'scale(1.0)';
      }
    }
  }));

  return (
    <div className={`w-full flex flex-col items-center gap-6 select-none transition-opacity duration-300 ${!state.isStarted ? 'opacity-40' : 'opacity-100'}`}>
      <div className="w-full flex flex-col items-center justify-center h-6">
         <div className="flex items-center gap-3">
            <span className="text-slate-300 font-semibold text-sm tracking-wide">
              EFFECTIVE RESILIENCE: {(effectiveResilience * 100).toFixed(0)}%
            </span>
         </div>
      </div>

      <div className="relative w-full h-12 bg-slate-900 rounded-lg border-2 border-slate-700/50 shadow-inner overflow-hidden">
        {/* Safety Zones */}
        <div className="absolute left-0 top-0 h-full w-[3%] bg-red-900/20 border-r border-red-500/10 z-10" />
        <div className="absolute right-0 top-0 h-full w-[10%] bg-red-900/20 border-l border-red-500/10 z-10" />
        
        {/* Prediction Zone */}
        {showPrediction && (
          <div 
            ref={predictionRef}
            className="absolute top-0 h-full bg-yellow-400/10 border-x border-yellow-400/20 z-0 pointer-events-none transition-all duration-700 ease-in-out"
            style={{ width: '0%', left: '0%' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 to-transparent" />
          </div>
        )}

        {/* Player Bar */}
        <div 
          ref={playerRef}
          className="absolute top-0 h-full z-20 border-x flex items-center justify-center bg-white/5 border-white/20"
          style={{ width: `${state.playerWidth}%`, left: '35%' }}
        >
          <div className="w-px h-6 bg-white/20" />
        </div>

        {/* Fish Target */}
        <div 
          ref={fishRef}
          className="absolute top-0 h-full w-px z-30 pointer-events-none"
          style={{ left: '50%' }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
             <svg ref={fishIconRef} className="w-8 h-8 drop-shadow-md fill-white transition-transform duration-200" viewBox="0 0 24 24">
               <path d="M21,12C21,12 18,17 12,17C7,17 3,12 3,12C3,12 7,7 12,7C18,7 21,12 21,12M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5Z" />
             </svg>
          </div>
          <div className="w-1 h-full absolute left-1/2 -translate-x-1/2 bg-orange-500" />
        </div>
      </div>

      <div className="w-full max-w-lg flex flex-col items-center gap-2">
        <div className="w-full flex justify-between items-end px-1">
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Progress</span>
          <span ref={progressTextRef} className="text-sm font-bold text-slate-200 tracking-tight">0.0%</span>
        </div>
        <div className="w-full h-3 bg-slate-900 rounded-full border border-slate-700/50 p-0.5">
          <div 
            ref={progressRef}
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-400"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </div>
  );
});

export default FishingBar;
