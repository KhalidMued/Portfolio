import { motion } from 'framer-motion';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { stats } from '../constants';
import { CATEGORY } from '../constants/categories';
import { fadeIn, textVariant } from "../utils/motion";

const StatCard = ({ index, value, label, category }) => {
  const color = CATEGORY[category].color;
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.6)}
      className="bg-tertiary surface-elevate rounded-2xl p-6 flex-1 min-w-[200px] text-center"
    >
      <p className="text-[34px] font-black" style={{ color }}>{value}</p>
      <p className="mt-2 text-secondary text-[13px] leading-[20px]">{label}</p>
    </motion.div>
  );
};

const Highlights = () => (
  <div className="mt-12 bg-black-100 rounded-[20px]">
    <div className={`${styles.padding} bg-tertiary surface-elevate rounded-2xl`}>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Numbers, Not Adjectives</p>
        <h2 className={styles.sectionHeadText}>By the Numbers.</h2>
      </motion.div>

      <div className="mt-10 flex flex-wrap gap-5">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} index={index} {...stat} />
        ))}
      </div>
    </div>
  </div>
);

export default SectionWrapper(Highlights, "");
