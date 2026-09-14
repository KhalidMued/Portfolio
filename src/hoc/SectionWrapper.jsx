import { motion } from 'framer-motion';

import { styles } from '../styles';
import { staggerContainer } from '../utils/motion';

const SectionWrapper = (Component, idName) => 
function HOC() {
    return(
        <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        /*
         * `amount` must NOT be a fraction of the section's own height.
         * It used to be 0.25, meaning "fire once a quarter of this section is
         * on screen" — which is unsatisfiable as soon as a section grows past
         * four viewport heights, because a quarter of it no longer fits. On a
         * phone the About section stacks to ~3585px tall, so it needed 896px
         * visible at once against a usable Safari viewport of ~750px. The
         * observer could never fire, `whileInView` never ran, and the whole
         * section sat at its `hidden` variant — a screen-and-a-half of blank
         * space between Hero and Experience, on every iPhone.
         *
         * `amount: "some"` is threshold 0, so it fires for any section at any
         * height. The negative bottom margin keeps the timing pleasant:
         * the section animates once its top edge is ~10% into the viewport,
         * rather than the instant one pixel appears.
         */
        viewport={{ once: true, amount: "some", margin: "0px 0px -10% 0px" }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        >
            <span className="hash-span" id={idName}>
            &nbsp;
            </span>
            <Component/>
        </motion.section>

    )
}

export default SectionWrapper