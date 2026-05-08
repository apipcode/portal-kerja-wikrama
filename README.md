# Portal Kerja SMK Wikrama Bogor - NextGen Career Hub 🚀

Platform **Agent-First Career Hub** yang modern, dinamis, dan terintegrasi penuh untuk menghubungkan Alumni, Guru (BKK - Bursa Kerja Khusus), dan Mitra Industri SMK Wikrama Bogor dalam satu ekosistem digital yang cerdas dan terotomatisasi.

Proyek ini dibangun melalui metode *Full Reconstruction & Redesign* yang mengedepankan performa *frontend* tinggi, keamanan berbasis *Role-Based Access Control* (RBAC), serta antarmuka (UI/UX) profesional yang menggabungkan elemen *Glassmorphism, Micro-animations*, dan skalabilitas *database cloud*.

---

## 🛠️ Arsitektur & Tech Stack Spesifik

Aplikasi ini tidak sekadar menggunakan pustaka modern, melainkan merangkai komponen-komponen terbaik dengan performa maksimal:

### 1. **Core Framework & Build Tool**
- **React.js (v18+)**: Digunakan sebagai *core library* untuk merekayasa antarmuka komponen yang reaktif dan *state-driven*.
- **Vite**: Berperan sebagai *next-generation frontend tooling* pembangun aplikasi. Menggantikan Create React App (CRA) untuk mempercepat proses HMR (*Hot Module Replacement*) secara instan.

### 2. **Desain Sistem & UI/UX**
- **Tailwind CSS (v3)**: Mengelola sistem desain *utility-first* dengan integrasi *Theme Config* spesifik SMK Wikrama (Primary: `#1e3a8a`, Secondary: `#facc15`).
- **Framer Motion**: Menangani orkestrasi animasi deklaratif tingkat lanjut, seperti *staggered grid animations* pada daftar lowongan dan transisi perpindahan halaman.
- **Lucide React**: Library set ikon berbasis SVG yang ringan, konsisten, dan terintegrasi langsung dengan ekosistem React.
- **Theme Engine**: Mekanisme cerdas *Dark Mode / Light Mode* persisten berbasis manipulasi `classList` pada level `<html>` dan penyimpan status via *LocalStorage*.

### 3. **State Management & Routing**
- **React Router DOM (v6)**: Mengendalikan *client-side routing* yang dinamis, dibekali dengan modul perlindungan `ProtectedRoute` berbasis peran (RBAC).
- **React Context API (AuthContext)**: Manajemen *state global* asinkron untuk mempertahankan sesi login *User*, merangkap *fetcher* profil, dan mengawasi *token lifecycle*.

### 4. **Backend, Autentikasi & Database Engine**
- **Supabase API Client**: Ekosistem BaaS (*Backend as a Service*) menggunakan mesin *PostgreSQL*. Digunakan untuk otentikasi JWT (*JSON Web Tokens*) dan *Storage Bucket*.
- **Hybrid Mock Service**: Mahakarya *fallback* otomatis (tersemat di `supabaseClient.js`) yang memungkinkan aplikasi berjalan menggunakan basis data tiruan (*Mock LocalStorage*) secara absolut jika kunci API (ENV) belum diinjeksi, mencegah aplikasi *crash* di tahap uji coba awal.

---

## 🌟 Detail Fungsionalitas & Fitur Utama

Sistem ini didesain menjadi dua poros utama: Fungsionalitas yang telah dibangun (*Core Delivery*) dan cetak biru *scaling* (*Roadmap*).

### 🚀 Fitur Inti yang Telah Tersedia (Core Functional)

1. **Role-Based Authentication (RBAC) System**
   - Registrasi publik dikhususkan untuk tipe *Role*: `Murid/Alumni`.
   - **Invite-Only Admin System**: Pendaftaran akun `Guru/Admin BKK` tidak lagi dibuka untuk publik. Akun hanya dapat diciptakan (*Admin-Created*) via *backend/database* demi jaminan keamanan data tingkat instansi.
   - Papan rute terproteksi (`/admin/dashboard`) yang memastikan hanya level otorisasi "admin" yang berhak mengakses fungsi manajemen BKK.

2. **Dynamic Profile Control & Avatar System**
   - Halaman Profil pengguna ( `/profile` ) yang melacak *User ID* secara independen.
   - Kolom form pembaruan data *real-time*: Nama Lengkap, Program Keahlian (Jurusan), Bio Singkat, URL Foto Profil.
   - Kolom khusus: **URL Portofolio** untuk melampirkan profil GitHub / Behance pelamar.
   - **Verified Badge System**: Label visual "Centang Biru" eksklusif (`verified_status`) yang bersanding pada nama profil alumni terverifikasi.

3. **Smart PDF CV Upload Engine**
   - Komponen rekayasa canggih `CVUpload.jsx` dengan dukungan *Drag-and-Drop*.
   - Filter ketat di sisi klien (*Client-side Validation*): Ekstensi wajib `.pdf` dengan bobot maksimum memori `2MB`.
   - **Progress Bar Indicator** reaktif yang menghitung estimasi waktu unggah.
   - Sinkronisasi instan terhadap *Bucket Storage Supabase* (`cv-alumni`) yang secara asinkron mengambil tautan (URL) dokumen publik dan mencatatnya ke skema profil pelamar.

4. **Interactive & Responsive Job Board**
   - Modul `JobBoard.jsx` yang me-render baris (*grid*) lowongan kerja secara responsif.
   - *Smart Filter Engine*: Memisahkan kategori spesifik 7 program keahlian.
   - Metadata lengkap: Logo *Perusahaan*, Tipe Kontrak, Detail Gaji, hingga Lencana (*Badge*) keahlian yang dituju.

5. **Progressive Web App (PWA) Foundation**
   - Implementasi spesifikasi konfigurasi PWA melalui metadata Web App Manifest (`manifest.json`), menjadikan aplikasi ini kompatibel untuk dipasang secara *native* *(Add to Home Screen)* pada berbagai gawai.

---

### 🗺️ Peta Jalan Modul Lanjutan (35 Fitur Ekosistem)

Rancangan sistem ini diciptakan sangat modular berskala *Enterprise* agar ke depannya IT Developer dapat melanjutkan integrasi menuju 35 target fitur absolut berikut:

**Module 1: Fitur Murid & Alumni (Talent Hub)**
1. **AI CV Analysis** - Antarmuka (UI) cerdas penganalisis kelengkapan CV otomatis.
2. **Smart Jurusan Filter** - *Real-time* filter berbasis 7 program keahlian *(Sudah Terbangun)*.
3. **Application Pipeline** - Visualisasi Kanban *board* berisi jalur pelacakan status lamaran pelamar (*Pending, Interview, Accepted*).
4. **Portfolio Showcase** - Input pengumpul URL portofolio *open-source* pelamar *(Sudah Terbangun)*.
5. **Digital QR Card** - Modul otomatis penghasil *QR Code* merujuk spesifik ke *public profile* murid.
6. **Job Alerts** - Lencana cerdas *in-app notifications* jika lowongan baru terbit.
7. **AI Interview Simulator** - Latihan interview interaktif berbasis teks/suara dengan asisten AI.
8. **Auto-Generate Surat Lamaran** - Generator Cover Letter otomatis berdasar deskripsi pekerjaan.
9. **Skill Gap Analysis** - Analisis otomatis kekurangan *skill* murid untuk lowongan tertentu.
10. **Portfolio Video** - Modul unggah video perkenalan diri (*Elevator Pitch*) durasi 60 detik.
11. **Digital Certificate Vault** - Integrasi dan penyimpanan aman sertifikat BNSP/LSP.
12. **Gaji Benchmark** - Informasi proyeksi gaji standar industri bagi lulusan SMK.
13. **Sistem Mentorship** - Jembatan komunikasi alumni senior dengan adik kelas.
14. **Job Bookmark** - Penyimpanan lowongan kerja favorit (*Wishlist*).
15. **Dark Mode Schedule** - Pergantian mode gelap/terang otomatis mengikuti zona waktu.
16. **Print CV to PDF** - Ekspor profil digital portal kerja menjadi berkas CV PDF berdesain profesional.

**Module 2 & 3: Fitur Moderasi, Guru, & Koneksi Industri**
17. **Verified Badge** - Lencana kontrol mutu eksklusif kelulusan siswa *(UI Sudah Terbangun)*.
18. **Tracer Study Dashboard** - Diagram analitik visual interaktif berbasiskan *Chart.js/Recharts*.
19. **Job Blast** - Sistem notifikasi *Broadcast* prioritas lowongan.
20. **Leaderboard** - Papan rekapitulasi data *ranking* program keahlian.
21. **Interview Scheduler** - Integrasi *Third-party Calendar API* menyinkronisasi jadwal rekruitmen.
22. **Talent Search** - Parameter mesin pencarian kompleks spesifik membedah kemampuan (skill).
23. **Company Branding** - Modifikasi UI mandiri laman perusahaan.
24. **Internal Messaging** - Fitur *real-time chat* antara perusahaan dan pelamar.
25. **Status PKL Integration** - Rekam jejak instansi Praktik Kerja Lapangan (PKL) pada profil murid.
26. **Broadcast Pengumuman** - Sistem notifikasi (*Pop-up*) tersentralisasi dari BKK untuk semua *user*.
27. **Integrasi LinkedIn** - Sistem login dan pendaftaran kilat via opsi "Apply with LinkedIn".
28. **Event Job Fair** - Portal mini untuk registrasi acara bursa kerja mandiri sekolah.
29. **Verified Company Badge** - Lencana kepercayaan (*Trusted Partner*) untuk mitra industri resmi Wikrama.
30. **Skill Endorsement** - Fitur bagi Guru pengajar untuk me-validasi (Endorse) keahlian teknis murid.
31. **Auto-Matchmaking** - Algoritma rekomendasi otomatis lowongan yang cocok dengan profil murid.
32. **Log Aktivitas** - Fitur pelacakan riwayat perusahaan yang mengunjungi profil murid.
33. **Multi-Language Support** - Dukungan opsi antarmuka dwi-bahasa (Indonesia - Inggris).
34. **Theme Engine** - Fitur pergantian visual antarmuka Dark/Light *(Sudah Terbangun)*.
35. **PWA Support** - Adaptasi spesifikasi instalasi aplikasi gawai mutakhir *(Sudah Terbangun)*.

---

## 📂 Pemetaan Arsitektur Modular (Clean Folder Structure)

Arsitektur aplikasi dipilah sangat metodis untuk mengaplikasikan *Solid Principles*, di mana pengelolaan *state*, antarmuka (UI), dan *Business Logic* dijaga secara terpisah.

```text
/src
├── components/
│   ├── common/             # Micro-components: Button.jsx, Input.jsx, Badge.jsx, CVUpload.jsx
│   ├── layout/             # Master Layout: Navbar.jsx, Footer.jsx
│   └── sections/           # Laman Makro: HeroSection.jsx, JobBoard.jsx
├── context/
│   └── AuthContext.jsx     # Pemegang State Autentikasi Global
├── hooks/
│   └── useTheme.js         # Pengontrol Custom Hook (Dark Mode LocalStorage)
├── lib/
│   └── supabaseClient.js   # Konfigurasi Koneksi BaaS Supabase & Fallback Hybrid Mock
├── pages/
│   ├── admin/
│   │   └── Dashboard.jsx   # Laman Portal RBAC khusus Otoritas "Guru"
│   ├── auth/
│   │   ├── Login.jsx       # Pintu Autentikasi
│   │   └── Register.jsx    # Pintu Pendaftaran Profil & Selector Role
│   └── Profile.jsx         # Ruang Pengeditan Bio, CV PDF, dan Portofolio
├── App.jsx                 # Pembungkus Router Global & Papan Jalur
├── index.css               # Definisi Token Tailwind dan Root Layering (Glassmorphism CSS)
└── main.jsx                # DOM Injection Root Element
```

---

## ⚙️ Skema Instalasi Lokal (Developer Mode)

Berikut panduan memulai integrasi aplikasi ini di dalam *localhost* Anda:

1. **Unduh (Clone) Repositori Utama**
   Salin *source code* secara keseluruhan melalui kanal Git.
   ```bash
   git clone https://github.com/apipcode/portal-kerja-wikrama.git
   cd portal-kerja-wikrama
   ```

2. **Unduh Seluruh Pustaka Node**
   Siapkan modul-modul NPM (*Node Package Manager*) sesuai `package.json`.
   ```bash
   npm install
   ```

3. **Injeksi Kunci Environment (Supabase)**
   Demi keamanan, jangan pernah meng-unggah (push) file berisi kredensial! Buatlah berkas bernama `.env` di level direktori paling luar (sejajar dengan `package.json`), lalu masukkan kode API resmi BaaS Supabase Anda.
   ```env
   VITE_SUPABASE_URL=https://<ID-PROYEK-ANDA>.supabase.co
   VITE_SUPABASE_ANON_KEY=<KUNCI-ANON-JWT-ANDA>
   ```

   > **💡 PERHATIAN - Hybrid Mode**: Jika variabel `.env` di atas *TIDAK ADA* atau sengaja dikosongkan, sistem sama sekali tidak akan menolak (crash) operasi program. Berkat fitur *Hybrid Mock*, sistem secara mulus menyalin seluruh fungsionalitas (Register, Login, Input Bio, & Upload PDF) menggunakan memori `LocalStorage` pada peramban/browser (berlaku seolah-olah Supabase aktif 100%).

   > **🛡️ KEAMANAN PRODUKSI - ANTI SPAM**: Saat mempublikasikan sistem ini (*Live*), **Wajib** masuk ke Dashboard Supabase Anda -> `Authentication` -> `Rate Limits`. Atur `Max Sign-Up Attempts` menjadi angka wajar (misal: 10 per jam) untuk mencegah serangan *brute-force* pembuatan akun palsu.

4. **Kompilasi & Pemutaran (Start)**
   Uji coba aplikasi pada tahap lokal menggunakan Vite Local Server.
   ```bash
   npm run dev
   ```

---

## 🤝 Handover Statement untuk Divisi IT SMK Wikrama

Sistem *NextGen Career Hub* ini dikonstruksi mutlak dari nol agar mudah di-*scaling*, di audit, serta dibongkar-pasang. Pengaplikasian *Clean Code* dalam React *Hooks*, fleksibilitas desain token di Tailwind, hingga jembatan *Supabase Client Hybrid* diharapkan dapat langsung terintegrasi dengan struktur kurikulum BKK saat ini. Proyek ini membuktikan bahwa SMK Wikrama tidak sebatas institusi pelaksana, tetapi pionir digitalisasi portal karir ekosistem pendidikan Vokasi nomor wahid di Indonesia. Semangat merangkai masa depan digital SMK Wikrama! Happy Coding! 💻✨
