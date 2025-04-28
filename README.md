# Portfolio Website Zainiarf

![Portfolio Zainiarf](generated-icon.png)

## 🌟 Deskripsi

Website portfolio interaktif dan responsif untuk Zainiarf, seorang sarjana Hukum dan penggemar Teknologi. Website ini dibangun dengan fokus pada performa tinggi, efek 3D yang mengesankan, dan animasi yang halus.

## 🚀 Fitur Utama

- **Desain Modern**: Tema biru navy dan emas yang elegan dengan sentuhan profesional
- **Efek 3D**: Background dengan partikel 3D menggunakan Three.js
- **Kursor Kustom**: Kursor interaktif yang merespon gerakan mouse
- **Animasi Canggih**: Transisi halus dan efek muncul menggunakan GSAP dan Framer Motion
- **Bagian Skill Interaktif**: Visualisasi skill dengan efek hover dan animasi
- **Kartu Proyek**: Tampilan proyek dengan efek hover dan informasi detail
- **Responsif**: Tampilan optimal di semua perangkat (desktop, tablet, dan mobile)
- **Performa Tinggi**: Dioptimalkan untuk mencapai skor minimal 90 di Google PageSpeed Insights
- **Kompatibilitas Lintas Browser**: Berfungsi dengan baik di Chrome, Firefox, Safari, dan Edge

## 📋 Struktur Halaman

1. **Beranda**: Pengenalan dan sambutan
2. **Tentang**: Latar belakang dan pengalaman profesional
3. **Keahlian**: Keahlian teknis dan hukum dengan visualisasi interaktif
4. **Proyek**: Portofolio proyek dengan detail dan tautan
5. **Kontak**: Formulir kontak dan informasi kontak

## 🛠️ Teknologi yang Digunakan

- **Frontend**:
  - React.js dengan TypeScript
  - Three.js untuk efek 3D
  - GSAP untuk animasi
  - Framer Motion untuk transisi komponen
  - Tailwind CSS untuk styling
  - React Icons untuk ikon

- **Backend**:
  - Express.js
  - Node.js
  - Drizzle ORM dengan PostgreSQL
  - Nodemailer untuk fungsi kontak

- **Pengoptimalan**:
  - Lazy loading untuk gambar
  - Code splitting
  - Komponen yang di-cache

## 💻 Persyaratan Sistem

- Node.js v20 atau lebih tinggi
- NPM v9 atau lebih tinggi
- PostgreSQL (untuk penyimpanan data formulir kontak)

## 🔧 Cara Instalasi dan Menjalankan Lokal

1. **Clone repositori**
   ```bash
   git clone https://github.com/zainiarf/portfolio.git
   cd portfolio
   ```

2. **Instal dependensi**
   ```bash
   npm install
   ```

3. **Atur variabel lingkungan**
   - Buat file `.env` di direktori root
   - Tambahkan konfigurasi berikut:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/portfolio
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   ```

4. **Jalankan aplikasi dalam mode pengembangan**
   ```bash
   npm run dev
   ```

5. **Buka di browser**
   - Buka [http://localhost:5000](http://localhost:5000) di browser Anda

## 📦 Cara Deploy

Website ini dapat di-deploy menggunakan berbagai layanan hosting:

1. **Replit**
   - Gunakan tombol Deploy di dashboard Replit

2. **Vercel/Netlify**
   - Hubungkan repositori GitHub
   - Atur variabel lingkungan yang diperlukan
   - Deploy otomatis dari branch main

3. **VPS/Server Mandiri**
   - Jalankan build production: `npm run build`
   - Gunakan PM2 atau layanan serupa untuk menjalankan server

## 🔍 Optimasi SEO

Website ini dioptimalkan untuk SEO dengan:
- Meta tag yang tepat
- Struktur heading yang hierarkis
- Waktu muat yang cepat
- Konten yang dapat diakses oleh mesin pencari
- Sitemap XML

## 🛡️ Performa dan Keamanan

- Skor PageSpeed Insights: Target minimal 90
- Header keamanan untuk menghindari serangan umum
- Validasi input untuk semua formulir
- Penggunaan HTTPS

## 👥 Kontribusi

Kontribusi untuk perbaikan dan fitur baru sangat diterima. Silakan ikuti langkah-langkah berikut:

1. Fork repositori
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## 📝 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

## 📞 Kontak

Zainiarf - [zainiarfm@gmail.com](mailto:zainiarfm@gmail.com)

---

made by zainiarf 2025