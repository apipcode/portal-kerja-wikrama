# Portal Kerja SMK Wikrama Bogor - NextGen Career Hub 🚀

Platform Agent-First Career Hub yang modern, dinamis, dan terintegrasi untuk menghubungkan Alumni, Guru (BKK), dan Mitra Industri SMK Wikrama Bogor dalam satu ekosistem digital yang cerdas.

Proyek ini merupakan bentuk Full Reconstruction & Redesign dari versi sebelumnya, dibangun dengan standar UI/UX profesional (Glassmorphism, Dark Mode, Micro-animations) dan siap di-hosting langsung ke cloud (Vercel).

## 🛠️ Tech Stack Utama
- **Frontend**: React.js, Vite
- **Styling**: Tailwind CSS (dengan Custom Wikrama Theme)
- **Animasi & UI**: Framer Motion, Lucide React (Icons)
- **Routing**: React Router DOM
- **Backend & Database**: Supabase (PostgreSQL, Storage, Auth)
- **AI / Context Optimization**: Repomix

---

## 🌟 Fitur Aplikasi Lengkap

Platform ini mengintegrasikan fungsionalitas inti yang sudah siap pakai dengan cetak biru (roadmap) fitur masa depan, menjadikannya sangat fungsional dan terukur (scalable).

### 🚀 Fitur Inti yang Telah Tersedia (Core Ready)
- **Role-Based Authentication**: Sistem Login & Registrasi dengan enkripsi aman, membedakan hak akses untuk `Guru/BKK` dan `Murid/Alumni`.
- **Hybrid Database System**: Menggunakan Supabase asli jika ENV diisi, atau secara cerdas beralih ke *LocalStorage Fallback* untuk demo/Vercel.
- **Dynamic Profile Management**: Halaman profil yang terproteksi, memungkinkan edit Nama, Jurusan, Bio, URL Portofolio (GitHub), dan Avatar.
- **PDF CV Upload Engine**: Fitur Drag-and-Drop unggah CV dengan batasan format & ukuran (Maks 2MB), dilengkapi progres bar visual dan manajemen *mock storage*.
- **Interactive Job Board**: Papan lowongan interaktif dengan *Smart Filter* berbasis jurusan.
- **Theme Engine**: Transisi mulus antara *Dark Mode* dan *Light Mode* (persisten).
- **PWA Ready**: Dukungan *Progressive Web App* yang memungkinkan instalasi web di perangkat *mobile* dan *desktop*.

---

### 🗺️ Peta Jalan Modul Pengembangan (15 NextGen Features)

Sistem ini didesain untuk dikembangkan lebih jauh mencakup 15 fitur esensial ekosistem digital berikut:

**Module 1: Fitur Murid & Alumni (Talent Hub)**
1. **AI CV Analysis** - Antarmuka (UI) cerdas yang menganalisis kelengkapan CV PDF alumni.
2. **Smart Jurusan Filter** - *Real-time* filter berbasis 7 program keahlian.
3. **Application Pipeline** - Dashboard lamaran visual (*Pending, Interview, Accepted*).
4. **Portfolio Showcase** - Etalase visual URL portofolio eksternal.
5. **Digital QR Card** - Auto-generate QR Code yang merujuk ke public profile.
6. **Job Alerts** - Sistem notifikasi (*Toast/Badge*) cerdas lowongan baru.

**Module 2: Fitur Guru & Admin BKK (Moderation & Analytics)**
7. **Verified Badge** - Lencana verifikasi ("Centang Biru") dari BKK untuk alumni.
8. **Tracer Study Dashboard** - Panel analitik visual interaktif (Chart.js/Recharts) untuk statistik keterserapan.
9. **Job Blast** - Penandaan lowongan kerja "Prioritas" agar tampil di posisi teratas *feed*.
10. **Leaderboard** - Papan peringkat tingkat kebekerjaan alumni per-jurusan.

**Module 3: Fitur Industri & Advanced (Career Connect)**
11. **Interview Scheduler** - Integrasi sistem penjadwalan antara Perusahaan dan Pelamar.
12. **Talent Search** - Kolom *Advanced Search* untuk menyeleksi murid berdasarkan *skill*/nilai.
13. **Company Branding** - Halaman profil perusahaan yang mendukung galeri multimedia.
14. **Theme Engine** - Mode Gelap/Terang *(Telah Diimplementasikan!)*
15. **PWA Support** - Kemampuan aplikasi *native install* *(Telah Diimplementasikan!)*

---

## 📂 Arsitektur Proyek Modular

Struktur proyek ini didesain spesifik agar terpisah (*separation of concerns*) dan memudahkan IT Developer Sekolah untuk melakukan *scaling*.

```text
src/
├── components/
│   ├── common/      # Komponen UI Reusable (Button, Input, Badge, CVUpload)
│   ├── layout/      # Komponen Kerangka (Navbar, Footer, Sidebar)
│   └── sections/    # Komponen Bagian Landing Page (HeroSection, JobBoard)
├── context/         # React Context untuk State Management Global (AuthContext)
├── hooks/           # Custom React Hooks (useTheme)
├── lib/             # Konfigurasi Pihak Ketiga (supabaseClient dengan Mock support)
├── pages/           # Halaman Aplikasi (Auth, Profile, Admin Dashboard)
├── App.jsx          # Entry Point & Konfigurasi Routing
└── index.css        # Konfigurasi Tailwind & Global Styles
```

---

## ⚙️ Panduan Instalasi & Pengembangan Lokal

1. **Clone Repositori**
   ```bash
   git clone https://github.com/apipcode/portal-kerja-wikrama.git
   cd portal-kerja-wikrama
   ```

2. **Install Dependensi**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment (Supabase)**
   Buat file `.env` di root direktori dan masukkan kunci API Anda:
   ```env
   VITE_SUPABASE_URL=https://proyek-anda.supabase.co
   VITE_SUPABASE_ANON_KEY=kunci_anon_anda
   ```
   > *Catatan: Jika file `.env` tidak diisi, proyek akan otomatis menggunakan **Mock Service LocalStorage** agar tetap bisa berjalan 100% untuk keperluan demo visual.*

4. **Jalankan Server Development**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

---

## ☁️ Instruksi Deployment (Vercel)

Aplikasi ini sudah dioptimasi untuk deployment instan di Vercel:
1. Dorong (*Push*) kode Anda ke GitHub (lihat panduan di bawah).
2. Login ke dashboard **Vercel** dan buat *New Project*.
3. Pilih repositori `portal-kerja-wikrama`.
4. Di bagian **Environment Variables**, tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
5. Klik **Deploy**! (Framework Preset otomatis akan terdeteksi sebagai Vite/React).

---

## 🤝 Pesan Handover untuk Developer SMK Wikrama
Proyek ini dibangun dari nol dengan mengedepankan asas *Scalability* dan *Clean Code*. Arsitektur modular yang ada di dalam `src/components` dan implementasi **Hybrid Supabase Client** memungkinkan platform ini untuk langsung diuji coba secara visual maupun disambungkan secara utuh dengan arsitektur *database* sekolah yang sudah ada saat ini. Kami sangat berharap *NextGen Career Hub* ini bisa mempermudah BKK SMK Wikrama dalam menyalurkan talenta-talenta luar biasa ke dunia industri profesional. Happy Coding! 💻✨
