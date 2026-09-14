import { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

import { useTheme } from '../../context/ThemeContext';

/*
 * Light-mode star colours. The CATEGORY accents themselves (#915eff, #00cea8,
 * #f5a623, #ec4899) are tuned for dark surfaces and wash out to nothing on the
 * warm off-white page, so these are deepened versions of the same four, plus a
 * warm ink that plays the role "white" plays in a real starfield: the common
 * case, with the tinted ones sprinkled through it. Weighted so no single hue
 * dominates — an all-violet field was the thing that read as "too purply".
 */
const LIGHT_STAR_PALETTE = [
  { hex: '#2f2a24', weight: 44 }, // warm ink — the plain, untinted majority
  { hex: '#6d28d9', weight: 14 }, // dev violet
  { hex: '#0d9488', weight: 14 }, // security teal
  { hex: '#b45309', weight: 14 }, // infra amber
  { hex: '#be185d', weight: 14 }, // ai pink
];

const PAGE_BG_LIGHT = '#f7f5f1';

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/*
 * Mix toward the page colour in sRGB, not via THREE.Color.lerp. THREE.Color
 * holds linear-light values once colour management converts the hex, and
 * lerping there against a near-white background collapses almost immediately —
 * a 50% linear mix is already visually ~75% of the way to white. Mixing the
 * gamma-encoded bytes keeps `fade` meaning what it looks like it means.
 */
const mixTowards = (hex, bgRgb, t) => {
  const rgb = hexToRgb(hex);
  const mixed = rgb.map((c, i) => Math.round(c + (bgRgb[i] - c) * t));
  return `#${mixed.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
};

/*
 * Per-point colours for light mode. Real starfields read as depth because most
 * stars are faint and only a few are crisp — dark mode gets that for free from
 * sub-pixel coverage against a dark field, but on a near-white page every dot
 * lands at roughly the same weight and the whole thing reads as evenly-spaced
 * confetti. So each point is mixed toward the page colour by a random amount,
 * skewed heavily toward "faint". That's also what keeps it from looking busy:
 * the dots can stay small because the few crisp ones carry the effect.
 */
const buildLightStarColors = (length) => {
  const colors = new Float32Array(length);
  const color = new THREE.Color();
  const totalWeight = LIGHT_STAR_PALETTE.reduce((sum, s) => sum + s.weight, 0);
  const bg = hexToRgb(PAGE_BG_LIGHT);

  for (let i = 0; i + 2 < length; i += 3) {
    let roll = Math.random() * totalWeight;
    let picked = LIGHT_STAR_PALETTE[0];
    for (const swatch of LIGHT_STAR_PALETTE) {
      roll -= swatch.weight;
      if (roll <= 0) {
        picked = swatch;
        break;
      }
    }
    // Bimodal rather than a smooth ramp: a minority of crisp "near" stars
    // carry the effect, and the faint majority sit behind them as texture.
    // That's what makes it read as depth instead of evenly-spaced confetti —
    // and it's why the field can look calmer than the old flat violet one
    // while actually being more visible.
    const fade = Math.random() < 0.4
      ? Math.random() * 0.12
      : 0.35 + Math.random() * 0.3;
    color.set(mixTowards(picked.hex, bg, fade));
    color.toArray(colors, i);
  }

  return colors;
};

const Stars = ({ theme, ...props }) => {
  const ref= useRef();
  const isLight = theme === 'light';

  // Memoised so the field doesn't re-randomise (and the colours don't come
  // unpaired from the positions) every time this re-renders — a theme toggle
  // used to visibly reshuffle every star.
  const sphere = useMemo(
    () => random.inSphere(new Float32Array (5000), { radius: 1.2 }),
    []
  );
  const colors = useMemo(() => buildLightStarColors(sphere.length), [sphere]);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 40;
    ref.current.rotation.y -= delta / 60;

  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} colors={colors} stride={3} frustumCulled {...props}>
        {/* Dark mode is deliberately untouched: one flat pink, size 0.002. It
            works because a bright dot on a dark field reads as a glowing point.
            Light mode can't borrow those numbers — the same dot on a near-white
            page averages away — so it uses per-point colour instead of a bigger
            dot, which keeps the delicacy while making the field visible.
            `key` forces a fresh material on theme change: `vertexColors` is a
            shader-define, and flipping it on a live material needs a recompile. */}
        <PointMaterial
        key={isLight ? 'light' : 'dark'}
        transparent
        vertexColors={isLight}
        color={isLight ? '#ffffff' : '#f272c8'}
        size={isLight ? 0.0035 : 0.002}
        sizeAttenuation={true}
        depthWrite={false}
        />
      </Points>
    </group>
    )
}

const StarsCanvas = () => {
  const { theme } = useTheme();

  return(
    <div className="w-full h-auto fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1]}}>
        <Suspense fallback={null}>
        <Stars theme={theme} />
        </Suspense>

        <Preload all/>
      </Canvas>
    </div>
  )

}
export default StarsCanvas
