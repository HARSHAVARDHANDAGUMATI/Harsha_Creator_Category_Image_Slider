import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { useRef } from 'react'

const MagneticButton = ({ children, onClick, ariaLabel, className }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    x.set((clientX - centerX) * 0.4)
    y.set((clientY - centerY) * 0.4)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-premium group relative flex items-center justify-center rounded-full border border-white/10 transition-colors duration-500 hover:border-cyan-400/50 hover:bg-cyan-500/10 ${className}`}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0 rounded-full bg-cyan-400/0 blur-xl transition-all duration-500 group-hover:bg-cyan-400/10" />
      <span className="relative z-10 text-white transition-colors duration-500 group-hover:text-cyan-200">
        {children}
      </span>
    </motion.button>
  )
}

const SliderControls = ({ onPrev, onNext }) => {
  const buttonClassName = 'h-16 w-16 text-2xl'

  return (
    <div className="mt-8 flex items-center justify-center gap-10 sm:mt-10">
      <MagneticButton
        onClick={onPrev}
        className={buttonClassName}
        ariaLabel="Show previous creator category"
      >
        <FiArrowLeft />
      </MagneticButton>

      <MagneticButton
        onClick={onNext}
        className={buttonClassName}
        ariaLabel="Show next creator category"
      >
        <FiArrowRight />
      </MagneticButton>
    </div>
  )
}

export default SliderControls
