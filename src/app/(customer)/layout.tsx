'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '@/store/AppContext';
import CustomerNavbar from '@/components/customer/CustomerNavbar';

const NAV_MAP: Record<string, string> = {
  home: '/home',
  history: '/history',
};

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppStore();

  useEffect(() => {
    if (!user || user.role !== 'customer') {
      router.replace('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'customer') return null;

  const isHomePage = pathname === '/home';

  return (
    <div style={{ minHeight: '100vh' }}>
      <CustomerNavbar
        onNavigate={(page) => router.push(NAV_MAP[page] || '/home')}
      />
      <div style={{ paddingTop: isHomePage ? 0 : 'var(--header-h, 80px)' }}>
        {children}
      </div>
    </div>
  );
}
