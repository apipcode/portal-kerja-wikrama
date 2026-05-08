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

## 🌟 15 Fitur Unggulan

### Module 1: Talent Hub (Murid & Alumni)
1. **AI CV Analysis** (Mock) - Visualisasi analisis kelengkapan CV secara otomatis untuk memberikan feedback instan.
2. **Smart Jurusan Filter** - Papan lowongan dengan filter real-time berbasis 7 program keahlian SMK Wikrama.
3. **Application Pipeline** - Dashboard status lamaran visual (Pending, Interview, Accepted) untuk melacak progress alumni.
4. **Portfolio Showcase** - Integrasi field URL untuk portofolio eksternal (GitHub, Behance) di laman profil.
5. **Digital QR Card** - (Roadmap) Auto-generate QR code yang merujuk ke CV atau public profile murid.
6. **Job Alerts** - Notifikasi/Badge untuk lowongan "Prioritas" atau relevan dengan jurusan.

### Module 2: Moderation & Analytics (Guru & BKK)
7. **Verified Badge** - Lencana verifikasi khusus yang diberikan oleh BKK kepada alumni terpercaya.
8. **Tracer Study Dashboard** - (Roadmap) Chart analitik keterserapan alumni berdasarkan angkatan dan jurusan.
9. **Job Blast** - Sistem untuk menyorot lowongan kerja "Prioritas" agar tampil paling atas di *feed*.
10. **Leaderboard** - (Roadmap) Papan peringkat tingkat kebekerjaan per-jurusan.

### Module 3: Career Connect (Industri & Advanced)
11. **Interview Scheduler** - (Roadmap) Fitur kalender ringan untuk menjadwalkan panggilan interview.
12. **Talent Search** - Filter pencarian cerdas untuk mempermudah HR/Mitra Industri menyeleksi kandidat.
13. **Company Branding** - Halaman mitra industri yang mendukung galeri multimedia untuk employer branding.
14. **Theme Engine** - Fitur transisi mulus antara Dark Mode & Light Mode yang persisten (via localStorage).
15. **PWA Support** - Telah dikonfigurasi dengan `manifest.json` agar siap diinstal sebagai aplikasi *native* di Android/iOS/Desktop.

---

## 📂 Arsitektur Proyek Modular

Struktur proyek ini didesain spesifik agar terpisah (*separation of concerns*) dan memudahkan IT Developer Sekolah untuk melakukan *scaling*.

```
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
