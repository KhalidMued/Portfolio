import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';

import 'react-vertical-timeline-component//style.min.css';
import { styles } from '../styles';
import { experiences } from '../constants';
import { CATEGORY } from '../constants/categories';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import { useTheme } from '../context/ThemeContext';

const ExperienceCard = ( {experience} ) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  // A role can span more than one side of the work — SecOps is security and
  // infrastructure both — so this is a list, and each badge carries its own
  // accent colour rather than the card having a single one.
  const categories = experience.categories;
  const Icon = experience.icon;

  return (
  <VerticalTimelineElement
  contentStyle={
    isDark
      ? { background: '#1d1836', color: '#fff' }
      : { background: '#fffbf4', color: '#1a1612', boxShadow: '0 3px 10px rgba(26,22,18,0.12)' }
  }
  contentArrowStyle={{ borderRight: isDark ? '7px solid #232631' : '7px solid #fffbf4' }}
  date={experience.date}
  iconStyle={{ background: 'rgb(var(--color-tertiary))' }}
  icon={<Icon color="rgb(var(--color-heading))" />}
  >
    <div className="flex items-start justify-between gap-3 flex-wrap">
      <div>
        <h3 className="text-heading text-[24px] font-bold"> {experience.title} </h3>
        <p className="text-secondary text-[16px] text-semibold"
         style={{margin: 0}}
         > {experience.company_name} · {experience.location} </p>
      </div>
      <div className="flex flex-wrap gap-2 shrink-0">
        {categories.map((key) => (
          <span
            key={key}
            className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
            style={{
              backgroundColor: `${CATEGORY[key].color}1a`,
              color: CATEGORY[key].color,
            }}
          >
            {CATEGORY[key].short}
          </span>
        ))}
      </div>
    </div>

    <ul className="mt-5 list-disc ml-5 space-y-2">
    {experience.points.map((point, index) =>
    <li
      key={`experience-point-${index}`}
      className="text-white-100 text-[14px] pl-1 tracking-wider"
    >
      {point}
    </li>
    )}
    </ul>
  </VerticalTimelineElement>
  )
}


const Experience = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
    <p className={styles.sectionSubText}
        > What I Have Done So Far </p>
        <h2 className={styles.sectionHeadText}
        > Work Experience. </h2>
    </motion.div>

    <div className="mt-20 flex flex-col">
      <VerticalTimeline>
        {experiences.map((experience, index) => (
        <ExperienceCard key={index} experience={experience} />
      ))}
      </VerticalTimeline>
    </div>
    </>
    )
}

export default SectionWrapper(Experience, "experience")
