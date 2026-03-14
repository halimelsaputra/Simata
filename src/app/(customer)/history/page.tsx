'use client';

import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/shared/PageTransition';
import HistoryPage from '@/components/customer/HistoryPage';

export default function HistoryRoutePage() {
  return (
    <AnimatePresence mode="wait">
      <PageTransition pageKey="history">
        <HistoryPage />
      </PageTransition>
    </AnimatePresence>
  );
}
