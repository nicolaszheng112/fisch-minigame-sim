
export interface Bait {
  name: string;
  resBonus: number;
  controlBonus: number;
}

export interface Fish {
  name: string;
  speed: number;
  resilience: number;
}

export interface Rod {
  name: string;
  resilience: number; // Percentage as decimal (e.g. 0.2 for 20%)
  control: number; // Raw value
  speedBonus: number; // Percentage (e.g. 15 for +15%)
  description: string;
  color?: string;
}

export interface GameState {
  fishPos: number; // 0 to 100
  fishTargetPos: number;
  fishMoveStartTime: number;
  fishMoveDuration: number;
  fishMoveStartPos: number;
  lastMoveTriggerTime: number;

  playerPos: number; // 0 to 100
  playerVelocity: number;
  playerWidth: number;
  
  isPressing: boolean;
  progress: number; // 0 to 100
  resilience: number;
  control: number; // -0.3 to 0.7
  
  isStarted: boolean;
  gameStartTime: number;
  isGameOver: boolean;
  isWin: boolean;
  currentBait?: Bait;
  currentFish?: Fish;
  currentRod?: Rod;
}

export interface GameSettings {
  gravity: number;
  acceleration: number;
  friction: number;
  catchRate: number;
  drainRate: number;
  progressSpeed: number; // -99 to 400
}