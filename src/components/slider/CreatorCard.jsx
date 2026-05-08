import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import RatingBadge from '../ui/RatingBadge'

const CreatorCard = ({
  creator,
  layout,
  isActive,
  onClick,
  showDetails = true,
  className = '',
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`absolute left-1/2 top-1/2 w-[min(84vw,18rem)] text-left outline-none md:w-[16.25rem] lg:w-[17.5rem] ${className}`}
      animate={{
        transform: layout.transform,
        opacity: layout.opacity,
        filter: `blur(${layout.blur}px) saturate(${layout.saturate})`,
        zIndex: layout.zIndex,
      }}
      transition={layout.transition}
      style={{
        pointerEvents: layout.interactive ? 'auto' : 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Cinematic Active Spotlight (Behind Card) */}
      {isActive && (
        <div className="absolute inset-x-[-20%] inset-y-[-20%] z-0">
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_70%)] blur-2xl" />
        </div>
      )}

      <Tilt
        tiltMaxAngleX={isActive ? 12 : 0}
        tiltMaxAngleY={isActive ? 12 : 0}
        perspective={1000}
        scale={isActive ? 1.05 : 1}
        transitionSpeed={1500}
        gyroscope={true}
        glareEnable={isActive}
        glareMaxOpacity={0.15}
        glareColor="#ffffff"
        glarePosition="all"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          animate={
            isActive
              ? {
                  y: [0, -8, 0],
                  rotate: [0, 0.5, -0.5, 0],
                  boxShadow: [
                    '0 0 40px rgba(34, 211, 238, 0.1)',
                    '0 0 100px rgba(34, 211, 238, 0.25)',
                    '0 0 40px rgba(34, 211, 238, 0.1)',
                  ],
                }
              : { y: 0, rotate: 0, boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)' }
          }
          transition={{
            duration: 6,
            repeat: isActive ? Infinity : 0,
            ease: 'easeInOut',
          }}
          className={`glass-shine-premium glass-premium relative overflow-hidden rounded-[2.5rem] border-2 transition-colors duration-700 ${
            isActive
              ? 'border-cyan-400/50'
              : 'border-white/10'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Neon Edge Lighting Overlay */}
          {isActive && (
            <div className="pointer-events-none absolute inset-0 z-10 rounded-[2.5rem] border border-cyan-400/20 ring-1 ring-inset ring-white/20" />
          )}

          <div className="relative p-3 sm:p-4" style={{ transform: 'translateZ(40px)' }}>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
              <motion.img
                src={creator.image}
                alt={creator.title}
                animate={
                  isActive
                    ? { scale: [1, 1.1, 1], rotate: [0, 1, -1, 0] }
                    : { scale: 1 }
                }
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="h-44 w-full object-cover object-center transition duration-1000 sm:h-48 lg:h-52"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
              <div className="absolute left-3 top-3" style={{ transform: 'translateZ(60px)' }}>
                <RatingBadge rating={creator.rating} reviews={creator.reviews} />
              </div>
            </div>

            {showDetails && (
              <div className="relative mt-4 px-2" style={{ transform: 'translateZ(30px)' }}>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-2 inline-flex rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200"
                >
                  {creator.label}
                </motion.div>
                <h3 className="font-display text-xl font-bold text-white transition-colors duration-500 group-hover:text-cyan-200 sm:text-2xl">
                  {creator.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
                  {creator.description}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Cinematic Glass Reflection */}
        {isActive && (
          <div className="pointer-events-none absolute -bottom-[15%] left-1/2 h-[30%] w-[90%] -translate-x-1/2 opacity-20 blur-xl">
             <div 
               className="h-full w-full rounded-[2.5rem] bg-gradient-to-t from-cyan-500/40 to-transparent"
               style={{ transform: 'scaleY(-1)' }}
             />
          </div>
        )}
      </Tilt>
    </motion.div>
  )
}

export default CreatorCard
