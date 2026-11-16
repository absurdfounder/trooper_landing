'use client';

import { useEffect, useRef } from 'react';
import { openBotFragmentShader, openBotVertexShader } from './openbot-beam-shader';

type BeamSettings = {
  intensity: number;
  beamWidth: number;
  flare: number;
  spread: number;
  spill: number;
  fall: number;
  fog: number;
  smokeSize: number;
  smokeDetail: number;
  smokeEdge: number;
  smokeSwirl: number;
  smokeDrift: number;
  dust: number;
  streaks: number;
  dots: number;
  pulse: number;
  speed: number;
  seed: number;
};

type BeamTheme = { settings: BeamSettings; tint: Float32Array };

type BeamElements = {
  canvas: HTMLCanvasElement;
  surface: HTMLElement;
  source: HTMLElement;
};

const BASE = {
  intensity: 1.6,
  beamWidth: 3.2,
  flare: 2.5,
  spread: 3.8,
  spill: 1,
  fall: 2.2,
  fog: 0.3,
  smokeSize: 1,
  smokeDetail: 0,
  smokeEdge: 0,
  smokeSwirl: 0.8,
  smokeDrift: 1,
  dust: 1.4,
  streaks: 0.8,
  dots: 0.8,
  pulse: 1.4,
  speed: 1.8,
  seed: 3,
};

const PRESETS = [
  BASE,
  { ...BASE, intensity: 1.3, beamWidth: 4.2, flare: 3, spread: 4.2, fall: 1.6, fog: 0.5, dust: 0.6, streaks: 0.4, dots: 0.5, pulse: 0.8, speed: 1.2 },
  { ...BASE, intensity: 1.8, beamWidth: 1.2, flare: 1.5, spread: 3.2, fall: 2.6, fog: 0.15, dust: 1, streaks: 1.6, dots: 1, pulse: 1.6, speed: 2.2 },
  { ...BASE, intensity: 1.5, beamWidth: 3, flare: 2.8, spread: 4, fall: 2, fog: 0.6, dust: 1.9, streaks: 1, dots: 1.2, pulse: 1.2, speed: 1.6, seed: 16 },
  BASE,
] as const;

const RANGES: Record<keyof BeamSettings, [number, number]> = {
  intensity: [1.2, 2], beamWidth: [0.9, 5.5], flare: [1.2, 3.6], spread: [2.4, 6.5],
  spill: [0.7, 1.4], fall: [1.4, 2.8], fog: [0.1, 1], smokeSize: [0.45, 2.2],
  smokeDetail: [0, 1], smokeEdge: [0, 1], smokeSwirl: [0.3, 2], smokeDrift: [0.5, 2.4],
  dust: [0.4, 2.2], streaks: [0.3, 1.8], dots: [0.4, 1.4], pulse: [0.7, 1.8],
  speed: [1.1, 2.4], seed: [0, 20],
};

const COLOR_SWATCHES = [
  '#03a2fe', '#5bc2e5', '#69d8a6',
];
const TINT_OFFSETS: Array<[number, number]> = [
  [0, 1], [-16, 0.76], [16, 0.9], [-24, 0.72], [30, 0.74], [8, 0.81],
  [-8, 0.84], [24, 0.92], [3, 1.01], [1, 0.68], [1, 1.08], [34, 0.51],
  [52, 0.28], [-7.5, 0.13], [-2.7, 0.32], [12, 0.81],
];
const HUE_CLAMP = { min: 165, max: 205 };
const FRAME_INTERVAL_MS = 1000 / 24;
// Keep the beam's shape and movement consistent; only its color family changes per page load.
const BEAM_SHAPE_SEED = 285538;
const BEAM_PALETTE_SESSION_KEY = 'trooper-landing-beam-palette';
const REDUCED_MOTION = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function seededRandom(seed: number) {
  let state = seed | 0;
  return () => {
    state = (state + 1831565813) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function rgbToHsv([red, green, blue]: number[]) {
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let hue = 0;
  if (delta > 0) {
    hue = max === red ? ((green - blue) / delta) % 6 : max === green ? (blue - red) / delta + 2 : (red - green) / delta + 4;
  }
  return [((hue * 60 + 360) % 360), max > 0 ? delta / max : 0];
}

function hsvToRgb(hue: number, saturation: number): [number, number, number] {
  const sector = ((hue % 360) + 360) % 360 / 60;
  const chroma = saturation;
  const x = chroma * (1 - Math.abs(sector % 2 - 1));
  const match = 1 - chroma;
  const rgb = sector < 1 ? [chroma, x, 0] : sector < 2 ? [x, chroma, 0] : sector < 3 ? [0, chroma, x] : sector < 4 ? [0, x, chroma] : sector < 5 ? [x, 0, chroma] : [chroma, 0, x];
  return [rgb[0] + match, rgb[1] + match, rgb[2] + match];
}

function clampHue(value: number) {
  const hue = (value % 360 + 360) % 360;
  return clamp(hue, HUE_CLAMP.min, HUE_CLAMP.max);
}

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16 & 255) / 255, (value >> 8 & 255) / 255, (value & 255) / 255];
}

function blendRgb(base: number[], brand: number[], amount: number): [number, number, number] {
  return [
    base[0] * (1 - amount) + brand[0] * amount,
    base[1] * (1 - amount) + brand[1] * amount,
    base[2] * (1 - amount) + brand[2] * amount,
  ];
}

function createBeamTheme(seed: number, paletteIndex?: number): BeamTheme {
  const random = seededRandom(seed);
  const weights = PRESETS.map((_, index) => (-Math.log(1 - random())) ** 3 * (index === 0 ? 1.5 : 1));
  const weightTotal = weights.reduce((sum, value) => sum + value, 0);
  const sample = (key: keyof BeamSettings) => {
    const weighted = PRESETS.reduce((sum, preset, index) => sum + preset[key] * (weights[index] ?? 0) / weightTotal, 0);
    const [min, max] = RANGES[key];
    return clamp(weighted * 1.7 ** (random() * 2 - 1), min, max);
  };

  const settings: BeamSettings = {
    intensity: sample('intensity'), beamWidth: sample('beamWidth'), flare: sample('flare'), spread: sample('spread'),
    spill: sample('spill'), fall: sample('fall'), fog: sample('fog'), dust: sample('dust'), streaks: sample('streaks'),
    dots: sample('dots'), pulse: sample('pulse'), speed: sample('speed'), seed: random() * 20,
    smokeSize: 1, smokeDetail: 0, smokeEdge: 0, smokeSwirl: 0.8, smokeDrift: 1,
  };

  const swatch = COLOR_SWATCHES[paletteIndex ?? Math.floor(random() * COLOR_SWATCHES.length)] ?? '#5bc2e5';
  const [baseHue, baseSaturation] = rgbToHsv(hexToRgb(swatch));
  const color = hsvToRgb(clampHue(baseHue + (random() - 0.5) * 12), clamp(baseSaturation * (0.9 + random() * 0.2), 0, 1));
  const hueSpread = 0.85 + random() * 1.25;
  const randomInRange = (key: keyof BeamSettings) => {
    const [min, max] = RANGES[key];
    return min + random() * (max - min);
  };
  settings.smokeSize = randomInRange('smokeSize');
  settings.smokeDetail = randomInRange('smokeDetail');
  settings.smokeEdge = randomInRange('smokeEdge');
  settings.smokeSwirl = randomInRange('smokeSwirl');
  settings.smokeDrift = randomInRange('smokeDrift');

  const [hue, saturation] = rgbToHsv(color);
  const tint = new Float32Array(TINT_OFFSETS.length * 3);
  TINT_OFFSETS.forEach(([offset, value], index) => {
    tint.set(hsvToRgb(clampHue(hue + offset * hueSpread), clamp(0.78 * value * (saturation / 0.78), 0, 1)), index * 3);
  });

  // Use Trooper's logo and character colors throughout the beam. The white core
  // stays bright, while blue and mint remain soft in the edge haze.
  const logoBlue = hexToRgb('#5bc2e5');
  const logoGreen = hexToRgb('#69d8a6');
  const tintAt = (index: number) => Array.from(tint.slice(index * 3, index * 3 + 3));
  tint.set(blendRgb(tintAt(3), logoBlue, 0.4), 3 * 3);   // CYAN
  tint.set(blendRgb(tintAt(6), logoBlue, 0.3), 6 * 3);   // SKY
  tint.set(blendRgb(tintAt(9), logoBlue, 0.18), 9 * 3);  // MIST
  tint.set(blendRgb(tintAt(14), logoGreen, 0.22), 14 * 3); // HAZE
  return { settings: { ...settings, seed: settings.seed }, tint };
}

function createPageBeamTheme(): BeamTheme {
  const randomValue = new Uint32Array(1);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(randomValue);
  } else {
    randomValue[0] = Math.floor(Math.random() * 0xffffffff);
  }

  const choose = seededRandom(randomValue[0] ?? 0);
  let previousPalette = -1;
  if (typeof window !== 'undefined') {
    try {
      const stored = Number.parseInt(window.sessionStorage.getItem(BEAM_PALETTE_SESSION_KEY) ?? '', 10);
      if (Number.isInteger(stored) && stored >= 0 && stored < COLOR_SWATCHES.length) previousPalette = stored;
    } catch {
      // Storage can be disabled; the randomized theme still works for this load.
    }
  }

  const previousHue = previousPalette < 0
    ? null
    : rgbToHsv(hexToRgb(COLOR_SWATCHES[previousPalette] ?? COLOR_SWATCHES[0] ?? '#5bc2e5'))[0];
  const contrastingPalettes = COLOR_SWATCHES
    .map((swatch, index) => ({ index, hue: rgbToHsv(hexToRgb(swatch))[0] }))
    .filter(({ index, hue }) => {
      if (previousHue === null) return true;
      const distance = Math.abs(hue - previousHue);
      return Math.min(distance, 360 - distance) >= 32;
    });
  const paletteIndex = contrastingPalettes[Math.floor(choose() * contrastingPalettes.length)]?.index ?? 0;

  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.setItem(BEAM_PALETTE_SESSION_KEY, String(paletteIndex));
    } catch {
      // The palette still changes for this load when session storage is unavailable.
    }
  }

  // The page's visual rhythm stays fixed while each refresh shifts between Trooper blue,
  // cyan, and mint. The brightest core remains white; green stays a softer supporting color.
  return createBeamTheme(BEAM_SHAPE_SEED, paletteIndex);
}

const DEFAULT_BEAM_THEME = createPageBeamTheme();

function compileShader(gl: WebGL2RenderingContext, kind: number, source: string) {
  const shader = gl.createShader(kind);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, openBotVertexShader);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, openBotFragmentShader);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
  gl.deleteProgram(program);
  return null;
}

export default function OpenBotBeam({
  surfaceSelector,
  sourceSelector,
}: {
  surfaceSelector: string;
  sourceSelector?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = host?.querySelector('canvas');
    const surface = document.querySelector<HTMLElement>(surfaceSelector);
    const fallbackSurface = surface?.closest<HTMLElement>('.trooper-hero')
      ?? document.querySelector<HTMLElement>('.trooper-hero');
    const sourceElements = sourceSelector
      ? Array.from(document.querySelectorAll<HTMLElement>(sourceSelector))
      : [];
    if (!host || !canvas || (!surface && !fallbackSurface)) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      failIfMajorPerformanceCaveat: true,
    });
    if (!gl) return;

    const program = createProgram(gl);
    if (!program) return;
    const uniforms = Object.fromEntries([
      'uResolution', 'uDpr', 'uScale', 'uTime', 'uBeamX', 'uSource', 'uWrap', 'uFall', 'uSurface', 'uRadius',
      'uIntro', 'uPour', 'uRun', 'uLens', 'uAtmosphere', 'uAmount', 'uShape', 'uExtra', 'uSmoke', 'uSmokeDrift',
    ].map((name) => [name, gl.getUniformLocation(program, name)])) as Record<string, WebGLUniformLocation | null>;
    const tintUniform = gl.getUniformLocation(program, 'uTint[0]');
    const vertexArray = gl.createVertexArray();
    const buffer = gl.createBuffer();
    if (!vertexArray || !buffer) return;
    gl.bindVertexArray(vertexArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    const settings = DEFAULT_BEAM_THEME.settings;
    const pointer = { x: 0, y: 0, clientX: 0, clientY: 0, hasPosition: false, inside: false };
    const lens = { x: 0, y: 0, vx: 0, vy: 0, strength: 0 };
    const sourceColor = Array.from(DEFAULT_BEAM_THEME.tint.slice(0, 3), (value) => Math.round(value * 255)).join(', ');
    fallbackSurface?.style.setProperty('--landing-beam-accent', `rgb(${sourceColor})`);
    let width = 1;
    let height = 1;
    let dpr = 1;
    let ratio = 1;
    let introTime = REDUCED_MOTION ? 7.6 : 0;
    let time = 0;
    let frameId = 0;
    let lastFrame = 0;
    let isVisible = true;
    let disposed = false;
    let isScrolling = false;
    let scrollIdleTimer: number | null = null;
    let geometryDirty = true;
    let activeSource: HTMLElement | null = null;
    let isSourceStruck = false;
    let sceneGeometry = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      radius: 0,
      scale: 1,
      beamX: 0,
      sourceBox: [0, 0, 0, 0] as [number, number, number, number],
      sourceRadius: 0,
      hasSource: false,
    };
    const scheduleFrame = (duringScroll = false) => {
      if (!frameId && !disposed && isVisible && !document.hidden && (!isScrolling || duringScroll)) {
        frameId = requestAnimationFrame(render);
      }
    };

    const measureScene = () => {
      const beamRect = host.getBoundingClientRect();
      const primarySurfaceRect = surface?.getBoundingClientRect();
      const activeSurface = surface && primarySurfaceRect && primarySurfaceRect.width > 0 && primarySurfaceRect.height > 0
        ? surface
        : fallbackSurface;
      if (!activeSurface) return false;

      const surfaceRect = activeSurface.getBoundingClientRect();
      const css = getComputedStyle(activeSurface);
      const radius = Math.min(
        Number.parseFloat(css.borderTopLeftRadius) || 0,
        surfaceRect.width / 2,
        surfaceRect.height / 2,
      );
      const left = surfaceRect.left - beamRect.left;
      const top = surfaceRect.top - beamRect.top;
      const right = surfaceRect.right - beamRect.left;
      const bottom = surfaceRect.bottom - beamRect.top;
      const scale = clamp(Math.min(width / 585, height / 507), 0.2, 1.25);
      const frameBeamX = width * 0.78;
      let beamX = frameBeamX;
      let sourceBox: [number, number, number, number] = [0, 0, 0, 0];
      let sourceRadius = 0;
      let hasSource = false;
      const source = sourceElements.find((candidate) => {
        const rect = candidate.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }) ?? null;

      if (activeSource !== source) {
        activeSource?.removeAttribute('data-beam-source');
        activeSource?.removeAttribute('data-beam-struck');
        activeSource?.style.removeProperty('--landing-beam-rim');
        activeSource = source;
        isSourceStruck = false;
      }
      if (source) {
        const sourceRect = source.getBoundingClientRect();
        if (sourceRect.width > 0 && sourceRect.height > 0) {
          const sourceX = (sourceRect.left + sourceRect.right) / 2 - beamRect.left;
          const sourceY = sourceRect.top - beamRect.top;
          if (sourceX >= left + radius + 6 && sourceX <= right - radius - 6) {
            beamX = sourceX;
            sourceBox = [sourceRect.left - beamRect.left, sourceY, sourceRect.right - beamRect.left, sourceRect.bottom - beamRect.top];
            sourceRadius = Math.min(Number.parseFloat(getComputedStyle(source).borderTopLeftRadius) || 0, sourceRect.width / 2, sourceRect.height / 2);
            hasSource = true;
          }
        }
      }

      host.toggleAttribute('data-source', hasSource);
      if (source && hasSource) {
        if (!source.hasAttribute('data-beam-source')) source.setAttribute('data-beam-source', '');
        if (source.style.getPropertyValue('--landing-beam-rim') !== sourceColor) {
          source.style.setProperty('--landing-beam-rim', sourceColor);
        }
      } else {
        source?.removeAttribute('data-beam-source');
        source?.removeAttribute('data-beam-struck');
        source?.style.removeProperty('--landing-beam-rim');
        isSourceStruck = false;
      }

      sceneGeometry = { left, top, right, bottom, radius, scale, beamX, sourceBox, sourceRadius, hasSource };
      geometryDirty = false;
      return true;
    };

    const updatePointerPosition = () => {
      if (!pointer.hasPosition) return;
      const bounds = host.getBoundingClientRect();
      pointer.x = pointer.clientX - bounds.left;
      pointer.y = pointer.clientY - bounds.top;
      pointer.inside = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= bounds.width && pointer.y <= bounds.height;
    };

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const desiredDpr = Math.min(window.devicePixelRatio || 1, 1);
      const maxDimension = Math.max(width, height) * desiredDpr;
      ratio = maxDimension > 1280 ? 1280 / Math.max(width, height) : desiredDpr;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      dpr = canvas.width / width;
      gl.viewport(0, 0, canvas.width, canvas.height);
      geometryDirty = true;
      scheduleFrame();
    };

    const render = () => {
      frameId = 0;
      if (disposed || !isVisible || document.hidden) return;
      const now = performance.now();
      if (!REDUCED_MOTION && lastFrame && now - lastFrame < FRAME_INTERVAL_MS) {
        scheduleFrame();
        return;
      }
      if (geometryDirty && !measureScene()) return;
      const { left, top, right, bottom, radius, scale, beamX, sourceBox, sourceRadius, hasSource } = sceneGeometry;
      const source = activeSource;

      const reducedMotion = REDUCED_MOTION;
      const surfaceIntroStart = -0.15 * height;
      const surfaceIntroSpan = top - surfaceIntroStart + 0.3 * height;
      const introComplete = introTime >= 7.6;
      const front = introComplete
        ? top + 0.3 * height
        : surfaceIntroStart + surfaceIntroSpan * clamp(introTime / 1.4, 0, 1) ** 1.3;
      const introAge = introTime - 1.4 * (Math.max(0, top - surfaceIntroStart) / surfaceIntroSpan) ** (1 / 1.3);
      const bloom = introComplete ? 1 : introAge <= 0 ? 0 : springEase(introAge);
      const introPulse = introComplete || introAge <= 0 ? 0 : Math.exp(-introAge / 0.35) * (1 - Math.exp(-introAge / 0.05));
      const spreadDistance = settings.spread * 250 * 1.3 + 80;
      const revealTime = introAge;
      const runDistance = introComplete ? 100000 : revealTime <= 0 ? -40 : spreadDistance * (1 - Math.exp(-1.15 * revealTime));
      const runStrength = introComplete || revealTime <= 0 ? 0 : Math.exp(-1.15 * revealTime) * (1 - Math.exp(-revealTime / 0.08));
      const pourAt = (distance: number): [number, number] => {
        if (introComplete) return [1000, 1];
        if (revealTime <= 0) return [-distance, 0];
        const stop = Math.min(distance, spreadDistance * 0.97);
        const frontDistance = -Math.log(1 - stop / spreadDistance) / 1.15;
        const remaining = revealTime - frontDistance;
        const progress = clamp((remaining + 0.15) / 0.8, 0, 1);
        const smoothProgress = progress ** 3 * (progress * (progress * 6 - 15) + 10);
        if (remaining <= 0) return [runDistance - stop, smoothProgress];
        return [Math.min(1.15 * (spreadDistance - stop), 320) * remaining + 240 * remaining * remaining, smoothProgress];
      };
      const [pourLeft, pourLeftStrength] = pourAt((beamX - left) / scale);
      const [pourRight, pourRightStrength] = pourAt((right - beamX) / scale);
      const sourceAge = hasSource
        ? 1.4 * clamp((sourceBox[1] - surfaceIntroStart) / surfaceIntroSpan, 0, 1) ** (1 / 1.3)
        : 0;
      const sourceWrapReveal = introComplete ? 100000 : Math.max(0, introTime - sourceAge) * 420;
      const sourceStruck = Boolean(source && hasSource && (introComplete || introTime >= sourceAge));
      if (source && sourceStruck !== isSourceStruck) {
        if (sourceStruck) source.setAttribute('data-beam-struck', '');
        else source.removeAttribute('data-beam-struck');
        isSourceStruck = sourceStruck;
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(uniforms.uResolution, width, height);
      gl.uniform1f(uniforms.uDpr, dpr);
      gl.uniform1f(uniforms.uScale, scale);
      gl.uniform1f(uniforms.uTime, time);
      gl.uniform1f(uniforms.uBeamX, beamX);
      gl.uniform4f(uniforms.uSource, sourceBox[0], sourceBox[1], sourceBox[2], sourceBox[3]);
      gl.uniform3f(uniforms.uWrap, sourceRadius, sourceWrapReveal, Number(hasSource));
      gl.uniform1f(uniforms.uFall, settings.fall);
      gl.uniform4f(uniforms.uSurface, left, top, right, bottom);
      gl.uniform1f(uniforms.uRadius, radius);
      gl.uniform3f(uniforms.uIntro, front, bloom, introPulse);
      gl.uniform4f(uniforms.uPour, pourLeft, pourRight, pourLeftStrength, pourRightStrength);
      gl.uniform2f(uniforms.uRun, runDistance, runStrength);
      gl.uniform4f(uniforms.uLens, lens.x, lens.y, 95 * scale, lens.strength);
      const atmosphere = introComplete
        ? 1
        : revealTime <= 0
          ? 0.3 * (1 - (1 - clamp(introTime / 1.4, 0, 1)) ** 3)
          : 0.3 + 0.7 * (1 - Math.exp(-1.3 * revealTime));
      gl.uniform1f(uniforms.uAtmosphere, atmosphere);
      gl.uniform4f(uniforms.uAmount, settings.intensity, settings.fog, settings.dust, settings.streaks);
      gl.uniform4f(uniforms.uShape, settings.beamWidth, settings.flare, settings.spread, settings.spill);
      gl.uniform4f(uniforms.uExtra, settings.pulse, settings.dots, 34.34 + settings.seed * 7.31, 11.58 + settings.seed * 3.17);
      gl.uniform4f(uniforms.uSmoke, settings.smokeSize, settings.smokeDetail, settings.smokeEdge, settings.smokeSwirl);
      gl.uniform1f(uniforms.uSmokeDrift, settings.smokeDrift);
      gl.uniform3fv(tintUniform, DEFAULT_BEAM_THEME.tint);
      gl.bindVertexArray(vertexArray);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindVertexArray(null);

      if (!reducedMotion) {
        const delta = lastFrame ? Math.min(0.05, (now - lastFrame) / 1000) : 1 / 24;
        lastFrame = now;
        time += delta * settings.speed;
        introTime = Math.min(7.6, introTime + delta);
        const target = pointer.inside ? 1 : 0;
        const accelerationX = 120 * (pointer.x - lens.x) - 19 * lens.vx;
        const accelerationY = 120 * (pointer.y - lens.y) - 19 * lens.vy;
        lens.vx += accelerationX * delta;
        lens.vy += accelerationY * delta;
        lens.x += lens.vx * delta;
        lens.y += lens.vy * delta;
        lens.strength += (target - lens.strength) * (1 - Math.exp(-delta / (target > lens.strength ? 0.3 : 0.55)));
        const stillMoving = Math.abs(lens.strength - target) > 0.01
          || Math.abs(lens.vx) > 0.01
          || Math.abs(lens.vy) > 0.01;
        if (!isScrolling && (introTime < 7.6 || stillMoving)) scheduleFrame();
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      pointer.hasPosition = true;
      if (isScrolling) return;
      updatePointerPosition();
      if (pointer.inside || lens.strength > 0.01 || Math.abs(lens.vx) > 0.01 || Math.abs(lens.vy) > 0.01) {
        scheduleFrame();
      }
    };
    const onPointerLeave = () => {
      pointer.inside = false;
      if (lens.strength > 0.01) scheduleFrame();
    };
    const onScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        if (frameId) {
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
        lastFrame = 0;
        const introWasActive = introTime < 7.6;
        const clearPointerLens = pointer.inside || lens.strength > 0.01;
        pointer.inside = false;
        pointer.hasPosition = false;
        lens.strength = 0;
        lens.vx = 0;
        lens.vy = 0;
        // Settle the one-shot beam on the first scroll instead of resuming its
        // moving front after scroll idle. A stationary cursor must not wake the
        // lens from coordinates that became stale as the hero moved underneath it.
        introTime = 7.6;
        if (introWasActive || clearPointerLens) scheduleFrame(true);
      }
      if (scrollIdleTimer !== null) window.clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => {
        scrollIdleTimer = null;
        isScrolling = false;
        geometryDirty = true;
        lastFrame = 0;
        scheduleFrame();
      }, 140);
    };
    const onVisibility = () => {
      lastFrame = 0;
      scheduleFrame();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    if (surface) observer.observe(surface);
    if (fallbackSurface && fallbackSurface !== surface) observer.observe(fallbackSurface);
    sourceElements.forEach((source) => observer.observe(source));
    const intersection = new IntersectionObserver(([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      if (isVisible) scheduleFrame();
    });
    intersection.observe(host);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    resize();
    scheduleFrame();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      if (scrollIdleTimer !== null) window.clearTimeout(scrollIdleTimer);
      observer.disconnect();
      intersection.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      sourceElements.forEach((source) => {
        source.removeAttribute('data-beam-source');
        source.removeAttribute('data-beam-struck');
        source.style.removeProperty('--landing-beam-rim');
      });
      fallbackSurface?.style.removeProperty('--landing-beam-accent');
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vertexArray);
      gl.deleteProgram(program);
    };
  }, [surfaceSelector, sourceSelector]);

  return (
    <div ref={hostRef} className="openbot-hero-beam" aria-hidden="true">
      <canvas className="openbot-hero-beam-canvas" />
    </div>
  );
}

function springEase(value: number) {
  const damp = 0.62;
  const frequency = 8 * Math.sqrt(1 - damp * damp);
  return 1 - Math.exp(-4.96 * value) * (Math.cos(frequency * value) + damp * 8 / frequency * Math.sin(frequency * value));
}
