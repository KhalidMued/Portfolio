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
 * 1.5x the horizontal room. Keyed on the CANVAS width rather than the window's:
 * ~327 on a phone, but 625 at `md` and 589 at `xl`, so a 480 cut separates the
 * phone layout cleanly while leaving every larger layout on the tuned 1.8.
 *
 * The phone number is derived, not eyeballed. The model's bounding box, read
 * out of the glTF accessors, is 1.858 x 1.880 x 1.805 — call it 1.88 world
 * units per unit of scale. Camera distance is 7.81 and the fov is 45°, so the
 * visible height is 6.47 units and the visible width is that times the aspect.
 * At `xl` the globe fills 82% of the limiting dimension, and that is the look
 * to match. 2.8 puts phones at 91% / 87% / 81% across 360 / 390 / 430 widths.
 * (An earlier 2.3 came from an over-cautious upper bound for the extent and
 * filled only 67-75%, which read as too small.)
 */
const PHONE_CANVAS_MAX = 480;
const SCALE_PHONE = 2.8;
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