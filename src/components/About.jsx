import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services, aboutParagraphs, aboutHighlight } from '../constants';
import { CATEGORY } from '../constants/categories';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, subtitle, description, icon: Icon, category }) => {
  const color = CATEGORY[category].color;
  return(
    <Tilt className="xs:w-[280px] w-full">
      <motion.div
      variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
      className="w-full p-[1px] rounded-[20px] shadow-card"
      style={{ background: `linear-gradient(135deg, ${color}, transparent 65%)` }}
      >
      <div
      className="bg-tertiary surface-elevate rounded-[20px] py-6 px-6 h-[300px] flex flex-col gap-3"
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}1a` }}
        >
          <Icon style={{ color }} className="w-6 h-6" />
        </div>
        <h3 className="text-heading text-[18px] font-bold leading-tight">{title}</h3>
        <p className="text-[12px] font-semibold tracking-wide" style={{ color }}>{subtitle}</p>
        <p className="text-secondary text-[13px] leading-[22px] line-clamp-6">{description}</p>
      </div>
      </motion.div>
    </Tilt>
  )
}

const SideColumn = ({ title, points, color }) => (
  <div
    className="glass-card h-full rounded-2xl p-6"
    style={{ boxShadow: `0 8px 32px ${color}26, inset 0 1px 0 rgba(255,255,255,0.15)`, borderColor: `${color}4d` }}
  >
    <p className="font-bold text-[18px]" style={{ color }}>{title}</p>
    <ul className="mt-3 space-y-2">
      {points.map((point) => (
        <li key={point} className="text-secondary text-[14px] flex items-start gap-2">
          <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
          {point}
        </li>
      ))}
    </ul>
  </div>
);

const About = () => {
  return (
      <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}
        > Introduction </p>
        <h2 className={styles.sectionHeadText}
        > Overview. </h2>
      </motion.div>

      <div className="mt-4 max-w-3xl space-y-4">
        {aboutParagraphs.map((paragraph, i) => (
          <motion.p
          key={i}
          variants={fadeIn("", "", 0.1 + i * 0.05, 1)}
          className="text-secondary text-[17px] leading-[30px]"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.75)}
        className="mt-10 max-w-3xl mx-auto text-center"
      >
        <p className={`${styles.sectionSubText} mb-6`}>{aboutHighlight.eyebrow}</p>

        <div className="relative">
          {/* Playful color pops behind the glass cards — also the reason the
              cards read as glass at all, since blur needs something colorful
              underneath to visibly refract. */}
          <div className="absolute -top-8 left-1/4 w-40 h-40 rounded-full bg-[#915eff] opacity-30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 right-1/4 w-40 h-40 rounded-full bg-[#00cea8] opacity-30 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#ec4899] opacity-20 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto items-stretch">
            <SideColumn {...aboutHighlight.dev} color={CATEGORY.dev.color} />
            <SideColumn {...aboutHighlight.security} color={CATEGORY.security.color} />
          </div>
        </div>
      </motion.div>

      <div className="flex justify-center flex-wrap gap-8 mt-16">
      {services.map((service, index) => (
        <ServiceCard key={service.title} index={index} {...service}/>
      ))}
      </div>

      </>
    )
}

export default SectionWrapper(About, "about")
