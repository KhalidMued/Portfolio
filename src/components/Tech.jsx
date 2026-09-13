import { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { technologyGroups } from "../constants";
import { CATEGORY } from "../constants/categories";
import { textVariant } from "../utils/motion";

const TechBadge = ({ name, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", duration: 0.5 }}
    className="flex items-center gap-2 bg-tertiary surface-elevate rounded-full pl-3 pr-4 py-2"
  >
    <span
      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      style={{ backgroundColor: `${color}1a` }}
    >
      <Icon style={{ color }} className="w-4 h-4" />
    </span>
    <span className="text-heading text-[13px] font-medium whitespace-nowrap">{name}</span>
  </motion.div>
);

const Tech = () => {
  const [active, setActive] = useState(technologyGroups[0].key);
  const activeGroup = technologyGroups.find((g) => g.key === active);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Two Sides, One Toolbox</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <div className="mt-8 flex flex-wrap gap-3">
        {technologyGroups.map((group) => {
          const color = CATEGORY[group.category].color;
          const isActive = active === group.key;
          return (
            <button
              key={group.key}
              type="button"
              onClick={() => setActive(group.key)}
              className={`px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all duration-200 border`}
              style={
                isActive
                  ? { backgroundColor: color, borderColor: color, color: "#050816" }
                  : { backgroundColor: "transparent", borderColor: `${color}55`, color }
              }
            >
              {group.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeGroup.key}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-8 flex flex-row flex-wrap gap-4"
      >
        {activeGroup.items.map((tech) => (
          <TechBadge key={tech.name} {...tech} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
