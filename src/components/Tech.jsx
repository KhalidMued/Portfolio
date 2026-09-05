import { Suspense } from "react";
import {  BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";


const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
      <div className="w-28 h-28" key={technology.name}>
        {/* The w-28 h-28 wrapper is already fixed-size, so the fallback can't
            cause layout shift either way — just a soft placeholder while the
            (shared, cached after the first one) 3D chunk loads. */}
        <Suspense fallback={<div className="w-full h-full rounded-full bg-tertiary animate-pulse" />}>
          <BallCanvas icon={technology.icon} />
        </Suspense>
      </div>
      ))}
    </div>
  )
}

export default SectionWrapper (Tech, "");