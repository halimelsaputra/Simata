import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const SEED_AGENCIES = [
  { id: 'ag1', name: 'Sinar Jaya', logo: '🚌', description: 'PO Bus terpercaya sejak 1982 dengan armada modern dan pelayanan prima di jalur Pantai Utara.', rating: 4.5, totalBuses: 24, routes: JSON.stringify(['Jakarta – Semarang', 'Jakarta – Cirebon']) },
  { id: 'ag2', name: 'Rosalia Indah', logo: '🌹', description: 'Bus eksekutif premium melayani rute Jawa dengan fasilitas lengkap dan kenyamanan maksimal.', rating: 4.7, totalBuses: 30, routes: JSON.stringify(['Solo – Jakarta', 'Solo – Denpasar']) },
  { id: 'ag3', name: 'Harapan Jaya', logo: '⭐', description: 'Pilihan utama pelancong Jawa Timur dengan layanan ramah dan tepat waktu sejak 1990.', rating: 4.3, totalBuses: 18, routes: JSON.stringify(['Surabaya – Jakarta', 'Surabaya – Malang']) },
];

const SEED_SCHEDULES = [
  { id: 'sc1', agencyId: 'ag1', agencyName: 'Sinar Jaya', busName: 'SJ Express', origin: 'Jakarta', destination: 'Semarang', date: '2026-03-15', departureTime: '06:00', arrivalTime: '14:00', price: 195000, totalSeats: 40, bookedSeats: JSON.stringify(['1A','1B','2C','3D','4A','5B','6C','7D','8A','9B']), busClass: 'Eksekutif' },
  { id: 'sc2', agencyId: 'ag1', agencyName: 'Sinar Jaya', busName: 'SJ Reguler', origin: 'Jakarta', destination: 'Cirebon', date: '2026-03-15', departureTime: '08:00', arrivalTime: '12:00', price: 120000, totalSeats: 40, bookedSeats: JSON.stringify(['1A','3B','5C']), busClass: 'Bisnis' },
  { id: 'sc3', agencyId: 'ag2', agencyName: 'Rosalia Indah', busName: 'RI Super Top', origin: 'Solo', destination: 'Jakarta', date: '2026-03-15', departureTime: '19:00', arrivalTime: '05:00', price: 280000, totalSeats: 32, bookedSeats: JSON.stringify(['1A','1B','2A','2B','3A','3B','4A','4B']), busClass: 'Eksekutif' },
  { id: 'sc4', agencyId: 'ag3', agencyName: 'Harapan Jaya', busName: 'HJ Ekonomi', origin: 'Surabaya', destination: 'Jakarta', date: '2026-03-16', departureTime: '17:00', arrivalTime: '06:00', price: 250000, totalSeats: 40, bookedSeats: JSON.stringify(['1A','2A','3A','4A','5A']), busClass: 'Ekonomi' },
];

async function main() {
  console.log('Start seeding...');

  // 1. Seed Admin User
  const adminEmail = 'admin@simata.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrator',
        role: 'admin',
      },
    });
    console.log(`Created admin user: ${adminEmail}`);
  } else {
    console.log(`Admin user ${adminEmail} already exists`);
  }

  // 2. Seed Customer User
  const customerEmail = 'budi@email.com';
  const existingCustomer = await prisma.user.findUnique({ where: { email: customerEmail } });

  let customerId = 'u1';
  if (!existingCustomer) {
    const hashedPassword = await bcrypt.hash('user123', 10);
    const created = await prisma.user.create({
      data: {
        id: 'u1',
        email: customerEmail,
        password: hashedPassword,
        name: 'Budi Santoso',
        role: 'customer',
      },
    });
    customerId = created.id;
    console.log(`Created test customer: ${customerEmail}`);
  } else {
    customerId = existingCustomer.id;
    console.log(`Test customer already exists`);
  }

  // 3. Seed Agencies
  for (const agency of SEED_AGENCIES) {
    const existing = await prisma.travelAgency.findUnique({ where: { id: agency.id } });
    if (!existing) {
      await prisma.travelAgency.create({ data: agency });
      console.log(`Created agency: ${agency.name}`);
    }
  }

  // 4. Seed Schedules
  for (const schedule of SEED_SCHEDULES) {
    const existing = await prisma.busSchedule.findUnique({ where: { id: schedule.id } });
    if (!existing) {
      await prisma.busSchedule.create({ data: schedule });
      console.log(`Created schedule: ${schedule.busName}`);
    }
  }

  // 5. Seed Tickets
  const SEED_TICKETS = [
    { id: 'TKT-001', passengerId: customerId, passengerName: 'Budi Santoso', passengerNik: '3201010101010001', passengerPhone: '081234567890', agencyName: 'Sinar Jaya', busName: 'SJ Express', busClass: 'Eksekutif', origin: 'Jakarta', destination: 'Semarang', date: '2026-03-10', departureTime: '06:00', arrivalTime: '14:00', seatNumber: '5A', price: 195000, paymentMethod: 'QRIS', status: 'Lunas', bookingDate: '2026-03-08' },
    { id: 'TKT-002', passengerId: customerId, passengerName: 'Budi Santoso', passengerNik: '3201010101010001', passengerPhone: '081234567890', agencyName: 'Rosalia Indah', busName: 'RI Super Top', busClass: 'Eksekutif', origin: 'Solo', destination: 'Jakarta', date: '2026-03-05', departureTime: '19:00', arrivalTime: '05:00', seatNumber: '6B', price: 280000, paymentMethod: 'E-Wallet', status: 'Kedaluwarsa', bookingDate: '2026-03-01' },
    { id: 'TKT-003', passengerId: customerId, passengerName: 'Budi Santoso', passengerNik: '3201010101010001', passengerPhone: '081234567890', agencyName: 'Harapan Jaya', busName: 'HJ Ekonomi', busClass: 'Ekonomi', origin: 'Surabaya', destination: 'Jakarta', date: '2026-03-18', departureTime: '17:00', arrivalTime: '06:00', seatNumber: '7C', price: 250000, paymentMethod: 'Virtual Account', status: 'Menunggu Pembayaran', bookingDate: '2026-03-08' },
  ];

  for (const ticket of SEED_TICKETS) {
    const existing = await prisma.ticket.findUnique({ where: { id: ticket.id } });
    if (!existing) {
      await prisma.ticket.create({ data: ticket });
      console.log(`Created ticket: ${ticket.id}`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
