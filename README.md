# ☕ Exádelfos — Good Coffee, Good People

Website interaktif & modern untuk **Exádelfos Coffee**, dirancang khusus untuk pengunjung yang melakukan *tap* **Google Review Card (NFC / QR Code)** di meja kafe.

Website ini terintegrasi langsung dengan menu digital, sistem filter/sortir 4 kategori, ulasan Google, dan Instagram resmi [@exadelfos.c](https://www.instagram.com/exadelfos.c/).

---

## ✨ Fitur Unggulan

### 1. 🌟 Smart Google Review Flow (Optimalisasi Bintang 5)
- **Otomatis Muncul via NFC/QR**: Jika kartu NFC diarahkan ke `https://domain-kamu.vercel.app/?action=review` atau `#review`, popup ulasan Google otomatis muncul menyambut pelanggan.
- **Filter Rating Pintar**:
  - **Rating 4 & 5 Bintang**: Hujan konfeti perayaan 🎉, rekomendasi template ulasan 1-tap copy (*"Kopinya enak & creamy"*, *"Exadelfos Aren wajib coba!"*), dan tombol langsung membuka Google Maps review.
  - **Rating 1 - 3 Bintang**: Menampilkan form masukan privat via WhatsApp ke pengelola kafe, sehingga komplain pelanggan tertangani dengan cepat tanpa merusak skor publik Google Maps!
- **Social Proof Google**: Menampilkan badge rating 4.9 ★★★★★ dengan ulasan riil terverifikasi.

### 2. 📋 Menu Digital Interaktif (4 Kategori)
Sesuai daftar menu fisik Exádelfos:
1. **EXA SIGNATURE** (Exadelfos Aren 15K, Exadelfos Creamy 13K, Exadelfos Sweet 13K)
2. **COFFEE** (Americano, Americano Special Beans, Black Peach, Black Orange, Black Sakura, Mont Blanc, Butterscotch, Frambozen Coffe, Moccachino)
3. **NON COFFEE** (Matcha, Thaitea, Greentea, Coklat)
4. **MOCKTAIL SERIES** (Sakura Berry, Orange Sakura)

- **Fitur Menu**:
  - Filter kategori cepat dengan pill buttons & icon dinamis.
  - Pencarian instan (search bar) berdasarkan nama menu, bahan, atau tag rasa.
  - Pengurutan harga (Termurah 12K, Tertinggi 18K, Rekomendasi, Rating).
  - Tampilan **Grid Card** & **List View**.
  - Modal **Menu Fisik Asli** untuk melihat foto menu printed.

### 3. 📝 Kalkulator Pesanan & Catatan Meja
- Pelanggan bisa memilih minuman (`+ Pilih`), mengatur jumlah, menentukan nomor meja & catatan rasa (*Less sugar / Less ice*).
- Estimasi total harga otomatis dihitung.
- Opsi salin ringkasan pesanan atau kirim langsung ke WhatsApp barista.

### 4. 📸 Integrasi Instagram [@exadelfos.c](https://www.instagram.com/exadelfos.c/)
- Tombol langsung ke profil Instagram resmi.
- Salin 1-tap hashtag resmi `#TEMANEXA`.
- Galeri foto suasana kedai & minuman.

### 5. 📱 Mobile-First Experience
- Bottom navigation bar yang sticky dan ramah jempol.
- UI responsif, cepat, ringan (skor performa tinggi untuk akses data 4G/5G).
- Palet warna brand: Oranye hangat (`#FF5C00`), Hijau pinus (`#12382B`), dan Krem susu (`#FDFBF7`).

---

## 🚀 Panduan Hosting di Vercel

1. **Push ke GitHub**:
   Repository ini sudah terhubung ke:
   ```bash
   https://github.com/gryvnalvrdo/exadelfos
   ```
2. **Import ke Vercel**:
   - Buka [vercel.com](https://vercel.com) dan login.
   - Klik **"Add New Project"** ➔ Pilih repository **`exadelfos`**.
   - Framework preset otomatis terdeteksi sebagai **Vite**.
   - Klik **Deploy**.
3. **Konfigurasi URL Kartu NFC**:
   - Setelah deploy selesai, masukkan link website ke kartu Google Review NFC Anda:
     - `https://nama-projek.vercel.app/?action=review`
   - Setiap pelanggan yang men-tap kartu NFC di meja akan langsung diarahkan ke layar review bintang 5 dengan pengalaman interaktif terbaik!

---

## 💻 Menjalankan di Komputer Lokal

```bash
# Install dependencies
npm install

# Jalankan server development
npm run dev

# Build untuk production
npm run build
```

