'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/AppContext';
import PageTransition from '@/components/shared/PageTransition';
import PassengerPayment from '@/components/customer/PassengerPayment';
import type { PassengerData, PaymentMethod } from '@/types';

export default function PaymentPage() {
  const router = useRouter();
  const { user, selectedSchedule, selectedSeat, bookTicket, bookSeat, setSelectedSchedule, setSelectedSeat } = useAppStore();

  useEffect(() => {
    if (!selectedSchedule || !selectedSeat) {
      router.replace('/home');
    }
  }, [selectedSchedule, selectedSeat, router]);

  const handleConfirm = useCallback((passenger: PassengerData, method: PaymentMethod) => {
    if (!selectedSchedule || !user) return;
    bookSeat(selectedSchedule.id, selectedSeat);
    bookTicket({
      passengerId: user.id,
      passengerName: passenger.fullName,
      passengerNik: passenger.nik,
      passengerPhone: passenger.phone,
      agencyName: selectedSchedule.agencyName,
      busName: selectedSchedule.busName,
      busClass: selectedSchedule.busClass,
      origin: selectedSchedule.origin,
      destination: selectedSchedule.destination,
      date: selectedSchedule.date,
      departureTime: selectedSchedule.departureTime,
      arrivalTime: selectedSchedule.arrivalTime,
      seatNumber: selectedSeat,
      price: selectedSchedule.price,
      paymentMethod: method,
      status: 'Lunas',
    });
    setSelectedSchedule(null);
    setSelectedSeat('');
    router.push('/history');
  }, [selectedSchedule, selectedSeat, user, bookTicket, bookSeat, setSelectedSchedule, setSelectedSeat, router]);

  if (!selectedSchedule || !selectedSeat) return null;

  return (
    <AnimatePresence mode="wait">
      <PageTransition pageKey="payment">
        <PassengerPayment
          schedule={selectedSchedule}
          seatId={selectedSeat}
          onConfirm={handleConfirm}
          onBack={() => router.push('/booking/seat')}
        />
      </PageTransition>
    </AnimatePresence>
  );
}
