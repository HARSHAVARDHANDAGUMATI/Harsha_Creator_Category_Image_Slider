import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import SliderWrapper from './SliderWrapper'
import SliderControls from './SliderControls'
import MobileSlider from './MobileSlider'
import { creators } from '../../data/creatorsData'
import { useSlider } from '../../hooks/useSlider'
import { fadeInUp } from '../../utils/animationVariants'

const CreatorSlider = () => {
  const [init, setInit] = useState(false)
  const {
    activeIndex,
    breakpoint,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoplay,
    resumeAutoplay,
    handleDragEnd,
  } = useSlider(creators.length)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesOptions = useMemo(() => ({
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: true,
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.5 } },
      },
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: false,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "out" },
        random: true,
        speed: 0.4,
        straight: false,
      },
      number: { density: { enable: true, area: 800 }, value: 40 },
      opacity: {
        value: { min: 0.1, max: 0.4 },
        animation: { enable: true, speed: 0.5, sync: false }
      },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), [])

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#020617] py-8 lg:flex lg:items-center lg:py-0">
      {/* Cinematic Background Elements */}
      <div className="bg-noise absolute inset-0 z-0" />
      
      {/* Particle System */}
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Floating Ambient Glows */}
      <div className="aurora-blur absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 opacity-20" />
      <div className="aurora-blur absolute -right-[10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 opacity-20" />
      <div className="aurora-blur absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 opacity-30" />

      <Container className="relative z-10 py-4 sm:py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            title="Explore millions of creators"
            description="Browse talented creators across multiple creative categories."
          />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
          className="glass-premium relative mt-6 rounded-[3rem] p-3 sm:mt-8 sm:p-5 lg:mt-6 lg:p-6"
        >
          {/* Active Card Energy Ring (Behind Slider) */}
          <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-10">
             <div className="energy-ring absolute inset-0 rounded-full blur-[100px]" />
          </div>

          <div className="relative hidden md:block">
            <SliderWrapper
              creators={creators}
              activeIndex={activeIndex}
              breakpoint={breakpoint}
              onSelect={goToSlide}
              onPause={pauseAutoplay}
              onResume={resumeAutoplay}
            />
          </div>

          <div className="md:hidden">
            <MobileSlider
              creators={creators}
              activeIndex={activeIndex}
              onSelect={goToSlide}
              onPause={pauseAutoplay}
              onResume={resumeAutoplay}
              onDragEnd={handleDragEnd}
            />
          </div>

          <SliderControls onPrev={prevSlide} onNext={nextSlide} />
          
          {/* Progress Indicator */}
          <div className="mt-6 flex justify-center gap-2 lg:mt-8">
            {creators.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === activeIndex 
                    ? 'w-8 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]' 
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default CreatorSlider
