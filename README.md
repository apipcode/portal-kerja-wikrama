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

## 🌟 15 Fitur Lengkap Aplikasi

Platform ini terbagi ke dalam tiga modul utama, masing-masing dengan fungsionalitas mutakhir untuk memaksimalkan pengalaman pengguna:

### Module 1: Fitur Murid & Alumni (Talent Hub)
1. **AI CV Analysis** - Antarmuka (UI) cerdas yang menganalisis dan memvisualisasikan tingkat kelengkapan CV PDF alumni secara otomatis.
2. **Smart Jurusan Filter** - Sistem papan lowongan kerja dengan filter *real-time* cerdas berbasis 7 program keahlian SMK Wikrama (PPLG, TJKT, DKV, PMN, dll).
3. **Application Pipeline** - Dashboard lamaran visual yang menyajikan status *tracking* pelamar mulai dari tahap *Pending, Interview*, hingga *Accepted*.
4. **Portfolio Showcase** - Integrasi input URL eksternal di halaman Profil agar murid dapat memamerkan karya dari GitHub maupun Behance.
5. **Digital QR Card** - Kemampuan auto-generate QR Code yang merujuk langsung ke *public profile* atau CV murid.
6. **Job Alerts** - Sistem notifikasi (*Toast/Badge*) cerdas yang muncul jika ada pembaruan atau lowongan baru yang relevan dengan jurusan murid.

### Module 2: Fitur Guru & Admin BKK (Moderation & Analytics)
7. **Verified Badge** - Tombol validasi eksklusif di dashboard Guru untuk memberikan tanda "Terverifikasi" (Badge Centang Biru) pada profil murid/alumni terpercaya.
8. **Tracer Study Dashboard** - Panel analitik visual interaktif (memanfaatkan Chart.js/Recharts) untuk memantau statistik keterserapan alumni di industri.
9. **Job Blast** - Sistem bagi Guru untuk menandai lowongan kerja tertentu sebagai "Prioritas" agar selalu muncul di posisi teratas *feed* para murid.
10. **Leaderboard** - Papan peringkat performa jurusan yang menampilkan tingkat persentase kebekerjaan alumni tertinggi secara periodik.

### Module 3: Fitur Industri & Advanced (Career Connect)
11. **Interview Scheduler** - Integrasi sistem kalender terpadu antara HR Perusahaan dan Pelamar untuk melihat dan menyetujui jadwal wawancara.
12. **Talent Search** - Kolom pencarian lanjutan (*Advanced Search*) bagi Guru dan Industri untuk memfilter data base murid berdasarkan spesifikasi kemampuan (*skill*) dan nilai rapor.
13. **Company Branding** - Halaman profil spesifik untuk mitra industri yang mendukung galeri multimedia (foto/video) guna meningkatkan ketertarikan talenta.
14. **Theme Engine** - Fitur Mode Gelap (Dark Mode) dan Terang (Light Mode) yang tersimpan secara persisten dalam *LocalStorage* peramban.
15. **PWA Support** - Konfigurasi Web App Manifest (`manifest.json`) dan *Service Worker* dasar, memungkinkan web ini di-*install* menyerupai aplikasi *native* pada perangkat Android, iOS, maupun PC.

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
