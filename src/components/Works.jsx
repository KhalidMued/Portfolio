import { useState } from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { devProjects, securityProjects } from '../constants';
import { CATEGORY } from '../constants/categories';
import { covers } from './covers/ProjectCovers';
import { fadeIn, textVariant } from '../utils/motion';

const TABS = [
  { key: 'dev', label: '< Developer />', projects: devProjects, color: CATEGORY.dev.color },
  { key: 'security', label: 'Network & Security', projects: securityProjects, color: CATEGORY.security.color },
];

const StatChip = ({ value, label, color }) => (
  <div className="rounded-lg px-3 py-2 text-center" style={{ backgroundColor: `${color}14` }}>
    <p className="text-[16px] font-bold" style={{ color }}>{value}</p>
    <p className="text-secondary text-[10px] uppercase tracking-wide">{label}</p>
  </div>
);

const ProjectCard = ({ index, name, description, tags, cover, stats, category, featured, source_code_Link }) => {
  const Cover = covers[cover];
  const color = CATEGORY[category].color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", delay: index * 0.15, duration: 0.75 }}
      className="w-full"
    >
      <Tilt
        options={{ max: 25, scale: 1, speed: 450 }}
        className="group bg-tertiary surface-elevate p-5 rounded-2xl flex flex-col justify-between sm:flex-row sm:items-center gap-6 min-h-[260px]"
      >
        <div className="relative w-full sm:w-[45%] h-[220px]">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <Cover accent={color} />
          </div>
          {featured && (
            <span
              className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full"
              style={{ backgroundColor: color, color: '#050816' }}
            >
              Featured
            </span>
          )}
          {source_code_Link && (
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
              <button
                type="button"
                onClick={() => window.open(source_code_Link, "_blank", "noopener,noreferrer")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                aria-label={`View source code for ${name}`}
              >
                <img src={github} alt="" className="w-1/2 h-1/2 object-contain" />
              </button>
            </div>
          )}
        </div>

        <div className="sm:w-[55%]">
          <h3 className="text-heading font-bold text-[22px]">{name}</h3>
          <p className="mt-2 text-secondary text-[13px] leading-[22px]">{description}</p>

          {stats && (
            <div className="mt-4 grid grid-cols-3 gap-2 max-w-[320px]">
              {stats.map((s) => (
                <StatChip key={s.label} {...s} color={color} />
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[13px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [activeTab, setActiveTab] = useState('dev');

  const tab = TABS.find((t) => t.key === activeTab);

  return (
   <>
     <motion.div variants={textVariant()}>
    <p className={styles.sectionSubText}> My Work</p>
        <h2 className={styles.sectionHeadText}> Projects. </h2>
    </motion.div>

      <div className="w-full flex">
        <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Two sides of the same engineer — software I&apos;ve built and shipped, and the
          networks and infrastructure I&apos;ve designed, secured, and kept running.
        </motion.p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {TABS.map((t) => {
          const isActive = t.key === activeTab;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key)}
              className="px-5 py-2.5 rounded-full text-[14px] font-semibold border transition-all duration-200"
              style={
                isActive
                  ? { backgroundColor: t.color, borderColor: t.color, color: '#050816' }
                  : { backgroundColor: 'transparent', borderColor: `${t.color}55`, color: t.color }
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-14 flex flex-col gap-10"
      >
        {tab.projects.map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </motion.div>
    </>
  )
}

export default SectionWrapper(Works, "work");
