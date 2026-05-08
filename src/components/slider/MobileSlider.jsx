import { AnimatePresence, motion } from 'framer-motion'
import CreatorCard from './CreatorCard'
import { mobileCardVariants } from '../../utils/animationVariants'

const MobileSlider = ({
  creators,
  activeIndex,
  onSelect,
  onPause,
  onResume,
  onDragEnd,
}) => {
  const creator = creators[activeIndex]

  return (
    <div
      className="relative md:hidden"
      onTouchStart={onPause}
      onTouchEnd={onResume}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
    >
      <div className="relative h-[28.5rem] overflow-hidden sm:h-[29.5rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={creator.id}
            className="absolute inset-0"
            variants={mobileCardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
          >
            <CreatorCard
              creator={creator}
              isActive
              onClick={() => onSelect(activeIndex)}
              layout={{
                transform:
                  'translate(-50%, -50%) translateX(0px) translateY(-4px) translateZ(0px) rotateY(0deg) scale(0.97)',
                x: 0,
                y: -4,
                z: 0,
                scale: 0.97,
                rotateY: 0,
                opacity: 1,
                blur: 0,
                saturate: 1.1,
                zIndex: 40,
                transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
                interactive: true,
              }}
              className="w-[min(90vw,22rem)]"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MobileSlider
