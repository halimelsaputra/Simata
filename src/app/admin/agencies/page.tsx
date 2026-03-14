'use client';

import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/shared/PageTransition';
import AgencyManagement from '@/components/admin/AgencyManagement';

export default function AgenciesPage() {
  return (
    <AnimatePresence mode="wait">
      <PageTransition pageKey="agencies">
        <AgencyManagement />
      </PageTransition>
    </AnimatePresence>
  );
}
