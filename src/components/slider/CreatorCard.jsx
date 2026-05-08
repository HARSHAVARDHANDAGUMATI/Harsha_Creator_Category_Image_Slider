import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import RatingBadge from '../ui/RatingBadge'

const CreatorCard = ({
  creator,
  layout,
  isActive,
  onClick,
  showDetails = true,
  enableTilt = true,
  isMobile = false,
  className = '',
}) => {
  const cardBody = (
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
      className={`glass-shine-premium glass-card-premium relative overflow-hidden border-2 transition-colors duration-700 ${
        isActive
          ? 'border-cyan-400/50'
          : 'border-white/10'
      } ${isMobile ? 'rounded-[2rem] bg-white/[0.07]' : 'rounded-[2.5rem]'}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {isActive && (
        <div
          className={`pointer-events-none absolute inset-0 z-10 border border-cyan-400/20 ring-1 ring-inset ring-white/20 ${
            isMobile ? 'rounded-[2rem]' : 'rounded-[2.5rem]'
          }`}
        />
      )}

      <div
        className={`relative ${isMobile ? 'p-3' : 'p-3 sm:p-4'}`}
        style={{ transform: enableTilt ? 'translateZ(40px)' : 'none' }}
      >
        <div
          className={`relative overflow-hidden border border-white/10 bg-slate-900 ${
            isMobile ? 'rounded-[1.55rem]' : 'rounded-[2rem]'
          }`}
        >
          <motion.img
            src={creator.image}
            alt={creator.title}
            animate={
              isActive
                ? { scale: [1, 1.06, 1], rotate: [0, 0.6, -0.6, 0] }
                : { scale: 1 }
            }
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className={`block w-full object-cover object-center transition duration-1000 ${
              isMobile ? 'h-52' : 'h-44 sm:h-48 lg:h-52'
            }`}
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
          <div className="absolute left-3 top-3" style={{ transform: enableTilt ? 'translateZ(60px)' : 'none' }}>
            <RatingBadge rating={creator.rating} reviews={creator.reviews} />
          </div>
        </div>

        {showDetails && (
          <div
            className={`relative ${isMobile ? 'mt-3 px-1 pb-1' : 'mt-4 px-2'}`}
            style={{ transform: enableTilt ? 'translateZ(30px)' : 'none' }}
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`inline-flex rounded-full border border-white/10 bg-white/[0.08] font-bold uppercase text-cyan-200 ${
                isMobile
                  ? 'mb-2 px-2.5 py-1 text-[9px] tracking-[0.18em]'
                  : 'mb-2 px-3 py-1 text-[10px] tracking-[0.2em]'
              }`}
            >
              {creator.label}
            </motion.div>
            <h3
              className={`font-display font-bold text-white transition-colors duration-500 group-hover:text-cyan-200 ${
                isMobile ? 'text-[1.35rem] leading-tight' : 'text-xl sm:text-2xl'
              }`}
            >
              {creator.title}
            </h3>
            <p
              className={`text-slate-400 ${isMobile ? 'mt-2 text-[12px] leading-5' : 'mt-2 text-[13px] leading-relaxed'}`}
            >
              {creator.description}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )

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
        <div className={`absolute z-0 ${isMobile ? 'inset-x-[-15%] inset-y-[-15%]' : 'inset-x-[-20%] inset-y-[-20%]'}`}>
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle,rgba(34,211,238,0.22),transparent_75%)] blur-3xl" />
        </div>

      {enableTilt ? (
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
          {cardBody}

          {isActive && (
            <div className="pointer-events-none absolute -bottom-[15%] left-1/2 h-[30%] w-[90%] -translate-x-1/2 opacity-20 blur-xl">
              <div
                className={`h-full w-full bg-gradient-to-t from-cyan-500/40 to-transparent ${
                  isMobile ? 'rounded-[2rem]' : 'rounded-[2.5rem]'
                }`}
                style={{ transform: 'scaleY(-1)' }}
              />
            </div>
          )}
        </Tilt>
      ) : (
        <div className="relative">
          {cardBody}
        </div>
      )}
    </motion.div>
  )
}

export default CreatorCard
