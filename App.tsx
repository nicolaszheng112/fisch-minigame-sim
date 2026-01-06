
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import FishingBar, { FishingBarHandle } from './components/FishingBar';
import Controls from './components/Controls';
import WebGPUBackground from './components/WebGPUBackground';
import { GameState, GameSettings, Bait, Fish, Rod } from './types';
import { clamp, randomRange, lerp } from './utils/math';
import { BAITS } from './data/baits';
import { RODS } from './data/rods';

const DEFAULT_SETTINGS: GameSettings = {
  gravity: 240,
  acceleration: 240,
  friction: 0.93,
  catchRate: 0,
  drainRate: 15,
  progressSpeed: 0
};

const FREEZE_DURATION = 1.2;
const REEL_DURATION_BASE = 8.0;
const MOVEMENT_PAUSE_DELAY = 0.7; 

interface ExtendedGameState extends GameState {
  predictionStart: number;
  predictionWidth: number;
}

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  
  // Simulation settings
  const [isResilienceManual, setIsResilienceManual] = useState(false);
  const [manualResilience, setManualResilience] = useState(0.45);
  const [baseControl, setBaseControl] = useState(0);
  
  const [selectedBait, setSelectedBait] = useState<Bait>(BAITS[0]);
  const [selectedFish, setSelectedFish] = useState<Fish | undefined>();
  const [selectedRod, setSelectedRod] = useState<Rod | undefined>();
  
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [showPrediction, setShowPrediction] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Compute effective resilience for the simulation display and logic
  const effectiveResilience = useMemo(() => {
    if (isResilienceManual) return manualResilience;
    
    const fishRes = selectedFish?.resilience ?? 0.45;
    const rodRes = selectedRod?.resilience ?? 0;
    const baitRes = selectedBait.resBonus ?? 0;
    
    return fishRes + rodRes + baitRes;
  }, [isResilienceManual, manualResilience, selectedFish, selectedRod, selectedBait]);

  const barRef = useRef<FishingBarHandle>(null);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  
  const stateRef = useRef<ExtendedGameState>({
    fishPos: 50,
    fishTargetPos: 50,
    fishMoveStartTime: 0,
    fishMoveDuration: 1000,
    fishMoveStartPos: 50,
    lastMoveTriggerTime: 0,
    playerPos: 35,
    playerVelocity: 0,
    playerWidth: 30,
    isPressing: false,
    progress: 15,
    resilience: 0.45,
    control: 0,
    isStarted: false,
    gameStartTime: 0,
    isGameOver: false,
    isWin: false,
    predictionStart: 45,
    predictionWidth: 10,
    currentRod: undefined
  });
  
  const settingsRef = useRef<GameSettings>(settings);
  useEffect(() => { settingsRef.current = settings; }, [settings]);

  const handleInteractionStart = useCallback(() => { stateRef.current.isPressing = true; }, []);
  const handleInteractionEnd = useCallback(() => { stateRef.current.isPressing = false; }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleInteractionStart();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') handleInteractionEnd();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [handleInteractionStart, handleInteractionEnd]);

  const startNewMove = (currentTime: number, currentPos: number, res: number) => {
    const logicRes = Math.max(0, res);
    const rClamped = clamp(logicRes, 0.7, 1.5);
    let targetPos: number;
    
    if (currentPos <= 8) {
      targetPos = clamp(currentPos + randomRange(10 * rClamped, 35 * rClamped), 5, 95);
    } else if (currentPos >= 92) {
      targetPos = clamp(currentPos - randomRange(10 * rClamped, 35 * rClamped), 5, 95);
    } else {
      targetPos = clamp(currentPos + randomRange(-45 * rClamped, 45 * rClamped), 5, 95);
    }

    const durationRes = Math.max(0.05, res);
    const calculatedDuration = randomRange(1.3 * durationRes, 3.5 * durationRes) * 1000;
    const duration = Math.max(350, calculatedDuration);

    let pStart, pEnd;
    if (targetPos <= 8) {
      pStart = targetPos + 10 * rClamped;
      pEnd = targetPos + 35 * rClamped;
    } else if (targetPos >= 92) {
      pStart = targetPos - 35 * rClamped;
      pEnd = targetPos - 10 * rClamped;
    } else {
      pStart = targetPos - 45 * rClamped;
      pEnd = targetPos + 45 * rClamped;
    }

    return {
      lastMoveTriggerTime: currentTime,
      fishMoveStartTime: currentTime,
      fishMoveStartPos: currentPos,
      fishTargetPos: targetPos,
      fishMoveDuration: duration,
      predictionStart: clamp(pStart, 5, 95),
      predictionWidth: clamp(pEnd - pStart, 1, 100)
    };
  };

  const update = (time: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(update);
      return;
    }
    const deltaTime = Math.min(0.033, (time - lastTimeRef.current) / 1000);
    lastTimeRef.current = time;

    const s = stateRef.current;
    if (!s.isStarted || s.isGameOver) {
      requestRef.current = requestAnimationFrame(update);
      return;
    }

    const currentSettings = settingsRef.current;
    const elapsedSinceStart = (time - s.gameStartTime) / 1000;
    const isFrozen = elapsedSinceStart < FREEZE_DURATION;

    if (!isFrozen) {
      const isMoveFinished = (time - s.fishMoveStartTime) >= s.fishMoveDuration;
      const timeSinceMoveEnded = (time - (s.fishMoveStartTime + s.fishMoveDuration)) / 1000;
      
      if (isMoveFinished && timeSinceMoveEnded > MOVEMENT_PAUSE_DELAY) {
        Object.assign(s, startNewMove(time, s.fishPos, s.resilience));
      }
      
      const t = Math.min(1, (time - s.fishMoveStartTime) / s.fishMoveDuration);
      const ease = t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
      s.fishPos = lerp(s.fishMoveStartPos, s.fishTargetPos, ease);

      if (s.isPressing) {
        s.playerVelocity += currentSettings.acceleration * deltaTime;
      } else {
        s.playerVelocity -= currentSettings.gravity * deltaTime;
      }
      
      s.playerVelocity *= Math.pow(currentSettings.friction, deltaTime * 60);
      s.playerPos = clamp(s.playerPos + s.playerVelocity * deltaTime, 0, 100 - s.playerWidth);

      const isCatching = s.fishPos >= s.playerPos && s.fishPos <= s.playerPos + s.playerWidth;
      
      let effectiveSpeed = currentSettings.progressSpeed;
      if (s.currentRod) {
        effectiveSpeed += s.currentRod.speedBonus;
      }

      const rate = (100 / REEL_DURATION_BASE) * (1 + effectiveSpeed / 100);
      s.progress = clamp(s.progress + (isCatching ? rate : -currentSettings.drainRate) * deltaTime, 0, 100);

      if (s.progress >= 100 || s.progress <= 0) {
        s.isGameOver = true;
        s.isWin = s.progress >= 100;
        setIsGameOver(true);
        setIsWin(s.isWin);
      }
    } else {
      s.playerVelocity = 0;
    }

    if (barRef.current) {
      barRef.current.update(
        s.fishPos,
        s.playerPos,
        s.progress, 
        s.predictionStart,
        s.predictionWidth,
        s.fishPos >= s.playerPos && s.fishPos <= s.playerPos + s.playerWidth
      );
    }

    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const startGame = () => {
    const now = performance.now();
    
    const rodControl = selectedRod ? selectedRod.control : 0;
    const effectiveCtrl = baseControl + selectedBait.controlBonus + rodControl;
    const effectiveWidth = clamp(30 + (effectiveCtrl * 100), 8, 100);

    const initialMove = startNewMove(now, 50, effectiveResilience);

    stateRef.current = {
      fishPos: 50,
      fishTargetPos: 50,
      fishMoveStartTime: now,
      fishMoveDuration: 1000,
      fishMoveStartPos: 50,
      lastMoveTriggerTime: now,
      playerPos: 50 - effectiveWidth / 2,
      playerVelocity: 0,
      playerWidth: effectiveWidth,
      isPressing: false,
      progress: 20,
      resilience: effectiveResilience,
      control: effectiveCtrl,
      isStarted: true,
      gameStartTime: now,
      isGameOver: false,
      isWin: false,
      currentRod: selectedRod,
      ...initialMove
    };
    
    setIsStarted(true);
    setIsGameOver(false);
    setCountdown(3);
    
    const countInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(countInterval);
          return null;
        }
        return prev - 1;
      });
    }, 400);
  };

  const resetGame = () => {
    stateRef.current.isStarted = false;
    setIsStarted(false);
    setIsGameOver(false);
  };

  const reloadSimulation = () => {
    resetGame();
    setIsResilienceManual(false);
    setManualResilience(0.45);
    setBaseControl(0);
    setSelectedBait(BAITS[0]);
    setSelectedFish(undefined);
    setSelectedRod(undefined);
    setSettings(DEFAULT_SETTINGS);
    setShowPrediction(false);
    setCountdown(null);
    stateRef.current = {
      ...stateRef.current,
      fishPos: 50,
      playerPos: 35,
      progress: 15,
      resilience: 0.45,
      control: 0,
      isStarted: false,
      isGameOver: false,
      isWin: false,
      currentRod: undefined
    };
    if (barRef.current) {
      barRef.current.update(50, 35, 15, 45, 10, false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-12 px-4 gap-8 select-none bg-slate-900 text-slate-100 overflow-hidden font-sans relative">
      <WebGPUBackground />
      
      <button 
        onClick={reloadSimulation}
        className="absolute top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 rounded-lg text-xs font-black uppercase tracking-widest text-slate-300 transition-all active:scale-95 shadow-lg backdrop-blur-md group"
      >
        <svg 
          className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" 
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M23 4v6h-6"></path>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Reload Simulation
      </button>

      <div className="max-w-4xl w-full text-center space-y-2 z-10">
        <h1 className="text-3xl font-bold tracking-tight text-white">Fishing Simulator</h1>
        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em]">Simulation Engine v2.1</p>
      </div>

      <div className="relative bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl w-full max-w-4xl z-10 overflow-hidden">
        <FishingBar ref={barRef} state={stateRef.current} showPrediction={showPrediction} effectiveResilience={effectiveResilience} />
        
        {!isStarted && (
           <div className="absolute inset-0 z-40 flex items-center justify-center bg-slate-900/60 rounded-2xl backdrop-blur-sm">
             <button 
               onClick={startGame} 
               className="px-12 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-wide"
             >
               Start Fishing
             </button>
           </div>
        )}

        {isStarted && countdown !== null && (
          <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
            <span className="text-7xl font-bold text-white drop-shadow-2xl animate-pulse">{countdown}</span>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90 rounded-2xl animate-in fade-in duration-300">
            <div className="text-center p-10 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl">
              <h2 className={`text-4xl font-bold mb-6 ${isWin ? 'text-green-400' : 'text-red-500'}`}>
                {isWin ? 'Fish Caught!' : 'Line Snapped'}
              </h2>
              <button 
                onClick={resetGame} 
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all"
              >
                Reset Simulator
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="z-10 w-full max-w-4xl">
        <Controls 
          resilience={effectiveResilience} 
          setResilience={setManualResilience} 
          isResilienceManual={isResilienceManual}
          setIsResilienceManual={setIsResilienceManual}
          control={baseControl} 
          setControl={setBaseControl} 
          bait={selectedBait} 
          setBait={setSelectedBait} 
          fish={selectedFish} 
          onSelectFish={(f) => { 
            setSelectedFish(f); 
            if (isResilienceManual) setManualResilience(f.resilience);
            setSettings(prev => ({ ...prev, progressSpeed: f.speed })); 
          }}
          rod={selectedRod}
          setRod={setSelectedRod}
          settings={settings} 
          setSettings={setSettings} 
          onReset={resetGame} 
          showPrediction={showPrediction} 
          setShowPrediction={setShowPrediction} 
        />
      </div>
    </div>
  );
};

export default App;
