import { motion } from 'framer-motion'
import CreatorCard from './CreatorCard'
import { getCardLayout, getCircularOffset, getVisibleRange } from '../../utils/sliderHelpers'

const SliderWrapper = ({
  creators,
  activeIndex,
  breakpoint,
  onSelect,
  onPause,
  onResume,
  onDragEnd,
}) => {
  const visibleRange = getVisibleRange(breakpoint)

  return (
    <div
      className="relative"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
    >
      <div className="relative h-[28.5rem] overflow-visible [perspective:2500px] lg:h-[30rem]">
        <div className="pointer-events-none absolute inset-x-[15%] top-8 h-48 rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="pointer-events-none absolute inset-x-[25%] bottom-8 h-32 rounded-full bg-purple-500/10 blur-[100px]" />

        <motion.div
          className="absolute inset-0"
          animate={{ rotateX: [0, 0.6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={onDragEnd}
        >
          {creators.map((creator, index) => {
            const offset = getCircularOffset(index, activeIndex, creators.length)
            const layout = getCardLayout(offset, breakpoint, visibleRange)

            return (
              <CreatorCard
                key={creator.id}
                creator={creator}
                layout={layout}
                isActive={offset === 0}
                onClick={() => onSelect(index)}
              />
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default SliderWrapper
