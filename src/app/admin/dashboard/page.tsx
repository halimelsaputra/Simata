'use client';

import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/shared/PageTransition';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function DashboardPage() {
  return (
    <AnimatePresence mode="wait">
      <PageTransition pageKey="dashboard">
        <AdminDashboard />
      </PageTransition>
    </AnimatePresence>
  );
}
