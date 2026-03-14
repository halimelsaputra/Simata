'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { fadeSlideUp } from '../../animations/variants';
import type { ReactNode } from 'react';

export default function PageTransition({ children, pageKey }: { children: ReactNode; pageKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        variants={fadeSlideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
