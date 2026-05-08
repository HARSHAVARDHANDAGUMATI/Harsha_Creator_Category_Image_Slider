const springTransition = {
  type: 'spring',
  stiffness: 170,
  damping: 22,
  mass: 0.95,
}

export const wrapIndex = (index, length) => {
  return ((index % length) + length) % length
}

export const getCircularOffset = (index, activeIndex, length) => {
  const rawOffset = index - activeIndex
  const wrappedOffset = ((rawOffset + length / 2) % length) - length / 2

  return wrappedOffset < -length / 2 ? wrappedOffset + length : wrappedOffset
}

export const getVisibleRange = (breakpoint) => {
  if (breakpoint === 'desktop') {
    return 2
  }

  if (breakpoint === 'tablet') {
    return 1
  }

  return 0
}

export const getCardLayout = (offset, breakpoint, visibleRange) => {
  const distance = Math.abs(offset)
  const hidden = distance > visibleRange
  const isDesktop = breakpoint === 'desktop'
  const isTablet = breakpoint === 'tablet'

  const baseX = isDesktop ? 220 : isTablet ? 184 : 0
  const x = hidden ? Math.sign(offset || 1) * (baseX * (visibleRange + 0.7)) : offset * baseX
  const y = distance === 0 ? -2 : distance === 1 ? 10 : 28
  const scale = distance === 0 ? 0.91 : distance === 1 ? 0.77 : 0.61
  const rotateY = distance === 0 ? 0 : (offset > 0 ? -1 : 1) * (distance === 1 ? 26 : 38)
  const opacity = hidden ? 0 : distance === 0 ? 1 : distance === 1 ? 0.72 : 0.34
  const blur = hidden ? 10 : distance === 0 ? 0 : distance === 1 ? 1.4 : 4.5
  const saturate = distance === 0 ? 1 : distance === 1 ? 0.88 : 0.76

  const isActive = distance === 0
  const translateZ = isActive ? 160 : (1 - Math.abs(offset) / 3) * 60 - 40

  return {
    transform: `translate(-50%, -50%) translateX(${x}px) translateY(${y}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    x,
    y,
    z: translateZ,
    scale,
    rotateY,
    opacity,
    blur,
    saturate,
    zIndex: isActive ? 100 : Math.floor(50 - Math.abs(offset) * 10),
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 22,
      mass: 0.8,
    },
    interactive: Math.abs(offset) < 0.5,
  }
}
