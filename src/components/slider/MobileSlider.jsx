import { AnimatePresence, motion } from 'framer-motion'
import CreatorCard from './CreatorCard'

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
      <div className="relative h-[29rem] w-full overflow-hidden">
        {/* Cinematic Ambient Glow for Mobile */}
        <div className="absolute inset-x-[5%] top-1/2 h-64 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[100px] animate-pulse" />
        <div className="absolute inset-x-[15%] bottom-5 h-32 rounded-full bg-purple-500/15 blur-[90px]" />
        <div className="absolute left-[10%] top-[20%] h-24 w-24 rounded-full bg-blue-400/10 blur-[60px]" />
        <div className="absolute right-[10%] bottom-[20%] h-32 w-32 rounded-full bg-fuchsia-400/10 blur-[70px]" />
        
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30 
            }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.32}
            onDragEnd={onDragEnd}
          >
            <CreatorCard
              creator={creator}
              isActive={true}
              isMobile={true}
              enableTilt={false}
              onClick={() => onSelect(activeIndex)}
              layout={{
                transform: 'translate(-50%, -50%) translateY(-8px) scale(1)',
                opacity: 1,
                blur: 0,
                saturate: 1.1,
                zIndex: 50,
                transition: { duration: 0.4 },
                interactive: true,
              }}
              className="w-[min(90vw,21rem)]"
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020617] to-transparent" />
      </div>
    </div>
  )
}

export default MobileSlider
