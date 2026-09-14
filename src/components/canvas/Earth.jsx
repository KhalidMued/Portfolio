import { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import CanvasLoader from '../Loader';

/*
 * How much of the canvas the globe fills depends on the canvas's shape, not the
 * page's — the camera shows a fixed 45° of vertical angle, so the horizontal
 * extent is that times the aspect ratio. The desktop `xl` column is narrow and
 * tall (589x927), which leaves the least horizontal room of any layout and is
 * what 1.8 was tuned against after 2.5 clipped there.
 *
 * The phone layout is the opposite shape: ~327x350, nearly square, with about
 * 1.5x the horizontal room. 1.8 there leaves a visible ring of dead space, so
 * phones get a larger scale. Keyed on the CANVAS width rather than the window:
 * ~327 on a phone, but 625 at `md` and 589 at `xl`, so a 480 cut separates the
 * phone layout cleanly while leaving every larger layout on the tuned 1.8.
 */
const PHONE_CANVAS_MAX = 480;
const SCALE_PHONE = 2.3;
const SCALE_DEFAULT = 1.8;

const Earth = () => {
  const earth = useGLTF('./planet/scene.gltf')
  const canvasWidth = useThree((state) => state.size.width)
  const scale = canvasWidth < PHONE_CANVAS_MAX ? SCALE_PHONE : SCALE_DEFAULT

  return (
    <primitive
    object={earth.scene}
    scale={scale}
    position-y={0}
    rotation-y={0}
    />
  )
}

const EarthCanvas = () => {
  return(
    <Canvas
    shadows
    frameloop='demand'
    gl={{ preserveDrawingBuffer: true}} 
    camera={{
      fov:45,
      near: 0.1,
      far: 200,
      position:[-4, 3, 6]
     }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          mixPolarAngle={Math.PI / 2}
        />
        <Earth/>
      </Suspense>
    </Canvas>
  )
}

export default EarthCanvas;