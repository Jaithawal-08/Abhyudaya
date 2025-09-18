import { Color } from "three";

export const CAMERA = {
  fov: 45,
  near: 0.1,
  far: 100,
  position: [0, 0, 6] as [number, number, number],
};

export const COLORS = {
  brand: new Color("#00A2FF"),
  background: new Color("#121212"),
};

export const LIGHTS = {
  ambient: 0.6,
  spotIntensity: 0.9,
};

export const PERFORMANCE = {
  dpr: [1, 2] as [number, number],
  shadows: false,
};
