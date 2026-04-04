# **Tugas Proyek Mata Kuliah Proyek Perangkat Lunak** 
## Disusun oleh: 
* Halim Elsa Putra ( 2308107010062 )
* M. Milan Ramadhan ( 2308107010064 )
* Amirul Mirdas ( 2308107010070 )
* Mahardika Shiddiq Anshari ( 23081070100 )

# 🚌 SIMATA (Sistem Manajemen Tiket Agen Bus)

SIMATA adalah sebuah platform aplikasi web modern yang dirancang untuk memfasilitasi dua sisi operasional agen perjalanan/bus:
1. **Sisi Admin**: Digunakan oleh petugas pengelola untuk mengatur master data pihak *agency* (PO Bus), menyusun jadwal tayang keberangkatan rute, dan melihat laporan *manifest* penumpang harian.
2. **Sisi Pelanggan (Customer)**: Digunakan oleh khalayak umum untuk mencari tiket travel antar-kota secara *real-time*, meninjau persediaan kursi, dan melakukan pesanan (checkout) hingga menerbitkan E-Ticket.

## 🚀 Fitur Utama

- **Pencarian Jadwal Dinamis**: Form dinamis yang memfilter keberangkatan bus melalui rute (asal ke tujuan) dan kriteria waktu.
- **Visualisasi Kursi Bus (Seat Selection)**: Pemilihan UI tempat duduk kosong yang responsif untuk meminimalisasi *double-booking*.
- **Admin Dashboard**: Panel utama untuk memantau performa; di mana Anda dapat mendaftarkan instansi Bus (*Agency*), mem-posting trayek rute (*Schedule*), hingga merekapitulasi Manifest Tiket Terjual secara otomatis per-bus.
- **Antarmuka Elegan & Responsif**: Mengadopsi prinsip desain *Glassmorphism* dan ditunjang oleh transisi animasi halaman/komponen yang sangat mulus menggunakan pustaka pendukung.

## 🛠️ Stack Teknologi & Bahasa

Aplikasi web SIMATA dibangun dengan *stack* JavaScript berbasis *framework* terkini:
- **Framework Core**: [Next.js (App Router)](https://nextjs.org/)
- **Bahasa Pemrograman**: TypeScript (Superset of JavaScript)
- **Library UI Sentral**: React 18+
- **Fluid Animation System**: Framer Motion
- **Sistem Styling**: Kode CSS Native murni menggunakan _Custom CSS Variables_ per komponen

## 📐 Arsitektur Sistem & Dokumentasi Diagram

Bagi keperluan studi pemrograman (Perancangan Sistem Rekayasa Web), repositori ini melampirkan cetak biru kode dan basis data berupa visual grafis diagram yang di-render langsung menggunakan komponen `Mermaid.js`. 

Klik tautan berikut untuk membuka masing-masing desain arsitektur:

1. **[ERD - Entity Relationship Diagram](docs/diagrams/ERD.md)**  
   *Melukiskan entitas konseptual data (User, Travel Agency, Bus Schedule, Ticket) beserta hubungan asosiasinya.*
2. **[LRS - Logical Record Structure](docs/diagrams/LRS.md)**  
   *Memetakan secara konkret implementasi tabel dan field basis data lengkap beserta relasi **Primary Key** dan **Foreign Key**.*
3. **[DFD - Data Flow Diagram](docs/diagrams/DFD.md)**  
   *Terdiri dari Diagram Konteks (Level 0) dan DFD (Level 1) yang menelaah arah muatan informasi dari intervensi *User/Admin* mendistribusi hingga ke pangkal database (Data Store).*
4. **[Flowchart - Bagan Alir Algoritma](docs/diagrams/Flowchart.md)**  
   *Algoritma diagram alir terpadu yang membatasi wilayah *swimlane* antara skenario proses *checkout* Pelanggan dan siklus operasional panel Dasbor Admin.*

## ⚙️ Panduan Kloning & Run Area Lokal

Pastikan lingkungan lokal OS Anda minimal memiliki perangkat *Node.js versi 18.x* (disarankan Node 20 LTS).

1. Buka Terminal/CMD, lalu panggil clone repositori ini:
   ```bash
   git clone https://github.com/username-anda/Simata.git
   ```
2. Berpindah ke *working directory*:
   ```bash
   cd Simata
   ```
3. Unduh dan inisialisasi semua dependensi program:
   ```bash
   npm install
   ```
4. Angkat servis mesin *development*:
   ```bash
   npm run dev
   ```
5. Akses hasil simulasi sistem melalui web browser di parameter url `http://localhost:3000`. Dari sini, Anda bisa mengembara masuk via rute peladen `/admin` atau portal pengguna `/customer`.

---

© 2026 SIMATA Project. All rights reserved.
