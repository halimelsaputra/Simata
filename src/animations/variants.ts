import type { Variants } from 'framer-motion';

/* ─── Page / Section Transitions ─── */

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, x: -40, transition: { duration: 0.35 } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, x: 40, transition: { duration: 0.35 } },
};

/* ─── Scale / Zoom ─── */

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  },
};

/* ─── Stagger Containers ─── */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Seat Selection ─── */

export const seatPop: Variants = {
  idle: { scale: 1 },
  pop: {
    scale: [1, 1.3, 1],
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
};

/* ─── Interactive / Hover-Tap ─── */

export const hoverScale = {
  whileHover: { scale: 1.035, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const } },
  whileTap: { scale: 0.97 },
};

export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const } },
  whileTap: { y: 0 },
};

export const btnHover = {
  whileHover: { scale: 1.02, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const } },
  whileTap: { scale: 0.96 },
};

export const cardHover = {
  whileHover: {
    y: -6,
    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ─── Floating Animation (for hero decorations) ─── */

export const float: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

export const floatSlow: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

/* ─── Number Counter (for stats) ─── */

export const numberReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Draw / Path Animations ─── */

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Layout animations ─── */

export const layoutSpring = {
  layout: true,
  transition: { type: 'spring', stiffness: 300, damping: 30 },
};

/* ─── Ultra Premium Landing Page specific ─── */

export const tiltCardVariant = {
  hidden: { opacity: 0, y: 50, rotateX: 20, rotateY: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    rotateY: 0,
    transition: { 
      type: 'spring', 
      damping: 20, 
      stiffness: 100, 
      mass: 0.5,
      delay: 0.2
    } 
  }
};

export const floatOrb1 = {
  animate: {
    y: [0, -40, 0],
    x: [0, 30, 0],
    scale: [1, 1.1, 1],
    transition: { duration: 12, repeat: Infinity, ease: "linear" }
  }
};

export const floatOrb2 = {
  animate: {
    y: [0, 50, 0],
    x: [0, -40, 0],
    scale: [1, 1.2, 1],
    transition: { duration: 15, repeat: Infinity, ease: "linear", delay: 1 }
  }
};

export const floatOrb3 = {
  animate: {
    y: [0, -30, 0],
    x: [0, -50, 0],
    scale: [1, 1.05, 1],
    transition: { duration: 10, repeat: Infinity, ease: "linear", delay: 2 }
  }
};

export const interactiveCardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.05, 
    y: -10,
    transition: { type: 'spring', stiffness: 400, damping: 20 }
  }
};

