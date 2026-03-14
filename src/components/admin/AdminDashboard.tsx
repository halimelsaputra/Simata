'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/AppContext';
import { fadeSlideUp, staggerContainer, staggerItemScale, staggerItem } from '@/animations/variants';

function formatPrice(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

const STATUS_DOT: Record<string, string> = {
  'Lunas': 'var(--success)',
  'Menunggu Pembayaran': 'var(--warning)',
  'Kedaluwarsa': 'var(--gray-400)',
  'Dibatalkan': 'var(--danger)',
};

export default function AdminDashboard() {
  const { agencies, schedules, tickets } = useAppStore();

  const stats = useMemo(() => {
    const totalRevenue = tickets.filter((t) => t.status === 'Lunas').reduce((s, t) => s + t.price, 0);
    const totalBookedSeats = schedules.reduce((s, sc) => s + sc.bookedSeats.length, 0);
    return [
      {
        label: 'Total Agency',
        value: agencies.length,
        bg: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.08))',
        color: 'var(--primary)',
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        ),
      },
      {
        label: 'Total Jadwal',
        value: schedules.length,
        bg: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(14,165,233,0.08))',
        color: 'var(--info)',
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        ),
      },
      {
        label: 'Kursi Terpesan',
        value: totalBookedSeats,
        bg: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.08))',
        color: 'var(--success)',
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
        ),
      },
      {
        label: 'Pendapatan',
        value: formatPrice(totalRevenue),
        bg: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.08))',
        color: 'var(--accent)',
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
        ),
      },
    ];
  }, [agencies, schedules, tickets]);

  const recentTickets = useMemo(() => tickets.slice(0, 8), [tickets]);

  return (
    <motion.div variants={fadeSlideUp} initial="hidden" animate="visible">
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', fontFamily: 'Outfit' }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 16, marginTop: 6 }}>
          Selamat datang kembali, berikut ringkasan data terbaru
        </p>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 40 }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={staggerItemScale}
            whileHover={{ y: -4, boxShadow: 'var(--shadow-card)' }}
            style={{
              background: 'var(--bg-white)',
              borderRadius: 'var(--radius-xl)',
              padding: '24px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 'var(--radius)',
              background: stat.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', fontFamily: 'Outfit' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4, fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Bookings */}
      <div style={{
        background: 'var(--bg-white)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-main)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)', fontFamily: 'Outfit' }}>
            Pemesanan Terbaru
          </h2>
          <span className="badge badge-primary">{tickets.length} total</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Penumpang</th>
                <th>Rute</th>
                <th>Tanggal</th>
                <th>Harga</th>
                <th>Status</th>
              </tr>
            </thead>
            <motion.tbody variants={staggerContainer} initial="hidden" animate="visible">
              {recentTickets.map((t) => (
                <motion.tr key={t.id} variants={staggerItem} style={{ transition: 'background 0.2s' }} onMouseEnter={(e)=> e.currentTarget.style.background = 'var(--bg-main)'} onMouseLeave={(e)=> e.currentTarget.style.background = 'transparent'}>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: 14, color: 'var(--text-main)' }}>
                      {t.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{t.passengerName}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Kursi {t.seatNumber}</div>
                  </td>
                  <td style={{ fontWeight: 500, color: 'var(--text-main)' }}>
                    {t.origin} → {t.destination}
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{t.date}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>{formatPrice(t.price)}</td>
                  <td>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '6px 14px', borderRadius: 'var(--radius-full)',
                      background: t.status === 'Lunas' ? '#DCFCE7'
                        : t.status === 'Menunggu Pembayaran' ? '#FEF9C3'
                        : t.status === 'Dibatalkan' ? '#FEE2E2'
                        : 'var(--bg-subtle)',
                      color: t.status === 'Lunas' ? '#166534'
                        : t.status === 'Menunggu Pembayaran' ? '#854D0E'
                        : t.status === 'Dibatalkan' ? '#991B1B'
                        : 'var(--text-muted)',
                      fontSize: 13, fontWeight: 600,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.status === 'Lunas' ? '#16A34A' : t.status === 'Menunggu Pembayaran' ? '#D97706' : t.status === 'Dibatalkan' ? '#DC2626' : 'var(--text-light)' }} />
                      {t.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
