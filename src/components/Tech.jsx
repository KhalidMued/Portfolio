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
    /* h-full so every badge fills its grid cell: the row's tallest item sets
       the height and the rest match it, which is what makes the grid read as
       ordered rather than as pills of assorted sizes. */
    className="h-full flex items-center gap-2 sm:gap-2.5 bg-tertiary surface-elevate rounded-xl px-2.5 sm:px-3 py-2.5"
  >
    <span
      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0"
      style={{ backgroundColor: `${color}1a` }}
    >
      <Icon style={{ color }} className="w-4 h-4" />
    </span>
    {/* Deliberately NOT whitespace-nowrap. In a fixed-width grid cell, names
        like "Barracuda SecureEdge / ZTNA" have to wrap; nowrap would push them
        out of the cell instead. */}
    {/* flex-1 + min-w-0 so the label gets the whole remaining cell width to
        wrap into. Without them the span sizes to its content and a long name
        wraps earlier and taller than it needs to. */}
    {/* break-words because a few labels contain a single word wider than the
        phone-width column ("Troubleshooting"), which would otherwise spill out
        of the cell rather than wrap. */}
    <span className="flex-1 min-w-0 break-words text-heading text-[12.5px] sm:text-[13px] font-medium leading-snug">
      {name}
    </span>
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

      {/* Two even columns on phones so the four tabs land 2 + 2 instead of
          wrapping into a ragged 2 + 1 + 1; a centred single row once there's
          width for it. `w-full` on the buttons makes both columns the same
          width regardless of label length. */}
      <div className="mt-8 grid grid-cols-2 gap-3 justify-items-stretch sm:flex sm:flex-wrap sm:justify-center">
        {technologyGroups.map((group) => {
          const color = CATEGORY[group.category].color;
          const isActive = active === group.key;
          return (
            <button
              key={group.key}
              type="button"
              onClick={() => setActive(group.key)}
              className={`w-full sm:w-auto px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all duration-200 border`}
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
        /* A grid, not flex-wrap. Wrapping pills of wildly different widths
           ("C" next to "Barracuda SecureEdge / ZTNA") leaves a ragged right
           edge and uneven rows; fixed columns line everything up. */
        className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {activeGroup.items.map((tech) => (
          <TechBadge key={tech.name} {...tech} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
