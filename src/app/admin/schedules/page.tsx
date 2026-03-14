'use client';

import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/shared/PageTransition';
import ScheduleManagement from '@/components/admin/ScheduleManagement';

export default function SchedulesPage() {
  return (
    <AnimatePresence mode="wait">
      <PageTransition pageKey="schedules">
        <ScheduleManagement />
      </PageTransition>
    </AnimatePresence>
  );
}
