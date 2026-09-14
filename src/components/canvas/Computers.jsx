import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
/*
 * The camera is fixed at 25° of vertical view, so how much of the desk fits
 * across the frame is decided entirely by the hero's aspect ratio — and the
 * hero is a very different shape on a phone. Measured: desktop is ~1.41 wide,
 * a phone ~0.44, which works out to 12.99 world units of horizontal room
 * against 4.10. A phone has under a third of the width while the model was
 * drawn at exactly the same size, which is what made it read as oversized.
 *
 * Scaling strictly in proportion would mean ~0.24 and a speck of a desk — the
 * hero wants it large and slightly overflowing, as a backdrop. 0.6 is a
 * measured step down rather than a proportional one.
 *
 * NB: this ternary used to read `isMobile ? 0.75 : 0.75` — the branch existed
 * but had never been given its own value.
 */
const SCALE_PHONE = 0.6;
const SCALE_DEFAULT = 0.75;

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')


  return(
    <mesh>
      <hemisphereLight intensity={0.15} groundColor={"black"} />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50 ,10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? SCALE_PHONE : SCALE_DEFAULT}
        position={isMobile ? [0, -3 ,-2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}
//For Desktop img movement
const ComputerCanvas = () => {
  //For Desktop to be responsive on Mobile DEvices by using Query
  const[isMobile, setIsMobile] = useState(false);

  useEffect(() => { 
    const mediaQuery = window.matchMedia('(max-width: 500px)')

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change',handleMediaQueryChange);

    return() => {
      mediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
    }, [])
  return(
<Canvas
  frameloop="demand"
  shadows
  camera={{ position: [20, 3, 5], fov: 25 }}
  gl={{ preserveDrawingBuffer: true }}
  >
    <Suspense fallback={<CanvasLoader/>}>
    <OrbitControls 
    enableZoom={false}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
    />
    <Computers isMobile={isMobile}/>
    </Suspense>
    <Preload all />
</Canvas>


  )
}

export default ComputerCanvas;
