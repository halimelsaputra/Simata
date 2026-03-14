import type { Metadata } from 'next';
import { AppProvider } from '@/store/AppContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'SIMATA – Sistem Informasi Manajemen Tiket dan Agen Travel',
  description: 'Platform pemesanan tiket bus dan manajemen agen travel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
