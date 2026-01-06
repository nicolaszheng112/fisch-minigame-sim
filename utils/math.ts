
export const clamp = (val: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, val));
};

export const randomRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t;
};
