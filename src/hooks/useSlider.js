import { useEffect, useState } from 'react'
import { wrapIndex } from '../utils/sliderHelpers'

const getBreakpoint = (width) => {
  if (width < 768) {
    return 'mobile'
  }

  if (width < 1024) {
    return 'tablet'
  }

  return 'desktop'
}

export const useSlider = (length) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [breakpoint, setBreakpoint] = useState(() => getBreakpoint(window.innerWidth))

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goToSlide = (index) => {
    setActiveIndex(wrapIndex(index, length))
  }

  const nextSlide = () => {
    setActiveIndex((current) => wrapIndex(current + 1, length))
  }

  const prevSlide = () => {
    setActiveIndex((current) => wrapIndex(current - 1, length))
  }

  const pauseAutoplay = () => {}
  const resumeAutoplay = () => {}

  const handleDragEnd = (_, info) => {
    const swipeDistance = info.offset.x
    const swipeVelocity = info.velocity.x

    if (swipeDistance <= -70 || swipeVelocity <= -500) {
      nextSlide()
      return
    }

    if (swipeDistance >= 70 || swipeVelocity >= 500) {
      prevSlide()
    }
  }

  return {
    activeIndex,
    breakpoint,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoplay,
    resumeAutoplay,
    handleDragEnd,
  }
}
