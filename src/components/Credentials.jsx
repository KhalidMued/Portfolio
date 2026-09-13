import { motion } from 'framer-motion';

import { styles } from '../styles';
import { credentials } from '../constants';
import { CATEGORY } from '../constants/categories';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const CredentialPill = ({ index, title, issuer, meta, icon: Icon, category }) => {
  const color = CATEGORY[category].color;
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.6)}
      className="flex items-center gap-4 bg-tertiary surface-elevate rounded-2xl px-5 py-4 flex-1 min-w-[260px]"
    >
      <span
        className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}1a` }}
      >
        <Icon style={{ color }} className="w-5 h-5" />
      </span>
      <div>
        <p className="text-heading text-[14px] font-bold leading-tight">{title}</p>
        <p className="text-secondary text-[12px] mt-1">{issuer} · {meta}</p>
      </div>
    </motion.div>
  );
};

const Credentials = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Recognition</p>
      <h2 className={styles.sectionHeadText}>Certificates &amp; Achievements.</h2>
    </motion.div>

    <div className="flex flex-wrap gap-4 mt-10">
      {credentials.map((credential, index) => (
        <CredentialPill key={credential.title} index={index} {...credential} />
      ))}
    </div>
  </>
);

export default SectionWrapper(Credentials, "");
