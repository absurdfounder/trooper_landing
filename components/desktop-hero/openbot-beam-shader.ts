export const openBotFragmentShader = String.raw`#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 uResolution;
uniform float uDpr;
uniform float uScale;
uniform float uTime;
uniform float uBeamX;
uniform vec4 uSource;
uniform vec3 uWrap;
uniform float uFall;
uniform vec4 uSurface;
uniform float uRadius;
uniform vec3 uIntro;
uniform vec4 uPour;
uniform vec2 uRun;
uniform vec4 uLens;
uniform float uAtmosphere;
uniform vec4 uAmount;
uniform vec4 uShape;
uniform vec4 uExtra;
uniform vec4 uSmoke;
uniform float uSmokeDrift;
uniform vec3 uTint[16];

#define BEAM uTint[0]
#define LEFT uTint[1]
#define RIGHT uTint[2]
#define CYAN uTint[3]
#define PINK uTint[4]
#define LILAC uTint[5]
#define SKY uTint[6]
#define PURPLE uTint[7]
#define DEEP uTint[8]
#define MIST uTint[9]
#define NAVY uTint[10]
#define WARM uTint[11]
#define EMBER uTint[12]
#define WHITE uTint[13]
#define HAZE uTint[14]
#define LAVENDER uTint[15]

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

// The fog has no fine octaves, so its clouds are soft and have no sharp threads.
float softFbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v / 0.875;
}

// The smoke shape. \`detail\` adds the fine octaves that give threads and wisps; at 0 it is \`softFbm\`.
float smokeFbm(vec2 p, float detail) {
  float v = softFbm(p);
  if (detail < 0.01) return v;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  p = m * m * m * p;
  return (v * 0.875 + detail * (0.0625 * noise(p) + 0.03125 * noise(m * p))) / (0.875 + detail * 0.09375);
}

float sq(float x) {
  return x * x;
}

float roundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

vec3 spill(float e, float fall, float strength, float front, float t, out vec3 glow) {
  glow = vec3(0.0);
  if (strength < 0.0005) return vec3(0.0);
  // uFall stretches the light that runs down the side; the reveal front stays in real pixels.
  float fr = max(fall, 0.0);
  float f = fr / uFall;
  float d = max(e, 0.0);
  float u = d / (6.0 + 0.28 * f);
  // The spill starts softly at the corner, and stays on the edge rather than bulging out.
  float start = smoothstep(-12.0, 18.0, fall);
  // Below the white core, a dimmer coloured glow runs much further down the edge, as on huly.io.
  float fade = max(exp(-sq(max(f - 125.0, 0.0) / 40.0)), 0.14 * smoothstep(60.0, 125.0, f) * exp(-sq(max(f - 170.0, 0.0) / 80.0)));
  // Bright and dim streaks run down the side, so the light visibly moves.
  float streak = 0.55 + 0.9 * noise(vec2(u * 5.0, f / 18.0 - t * 2.4));
  // A beam near the corner gives more than full strength; it must not turn the side into a white wall.
  float bright = pow(min(strength, 1.0), 1.5);
  float soft = sqrt(min(strength, 1.0));
  float warmth = smoothstep(90.0, 130.0, f);
  vec3 coreK = mix(WHITE, WARM, warmth * exp(-d / 9.0));
  // A thin bright line runs down the edge, with coloured light outside it, as on React Bits.
  float core = mix(1.6, 0.8, warmth) * exp(-sq(d / (3.5 + 0.03 * f))) * exp(-sq(max(f - 130.0, 0.0) / 38.0));
  float wall = 3.0 * exp(-sq(d / 1.6)) * exp(-sq(max(f - 100.0, 0.0) / 30.0));
  float bandCenter = 0.7 - 0.3 * smoothstep(30.0, 110.0, f) - 0.3 * smoothstep(110.0, 190.0, f);
  float offset = u - bandCenter;
  float decay = (1.05 - bandCenter) / 1.31;
  float profile = offset < 0.0 ? exp(-sq(offset / 0.3)) : exp(-offset / decay);
  profile *= 1.0 - smoothstep(1.0, 1.4, u);
  vec3 bandA = mix(CYAN, PINK, smoothstep(50.0, 75.0, f));
  bandA = mix(bandA, LILAC, smoothstep(100.0, 125.0, f));
  vec3 bandB = mix(SKY, PURPLE, smoothstep(50.0, 75.0, f));
  vec3 fanK = mix(bandA, bandB, smoothstep(0.06, 0.18, offset));
  fanK = mix(fanK, DEEP, smoothstep(0.22, 0.42, offset));
  vec3 thread = (WHITE * wall + coreK * core) * streak * bright;
  glow += fanK * 2.2 * profile * fade * streak * bright;
  glow += MIST * 0.7 * exp(-max(u - 1.0, 0.0) / 0.9) * smoothstep(0.7, 1.2, u) * fade * soft;
  glow += EMBER * 0.35 * exp(-sq((f - 165.0) / 22.0)) * exp(-d / 25.0) * bright;
  float lag = u * (6.0 + 0.28 * f) * 0.35;
  float reveal = 1.0 - smoothstep(front - 70.0, front + 8.0, fr + lag);
  glow *= start * reveal;
  return thread * start * reveal;
}

vec3 easeLight(vec3 light, float amount) {
  return -log(max(1.0 - amount * (1.0 - exp(-light)), vec3(0.0001)));
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uResolution.y * uDpr - gl_FragCoord.y) / uDpr;
  vec2 p = frag / uScale;
  float t = uTime;
  float bx = uBeamX / uScale;
  float sl = uSurface.x / uScale;
  float sy = uSurface.y / uScale;
  float sr = uSurface.z / uScale;
  float sb = uSurface.w / uScale;
  float radius = uRadius / uScale;
  float dx = p.x - bx;
  float adx = abs(dx);
  float h = sy - p.y;
  float hp = max(h, 0.0);
  float above = smoothstep(-0.5, 0.5, h);
  float side = smoothstep(-24.0, 24.0, dx);
  vec3 sideK = mix(mix(LAVENDER, LEFT, smoothstep(40.0, 140.0, adx)), RIGHT, side);
  float beamWidth = uShape.x;
  float flare = uShape.y;
  float spread = 250.0 * uShape.z;
  float reachL = max(bx - sl, 1.0);
  float reachR = max(sr - bx, 1.0);
  float reach = dx < 0.0 ? reachL : reachR;
  float layerLen = clamp(0.29 * reach, 20.0, 100.0) * sqrt(uShape.z);
  float run = uRun.x;
  float bead = exp(-sq((adx - run + 16.0) / (18.0 + 0.04 * run))) * uRun.y;
  // The far side of the beam does not spill, so its light along the top stops well before the corner.
  float farSide = dx < 0.0 ? step(reachR, reachL) : 1.0 - step(reachR, reachL);
  float reachHere = spread * mix(1.0, 0.7, farSide);
  float bloom = uIntro.y;
  vec2 center = vec2((sl + sr) * 0.5, (sy + sb) * 0.5);
  vec2 halfSize = vec2((sr - sl) * 0.5, (sb - sy) * 0.5);
  float sd = roundBox(p - center, halfSize, radius);
  // Nothing is drawn inside the surface, and the app preview covers most of the hero.
  if (sd * uScale < -0.75) {
    outColor = vec4(0.0);
    return;
  }
  float outline = max(sd, 0.0);
  // The light that runs along the top reaches the high haze later, and its front gets softer with
  // height, so the haze grows as a soft curve and not as a vertical wall.
  float runSoft = 60.0 + 1.5 * outline;
  float runMask = 1.0 - smoothstep(run - runSoft, run + 0.25 * runSoft, adx + 0.5 * outline);
  float flowMask = (1.0 - smoothstep(0.75 * reachHere, 1.1 * reachHere, adx)) * runMask;
  float edgeMask = (1.0 - smoothstep(0.8 * reachHere, 1.25 * reachHere, adx)) * runMask;
  float below = max(p.y - sy - radius, 0.0);
  float hug = smoothstep(-0.5, 0.5, sd) * exp(-sq(below / 14.0));
  float hugWide = smoothstep(-0.5, 0.5, sd) * exp(-sq(below / 40.0));

  vec3 col = vec3(0.0);

  float breathe = 1.0 + uExtra.x * (0.12 * sin(t * 1.5708) + 0.08 * (noise(vec2(t * 0.5, 3.0)) - 0.5));

  float front = uIntro.x / uScale;
  float drop = smoothstep(front + 10.0, front - 110.0, p.y);
  float falling = 1.0 - smoothstep(sy - 24.0, sy, front);
  // A source element sits near the top of the canvas, so the beam is at full strength sooner.
  float sourced = uWrap.z;
  float top = mix(mix(0.3, 0.6, sourced), 1.0, smoothstep(0.0, 0.3 * sy, p.y));
  // A wide beam keeps a thin core: only its glow grows, so the beam does not turn into a white column.
  float beamCore = 24.0 * exp(-adx / (2.0 * min(beamWidth, 1.9)));
  float beamHalo = 1.3 * exp(-adx / (6.0 * min(beamWidth, 2.1))) + 0.3 * exp(-adx / (22.0 * beamWidth));
  vec3 haloK = mix(BEAM, sideK, exp(-hp / 80.0));
  // Beside the surface, the glow fades out below its top edge rather than stopping at a line.
  float fadeBelow = exp(-sq(max(-h, 0.0) / 70.0));
  col += (BEAM * beamCore + haloK * beamHalo) * top * fadeBelow * drop;
  col += sideK * 0.16 * exp(-adx / (45.0 * beamWidth)) * top * fadeBelow * drop;
  if (sourced > 0.5) {
    // The beam falls onto the source element, its light runs around the element's edge, and the
    // beam leaves again from the element's bottom edge.
    vec4 sb4 = uSource / uScale;
    vec2 sc = vec2(sb4.x + sb4.z, sb4.y + sb4.w) * 0.5;
    float sdS = roundBox(p - sc, vec2(sb4.z - sb4.x, sb4.w - sb4.y) * 0.5, uWrap.x / uScale);
    float outS = max(sdS, 0.0);
    float struck = smoothstep(sb4.y - 4.0, sb4.y + 12.0, front);
    float around = 1.0 - smoothstep(uWrap.y / uScale - 24.0, uWrap.y / uScale, adx);
    float near = 0.4 + 0.6 * exp(-adx / 28.0);
    // The canvas has fewer pixels than the screen, so the element draws its own sharp rim. The
    // beam adds only soft light, which starts under the element's edge so that no step shows there.
    float wrapLine = 1.4 * exp(-outS / 3.0) * near;
    float wrapHalo = (exp(-outS / 7.0) + 0.35 * exp(-outS / 22.0)) * 1.1 * near;
    col += (mix(sideK, WHITE, 0.6) * wrapLine + sideK * wrapHalo) * struck * around * breathe * smoothstep(-3.0, -1.0, sdS);
    float mouth = exp(-length(vec2(dx / 2.2, max(p.y - sb4.w, 0.0))) / 9.0) * smoothstep(sb4.w - 3.0, sb4.w + 6.0, p.y);
    col += mix(WHITE, BEAM, 0.3) * mouth * 7.0 * drop;
  }
  // The falling tip stays as narrow as the beam's glow. A wide tip spread sideways under the source.
  float head = exp(-sq((p.y - front) / 24.0)) * falling;
  float headWidth = min(beamWidth, 1.9);
  col += mix(WHITE, BEAM, 0.35) * head * (7.0 * exp(-adx / (2.6 * headWidth)) + 0.3 * exp(-adx / (6.0 * headWidth)));

  float psi = adx * (outline + 1.0);
  float rise = max(hp - 17.9 * flare, 0.0);
  float skirtAmp = 16.6 * (exp(-sq(rise / (11.8 * flare))) + 0.3 * exp(-rise / (60.0 * flare)));
  float skirtSpread = mix(134.0, 155.0, side) * breathe * flare * flare * mix(0.35, 1.0, min(bloom, 1.0)) * max(bloom, 1.0);
  float skirt = skirtAmp * exp(-psi / skirtSpread) * exp(-sq(adx / (max(layerLen, 60.0 * sqrt(uShape.z)) * 1.48))) * hug;
  // The tall light along the top thins out before the corners; only the edge line and the spill turn over them.
  float overTop = smoothstep(sl - 10.0, sl + 90.0, p.x) * (1.0 - smoothstep(sr - 90.0, sr + 10.0, p.x));
  col += sideK * skirt * flowMask * overTop * min(bloom, 1.0);

  float layer = 12.0 * exp(-adx / layerLen) * exp(-outline / (0.19 * layerLen)) * (1.0 + 0.4 * bead);
  col += sideK * layer * hug * flowMask * overTop * min(bloom, 1.0);
  float washMask = smoothstep(sl - 60.0, sl + 6.0, p.x) * (1.0 - smoothstep(sr - 6.0, sr + 45.0, p.x));
  float wash = 1.4 * exp(-adx / 100.0) * exp(-outline / 30.0);
  col += mix(BEAM, sideK, 0.25) * wash * hugWide * washMask * flowMask * overTop * min(bloom, 1.0);
  float highWash = 0.7 * exp(-adx / 140.0) * exp(-outline / 60.0);
  col += mix(BEAM, NAVY, 0.5) * highWash * hugWide * washMask * runMask * overTop * min(bloom, 1.0);

  float sideSign = dx < 0.0 ? 0.0 : 1.0;
  float along = 0.5 * log((hp + 1.0) / (adx + 1.0));
  float lineScale = 6.0;
  float lp = log(max(psi, 1.0) / (120.0 * flare * flare)) * lineScale;
  float lineIndex = floor(lp) + sideSign * 97.0;
  float wobble = 0.22 * (noise(vec2(lineIndex * 3.7, t * 0.4 + along)) - 0.5);
  float lf = fract(lp + wobble) - 0.5;
  float gradient = lineScale * length(vec2(hp + 1.0, adx)) / max(psi, 1.0) / uScale;
  float halfWidth = max(0.35 * gradient, 0.0001);
  float drawWidth = max(halfWidth, 0.6 * gradient);
  float lineShape = exp(-lf * lf / (drawWidth * drawWidth)) * (halfWidth / drawWidth);
  float lineOn = step(0.3, hash(vec2(lineIndex, 1.3)));
  float lineFlow = smoothstep(0.25, 0.85, noise(vec2(lineIndex * 5.3 + 2.0, along * 3.0 + t * 1.1)));
  float flareArea = 120.0 * flare * flare;
  float lineEnvelope = smoothstep(0.85 * flareArea, 1.4 * flareArea, psi) * (1.0 - smoothstep(3.2 * flareArea, 7.5 * flareArea, psi));
  lineEnvelope *= exp(-adx / (layerLen * 1.5)) * hug * flowMask * overTop * (1.0 - smoothstep(35.0 * flare, 80.0 * flare, hp));
  float lineBright = mix(0.35, 1.0, hash(vec2(lineIndex, 4.0)));
  col += mix(sideK, WHITE, 0.6) * lineShape * lineOn * lineFlow * lineEnvelope * lineBright * 2.6 * uAmount.w * min(bloom, 1.0);

  float edgeGlow = 22.8 * exp(-sq(adx / (0.6 * reachHere))) * edgeMask * (1.0 + 0.9 * bead);
  // The line turns over the corner and fades out down the side, so it does not stop at a step.
  float onTop = exp(-sq(max(p.y - sy - radius, 0.0) / 50.0));
  float edgeLine = (0.5 * exp(-sq(max(sd, 0.0) / 3.0)) + 0.25 * exp(-max(sd, 0.0) / 10.0)) * edgeGlow * onTop;
  col += mix(sideK, WHITE, 0.6) * edgeLine * min(bloom, 1.0);

  float pour = uShape.w;
  float baseline = exp(-sq(130.0 / 150.0));
  float strengthR = exp(-sq(reachR / (150.0 * uShape.z))) * (1.0 - smoothstep(0.8 * spread, 1.25 * spread, reachR)) / baseline * pour;
  float strengthL = exp(-sq(reachL / (150.0 * uShape.z))) * (1.0 - smoothstep(0.8 * spread, 1.25 * spread, reachL)) / baseline * pour;
  // Only the side nearer the beam spills, as on huly.io.
  strengthR *= step(reachR, reachL);
  strengthL *= 1.0 - step(reachR, reachL);
  float fallY = p.y - sy - 0.3 * radius;
  float rightHalf = smoothstep(center.x - 4.0, center.x + 4.0, p.x);
  float haloR = exp(-length(p - vec2(sr - 0.3 * radius, sy + 0.3 * radius)) / 40.0) * sqrt(strengthR);
  float haloL = exp(-length(p - vec2(sl + 0.3 * radius, sy + 0.3 * radius)) / 40.0) * sqrt(strengthL);
  vec3 glowR;
  vec3 glowL;
  // The spill also touches the top edge, so it waits there until the light along the top has run past.
  // It fades out slowly down the side, and is gone well before the bottom edge.
  float spillMask = runMask * exp(-sq(max(fallY - 0.05 * (sb - sy), 0.0) / (0.28 * (sb - sy))));
  col += spill(sd, fallY, strengthR, uPour.y, t, glowR) * rightHalf * spillMask;
  col += spill(sd, fallY, strengthL, uPour.x, t, glowL) * (1.0 - rightHalf) * spillMask;
  col += easeLight((glowR * rightHalf + NAVY * 0.9 * haloR) * spillMask, uPour.w);
  col += easeLight((glowL * (1.0 - rightHalf) + NAVY * 0.9 * haloL) * spillMask, uPour.z);

  vec2 toLens = frag - uLens.xy;
  float lens = exp(-dot(toLens, toLens) / sq(uLens.z)) * uLens.w;
  col *= 1.0 + 0.35 * lens * hug;
  float fogAmount = uAmount.y * uAtmosphere;
  float near = exp(-adx / 150.0);
  float envelope = near * (0.3 + 0.4 * exp(-hp / 50.0) + 1.2 * exp(-p.y / 120.0));
  if (fogAmount > 0.001 && h > -160.0 && envelope * max(0.25, 6.0 * exp(-adx / 50.0)) > 0.002) {
    // Each visit has its own smoke: puff size, fine detail, edge sharpness, swirl and drift speed.
    float ft = t * uSmokeDrift;
    vec2 fq = vec2(dx / 1.7, h) / (120.0 * uSmoke.x) + vec2(ft * 0.012, -ft * 0.03) + uExtra.zw;
    vec2 fw = vec2(softFbm(fq + vec2(1.7, 9.2) + ft * 0.03), softFbm(fq + vec2(8.3, 2.8) - ft * 0.025));
    float cloud = smokeFbm(fq + uSmoke.w * fw, uSmoke.y);
    float density = smoothstep(mix(0.4, 0.52, uSmoke.z), mix(0.95, 0.66, uSmoke.z), cloud);
    float lit = exp(-adx / 50.0);
    float fogMask = fadeBelow;
    float reached = smoothstep(front + 80.0, front - 40.0, p.y);
    vec3 fog = (HAZE * 0.45 + BEAM * 6.0 * lit * reached) * density * envelope * fogMask;
    float surfaceLit = exp(-adx / (layerLen * 1.3)) * exp(-outline / 28.0) * hugWide * flowMask * washMask * min(bloom, 1.0);
    fog += sideK * 2.2 * surfaceLit * (smoothstep(0.3, 0.85, cloud) - 0.35) * fogMask;
    float smoke = smoothstep(0.2, 0.9, cloud);
    fog += BEAM * 0.35 * exp(-adx / (22.0 * beamWidth)) * (0.35 + 0.9 * smoke) * fogMask * top * drop;
    col += fog * fogAmount * (1.0 + 1.2 * lens);
  }

  float haze = col.b;
  float dotGrid = 1.0 - smoothstep(0.16, 0.32, length(fract(frag / 3.0) - 0.5));
  col += BEAM * dotGrid * clamp(haze, 0.0, 1.5) * (1.0 - smoothstep(1.5, 4.0, haze)) * (0.18 + 0.3 * lens) * uExtra.y;
  if (lens > 0.002) {
    vec2 drift = frag - vec2(0.0, t * 14.0);
    vec2 sparkCell = floor(drift / 7.0);
    vec2 sparkPos = (sparkCell + 0.2 + 0.6 * vec2(hash(sparkCell + 5.1), hash(sparkCell + 2.3))) * 7.0;
    float sparkDist = length(drift - sparkPos);
    float sparkOn = step(0.8, hash(sparkCell + 8.8));
    float sparkTwinkle = 0.5 + 0.5 * sin(t * 5.0 + hash(sparkCell + 3.7) * 6.283);
    col += WHITE * exp(-sparkDist * sparkDist / 0.35) * sparkOn * sparkTwinkle * lens * clamp(haze * 1.5, 0.0, 1.0) * 1.6 * uAmount.z;
  }

  float dustAmount = uAmount.z;
  if (dustAmount > 0.001) {
    float dustLp = log(max(psi, 1.0) / (120.0 * flare * flare)) * 2.2;
    vec2 flowCell = vec2(dustLp / 1.1, (along + t * 0.22) / 0.06);
    vec2 cellId = floor(flowCell) + vec2(sideSign * 131.0, 0.0);
    vec2 cellJitter = vec2(hash(cellId + 1.7), hash(cellId + 8.3));
    vec2 particleFlow = (floor(flowCell) + 0.1 + cellJitter * 0.8) * vec2(1.1, 0.06);
    float particlePsi = 120.0 * flare * flare * exp(particleFlow.x / 2.2);
    float particleAlong = particleFlow.y - t * 0.22;
    float particleX = sqrt(particlePsi * exp(-2.0 * particleAlong)) - 1.0;
    float particleH = sqrt(particlePsi * exp(2.0 * particleAlong)) - 1.0;
    float particleDist = length(vec2(adx - particleX, hp - particleH)) * uScale;
    float particleOn = step(0.62, hash(cellId + 3.1));
    float particleTwinkle = 0.5 + 0.5 * sin(t * 5.0 + hash(cellId + 9.2) * 6.283);
    float dustZone = exp(-sq(log(max(psi, 1.0) / (200.0 * flare * flare)) / 0.55)) * hug * flowMask * smoothstep(0.0, 6.0, outline);
    col += WHITE * exp(-particleDist * particleDist / 0.3) * particleOn * particleTwinkle * dustZone * 3.0 * dustAmount * min(bloom, 1.0);

    vec2 glitterCell = vec2(dx / 3.0, (p.y - t * 26.0) / 9.0);
    vec2 glitterId = floor(glitterCell);
    vec2 glitterJitter = vec2(hash(glitterId + 4.4), hash(glitterId + 2.9));
    vec2 glitterPos = (glitterId + 0.15 + glitterJitter * 0.7) * vec2(3.0, 9.0);
    float glitterDist = length(vec2(dx, p.y - t * 26.0) - glitterPos) * uScale;
    float glitterOn = step(0.7, hash(glitterId + 6.6));
    float glitterTwinkle = 0.5 + 0.5 * sin(t * 6.0 + hash(glitterId + 1.1) * 6.283);
    float glitterZone = exp(-adx / (5.0 * beamWidth)) * smoothstep(1.5, 4.0, adx / beamWidth) * above * smoothstep(25.0, 70.0, hp) * top * drop;
    col += WHITE * exp(-glitterDist * glitterDist / 0.25) * glitterOn * glitterTwinkle * glitterZone * 2.2 * dustAmount * uAtmosphere;
  }

  col *= uAmount.x * (1.0 + uIntro.z * 0.9 * exp(-length(vec2(dx, h * 1.6)) / 70.0));
  col *= smoothstep(-0.75, 0.25, sd * uScale);

  vec3 emit = 1.0 - exp(-col);
  // The dark haze changes slowly, so 8-bit output shows each step as a stripe. Pixel noise of about
  // one step hides the stripes. Empty pixels get no noise.
  float dither = (hash(gl_FragCoord.xy) + hash(gl_FragCoord.xy + 17.31) - 1.0) / 255.0;
  emit = clamp(emit + dither * clamp(max(emit.r, max(emit.g, emit.b)) * 255.0, 0.0, 1.0), 0.0, 1.0);
  outColor = vec4(emit, max(emit.r, max(emit.g, emit.b)));
}`;

export const openBotVertexShader = String.raw`#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;
