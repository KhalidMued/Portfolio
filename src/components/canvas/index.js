import { lazy } from "react";

const EarthCanvas = lazy(() => import("./Earth"));
const BallCanvas = lazy(() => import("./Ball"));
const ComputersCanvas = lazy(() => import("./Computers"));
const StarsCanvas = lazy(() => import("./Stars"));

export { EarthCanvas, BallCanvas, ComputersCanvas, StarsCanvas };
