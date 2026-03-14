'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User, TravelAgency, BusSchedule, Ticket } from '../types';

// ── Seed data ──────────────────────────────────────────────
const SEED_AGENCIES: TravelAgency[] = [
  { id: 'ag1', name: 'Sinar Jaya', logo: '🚌', description: 'PO Bus terpercaya sejak 1982 dengan armada modern dan pelayanan prima di jalur Pantai Utara.', rating: 4.5, totalBuses: 24, routes: ['Jakarta – Semarang', 'Jakarta – Cirebon'] },
  { id: 'ag2', name: 'Rosalia Indah', logo: '🌹', description: 'Bus eksekutif premium melayani rute Jawa dengan fasilitas lengkap dan kenyamanan maksimal.', rating: 4.7, totalBuses: 30, routes: ['Solo – Jakarta', 'Solo – Denpasar'] },
  { id: 'ag3', name: 'Harapan Jaya', logo: '⭐', description: 'Pilihan utama pelancong Jawa Timur dengan layanan ramah dan tepat waktu sejak 1990.', rating: 4.3, totalBuses: 18, routes: ['Surabaya – Jakarta', 'Surabaya – Malang'] },
];

const SEED_SCHEDULES: BusSchedule[] = [
  { id: 'sc1', agencyId: 'ag1', agencyName: 'Sinar Jaya', busName: 'SJ Express', origin: 'Jakarta', destination: 'Semarang', date: '2026-03-15', departureTime: '06:00', arrivalTime: '14:00', price: 195000, totalSeats: 40, bookedSeats: ['1A','1B','2C','3D','4A','5B','6C','7D','8A','9B'], busClass: 'Eksekutif' },
  { id: 'sc2', agencyId: 'ag1', agencyName: 'Sinar Jaya', busName: 'SJ Reguler', origin: 'Jakarta', destination: 'Cirebon', date: '2026-03-15', departureTime: '08:00', arrivalTime: '12:00', price: 120000, totalSeats: 40, bookedSeats: ['1A','3B','5C'], busClass: 'Bisnis' },
  { id: 'sc3', agencyId: 'ag2', agencyName: 'Rosalia Indah', busName: 'RI Super Top', origin: 'Solo', destination: 'Jakarta', date: '2026-03-15', departureTime: '19:00', arrivalTime: '05:00', price: 280000, totalSeats: 32, bookedSeats: ['1A','1B','2A','2B','3A','3B','4A','4B'], busClass: 'Eksekutif' },
  { id: 'sc4', agencyId: 'ag3', agencyName: 'Harapan Jaya', busName: 'HJ Ekonomi', origin: 'Surabaya', destination: 'Jakarta', date: '2026-03-16', departureTime: '17:00', arrivalTime: '06:00', price: 250000, totalSeats: 40, bookedSeats: ['1A','2A','3A','4A','5A'], busClass: 'Ekonomi' },
];

const SEED_TICKETS: Ticket[] = [
  { id: 'TKT-001', passengerId: 'u1', passengerName: 'Budi Santoso', passengerNik: '3201010101010001', passengerPhone: '081234567890', agencyName: 'Sinar Jaya', busName: 'SJ Express', busClass: 'Eksekutif', origin: 'Jakarta', destination: 'Semarang', date: '2026-03-10', departureTime: '06:00', arrivalTime: '14:00', seatNumber: '5A', price: 195000, paymentMethod: 'QRIS', status: 'Lunas', bookingDate: '2026-03-08' },
  { id: 'TKT-002', passengerId: 'u1', passengerName: 'Budi Santoso', passengerNik: '3201010101010001', passengerPhone: '081234567890', agencyName: 'Rosalia Indah', busName: 'RI Super Top', busClass: 'Eksekutif', origin: 'Solo', destination: 'Jakarta', date: '2026-03-05', departureTime: '19:00', arrivalTime: '05:00', seatNumber: '6B', price: 280000, paymentMethod: 'E-Wallet', status: 'Kedaluwarsa', bookingDate: '2026-03-01' },
  { id: 'TKT-003', passengerId: 'u1', passengerName: 'Budi Santoso', passengerNik: '3201010101010001', passengerPhone: '081234567890', agencyName: 'Harapan Jaya', busName: 'HJ Ekonomi', busClass: 'Ekonomi', origin: 'Surabaya', destination: 'Jakarta', date: '2026-03-18', departureTime: '17:00', arrivalTime: '06:00', seatNumber: '7C', price: 250000, paymentMethod: 'Virtual Account', status: 'Menunggu Pembayaran', bookingDate: '2026-03-08' },
  { id: 'TKT-004', passengerId: 'u1', passengerName: 'Budi Santoso', passengerNik: '3201010101010001', passengerPhone: '081234567890', agencyName: 'Sinar Jaya', busName: 'SJ Reguler', busClass: 'Bisnis', origin: 'Jakarta', destination: 'Cirebon', date: '2026-02-28', departureTime: '08:00', arrivalTime: '12:00', seatNumber: '2A', price: 120000, paymentMethod: 'QRIS', status: 'Dibatalkan', bookingDate: '2026-02-25' },
];

// ── Context shape ──────────────────────────────────────────
interface AppState {
  user: User | null;
  agencies: TravelAgency[];
  schedules: BusSchedule[];
  tickets: Ticket[];
  login: (email: string, password: string, role: 'admin' | 'customer') => boolean;
  register: (name: string, email: string, password: string, role: 'admin' | 'customer') => boolean;
  logout: () => void;
  addAgency: (a: Omit<TravelAgency, 'id'>) => void;
  updateAgency: (a: TravelAgency) => void;
  deleteAgency: (id: string) => void;
  addSchedule: (s: Omit<BusSchedule, 'id'>) => void;
  updateSchedule: (s: BusSchedule) => void;
  deleteSchedule: (id: string) => void;
  bookTicket: (t: Omit<Ticket, 'id' | 'bookingDate'>) => Ticket;
  bookSeat: (scheduleId: string, seatId: string) => void;
  selectedSchedule: BusSchedule | null;
  selectedSeat: string;
  setSelectedSchedule: (s: BusSchedule | null) => void;
  setSelectedSeat: (seat: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function useAppStore() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be inside AppProvider');
  return ctx;
}

// Simulated accounts
const accounts = [
  { email: 'admin@simata.com', password: 'admin123', name: 'Administrator', role: 'admin' as const },
  { email: 'budi@email.com', password: 'user123', name: 'Budi Santoso', role: 'customer' as const },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [agencies, setAgencies] = useState<TravelAgency[]>(SEED_AGENCIES);
  const [schedules, setSchedules] = useState<BusSchedule[]>(SEED_SCHEDULES);
  const [tickets, setTickets] = useState<Ticket[]>(SEED_TICKETS);
  const [selectedSchedule, setSelectedSchedule] = useState<BusSchedule | null>(null);
  const [selectedSeat, setSelectedSeat] = useState('');

  const login = useCallback((email: string, password: string, role: 'admin' | 'customer'): boolean => {
    const acc = accounts.find(a => a.email === email && a.password === password && a.role === role);
    if (!acc) return false;
    setUser({ id: role === 'admin' ? 'adm1' : 'u1', name: acc.name, email: acc.email, role: acc.role });
    return true;
  }, []);

  const register = useCallback((name: string, email: string, password: string, role: 'admin' | 'customer'): boolean => {
    if (accounts.find(a => a.email === email)) return false;
    accounts.push({ email, password, name, role });
    setUser({ id: `u${Date.now()}`, name, email, role });
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const addAgency = useCallback((a: Omit<TravelAgency, 'id'>) => {
    setAgencies(prev => [...prev, { ...a, id: `ag${Date.now()}` }]);
  }, []);

  const updateAgency = useCallback((a: TravelAgency) => {
    setAgencies(prev => prev.map(x => x.id === a.id ? a : x));
  }, []);

  const deleteAgency = useCallback((id: string) => {
    setAgencies(prev => prev.filter(x => x.id !== id));
    setSchedules(prev => prev.filter(x => x.agencyId !== id));
  }, []);

  const addSchedule = useCallback((s: Omit<BusSchedule, 'id'>) => {
    setSchedules(prev => [...prev, { ...s, id: `sc${Date.now()}` }]);
  }, []);

  const updateSchedule = useCallback((s: BusSchedule) => {
    setSchedules(prev => prev.map(x => x.id === s.id ? s : x));
  }, []);

  const deleteSchedule = useCallback((id: string) => {
    setSchedules(prev => prev.filter(x => x.id !== id));
  }, []);

  const bookSeat = useCallback((scheduleId: string, seatId: string) => {
    setSchedules(prev => prev.map(s =>
      s.id === scheduleId ? { ...s, bookedSeats: [...s.bookedSeats, seatId] } : s
    ));
  }, []);

  const bookTicket = useCallback((t: Omit<Ticket, 'id' | 'bookingDate'>): Ticket => {
    const ticket: Ticket = { ...t, id: `TKT-${Date.now()}`, bookingDate: new Date().toISOString().slice(0, 10) };
    setTickets(prev => [ticket, ...prev]);
    return ticket;
  }, []);

  return (
    <AppContext.Provider value={{ user, agencies, schedules, tickets, login, register, logout, addAgency, updateAgency, deleteAgency, addSchedule, updateSchedule, deleteSchedule, bookTicket, bookSeat, selectedSchedule, selectedSeat, setSelectedSchedule, setSelectedSeat }}>
      {children}
    </AppContext.Provider>
  );
}
