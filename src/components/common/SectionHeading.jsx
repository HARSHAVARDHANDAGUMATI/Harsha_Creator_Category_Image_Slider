import { motion } from 'framer-motion'
import { sectionTextVariants } from '../../utils/animationVariants'

const SectionHeading = ({ title, description }) => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.span
        variants={sectionTextVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -2, scale: 1.02 }}
        className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-sky-200/80 backdrop-blur-xl sm:text-xs"
      >
        Premium Creator Directory
      </motion.span>

      <motion.h2
        variants={sectionTextVariants}
        initial="hidden"
        animate="visible"
        whileInView={{
          textShadow: [
            '0 0 0px rgba(255,255,255,0)',
            '0 0 36px rgba(255,255,255,0.12)',
            '0 0 0px rgba(255,255,255,0)',
          ],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="text-gradient-animate font-display text-[1.8rem] font-extrabold leading-[1.05] sm:text-[2.2rem] lg:text-[3.75rem]"
      >
        {title}
      </motion.h2>

      <motion.p
        variants={sectionTextVariants}
        initial="hidden"
        animate="visible"
        custom={0.16}
        className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-[15px] lg:text-[0.98rem]"
      >
        {description}
      </motion.p>
    </div>
  )
}

export default SectionHeading
