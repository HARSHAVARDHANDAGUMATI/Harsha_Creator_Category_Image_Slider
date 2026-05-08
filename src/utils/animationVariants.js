const baseEase = [0.22, 1, 0.36, 1]

export const sectionTextVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay,
      duration: 0.95,
      ease: baseEase,
    },
  }),
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 36, scale: 0.98, filter: 'blur(12px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay,
      duration: 0.9,
      ease: baseEase,
    },
  }),
}

export const mobileCardVariants = {
  enter: { opacity: 0, x: 50, scale: 0.94, rotateY: 12, filter: 'blur(10px)' },
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 20,
      mass: 0.9,
    },
  },
  exit: {
    opacity: 0,
    x: -50,
    scale: 0.94,
    rotateY: -12,
    filter: 'blur(10px)',
    transition: {
      duration: 0.35,
      ease: baseEase,
    },
  },
}
