import { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles'
import { ComputersCanvas } from './canvas';
import { heroContent } from '../constants';

const Hero = () => {
  const [rotatingIndex, setRotatingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingIndex((i) => (i + 1) % heroContent.rotating.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} relative z-10 pt-[90px] sm:pt-[100px]
      max-w-4xl mx-auto flex flex-col items-center text-center`}>
        <h1 className={styles.heroHeadText}>
          Hi, I&apos;m <span className="text-[#915eff]">{heroContent.name.split(' ')[0]}</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2">
          <span className="text-[#915eff] font-bold lg:text-[28px] sm:text-[24px] xs:text-[20px] text-[18px]">
            {heroContent.roles[0]}
          </span>
          <span className="text-[#00cea8] font-bold lg:text-[28px] sm:text-[24px] xs:text-[20px] text-[18px]">
            {heroContent.roles[1]}
          </span>
        </div>

        <p className={`${styles.heroSubText} mt-3 text-hero-subtext`}>
          {heroContent.tagline}
        </p>

        <div className="mt-3 h-[22px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={rotatingIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="text-secondary italic text-[13px] sm:text-[14px]"
            >
              {heroContent.rotating[rotatingIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* The main event: full-bleed and centered, unobstructed now that the
          text above is short and top-aligned instead of sharing this space. */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full" />}>
          <ComputersCanvas />
        </Suspense>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
            animate={{
              y: [0, 24, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop'
            }}
            className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
    )
}

export default Hero
