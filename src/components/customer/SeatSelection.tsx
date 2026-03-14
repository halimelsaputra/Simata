'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeSlideUp, staggerContainer, staggerFast, seatPop, scaleIn } from '@/animations/variants';
import type { BusSchedule, Seat, SeatStatus } from '@/types';

interface Props {
  schedule: BusSchedule;
  onConfirm: (seatId: string) => void;
  onBack: () => void;
}

function formatPrice(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

/* ── Seat colour scheme ──────────────────────────────── */
function seatStyle(status: SeatStatus): React.CSSProperties {
  switch (status) {
    case 'booked':
      return {
        background: 'var(--bg-subtle)',
        color: 'var(--text-light)',
        border: '2px solid var(--border-subtle)',
        cursor: 'not-allowed',
        opacity: 0.7,
      };
    case 'selected':
      return {
        background: 'var(--grad-primary)',
        color: '#fff',
        border: '2px solid var(--primary)',
        boxShadow: 'var(--shadow-glow)',
        cursor: 'pointer',
      };
    default:
      return {
        background: 'var(--bg-white)',
        color: 'var(--text-main)',
        border: '2px solid var(--border-subtle)',
        cursor: 'pointer',
      };
  }
}

export default function SeatSelection({ schedule, onConfirm, onBack }: Props) {
  const [selectedSeat, setSelectedSeat] = useState<string>('');

  const seats: Seat[] = useMemo(() => {
    const arr: Seat[] = [];
    const rows = Math.ceil(schedule.totalSeats / 4);
    const labels = ['A', 'B', 'C', 'D'];
    for (let r = 1; r <= rows; r++) {
      for (const l of labels) {
        const id = `${r}${l}`;
        const idx = arr.length;
        if (idx >= schedule.totalSeats) break;
        arr.push({
          id,
          status: schedule.bookedSeats.includes(id)
            ? 'booked'
            : id === selectedSeat
            ? 'selected'
            : 'available',
        });
      }
    }
    return arr;
  }, [schedule, selectedSeat]);

  const handleSeatClick = useCallback((seat: Seat) => {
    if (seat.status === 'booked') return;
    setSelectedSeat((prev) => (prev === seat.id ? '' : seat.id));
  }, []);

  const rows = useMemo(() => {
    const result: Seat[][] = [];
    for (let i = 0; i < seats.length; i += 4) {
      result.push(seats.slice(i, i + 4));
    }
    return result;
  }, [seats]);

  const available = schedule.totalSeats - schedule.bookedSeats.length;

  return (
    <motion.div
      variants={fadeSlideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 40px 80px' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-secondary btn-icon"
          onClick={onBack}
          style={{ flexShrink: 0, width: 48, height: 48, borderRadius: 'var(--radius)', background: 'var(--bg-white)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}
        >
          <span style={{ fontSize: 24, lineHeight: 1, fontWeight: 700, color: 'var(--text-main)' }}>←</span>
        </motion.button>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', fontFamily: 'Outfit' }}>
            Pilih Kursi
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginTop: 4 }}>
            {schedule.agencyName} — {schedule.busName}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 36, alignItems: 'start' }}>
        {/* ── Seat Map ── */}
        <div style={{
          background: 'var(--bg-white)',
          borderRadius: 'var(--radius-xl)',
          padding: 36,
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 28, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--border-subtle)', justifyContent: 'center' }}>
            {[
              { label: 'Tersedia', color: 'var(--bg-white)', border: 'var(--border-subtle)' },
              { label: 'Dipilih', color: 'var(--primary)', border: 'var(--primary)' },
              { label: 'Terisi', color: 'var(--bg-subtle)', border: 'var(--border-subtle)' },
            ].map((l) => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 'var(--radius)',
                  background: l.color, border: `2px solid ${l.border}`,
                }} />
                <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 600 }}>{l.label}</span>
              </div>
            ))}
          </div>

          {/* Bus Front */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '10px 24px', borderRadius: 'var(--radius-full)',
              background: 'var(--bg-subtle)', color: 'var(--text-muted)',
              fontSize: 13, fontWeight: 700, letterSpacing: '0.06em',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
              </svg>
              DEPAN BUS
            </div>
          </div>

          {/* Seat Grid */}
          <motion.div
            variants={staggerFast}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}
          >
            {rows.map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: 12 }}>
                {row.map((seat, si) => (
                  <motion.div key={seat.id} style={{ display: 'flex' }}>
                    {/* Aisle gap between column B and C */}
                    {si === 2 && (
                      <div style={{ width: 44 }} />
                    )}
                      <motion.button
                      variants={seatPop}
                      initial="idle"
                      whileHover={seat.status !== 'booked' ? { scale: 1.05 } : undefined}
                      whileTap={seat.status !== 'booked' ? { scale: 0.95 } : undefined}
                      animate={seat.status === 'selected' ? 'pop' : 'idle'}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === 'booked'}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 14,
                        fontFamily: 'inherit',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        ...seatStyle(seat.status),
                      }}
                    >
                      {seat.id}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Sidebar Summary ── */}
        <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 32px)', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Trip Info Card */}
          <div style={{
            background: 'var(--bg-white)',
            borderRadius: 'var(--radius-xl)',
            padding: 32,
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)', marginBottom: 24, fontFamily: 'Outfit' }}>
              Detail Perjalanan
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { label: 'Rute', value: `${schedule.origin} → ${schedule.destination}` },
                { label: 'Tanggal', value: schedule.date },
                { label: 'Waktu', value: `${schedule.departureTime} – ${schedule.arrivalTime}` },
                { label: 'Kelas', value: schedule.busClass },
                { label: 'Kursi Tersedia', value: `${available} dari ${schedule.totalSeats}` },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{item.label}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-main)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Seat */}
          <AnimatePresence mode="wait">
            {selectedSeat ? (
              <motion.div
                key="selected"
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  padding: 32,
                  borderRadius: 'var(--radius-xl)',
                  border: '2px solid var(--primary)',
                  background: 'var(--bg-white)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)' }}>Kursi Dipilih</span>
                  <span style={{
                    padding: '8px 20px', borderRadius: 'var(--radius-full)',
                    background: 'var(--grad-primary)',
                    color: '#fff', fontWeight: 800, fontSize: 16, fontFamily: 'Outfit'
                  }}>
                    {selectedSeat}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: 15, color: 'var(--text-muted)' }}>Total Harga</span>
                  <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em', fontFamily: 'Outfit' }}>
                    {formatPrice(schedule.price)}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', padding: '16px 24px', fontSize: 16 }}
                  onClick={() => onConfirm(selectedSeat)}
                >
                  Lanjut Pembayaran
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  padding: 36, textAlign: 'center',
                  background: 'var(--bg-white)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                  Pilih kursi untuk melanjutkan
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
