import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

import { useTheme } from '../../context/ThemeContext';

const Stars = ({ theme, ...props }) => {
  const ref= useRef();
  const isLight = theme === 'light';

  const sphere = random.inSphere(new Float32Array (5000), { radius: 1.2 })

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 40;
    ref.current.rotation.y -= delta / 60;

  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        {/* Light mode needs bigger, deeper dots: a bright dot on a dark
            field reads as a glowing point, but the same dot on a near-white
            page averages away to nothing. Dark mode is tuned and stays put. */}
        <PointMaterial
        transparent
        color={isLight ? '#6d28d9' : '#f272c8'}
        size={isLight ? 0.0035 : 0.002}
        opacity={isLight ? 0.9 : 1}
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