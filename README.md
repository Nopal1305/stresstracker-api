# StressTracker AI - Backend API 🚀

Repositori ini berisi *source code* untuk sisi *backend* dari aplikasi **StressTracker**. Backend ini bertugas untuk menangani logika bisnis, komunikasi dengan *database* Supabase, serta penjadwalan otomatis untuk Push Notification menggunakan Firebase.

## 🛠 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** Supabase (PostgreSQL)
* **Push Notification:** Firebase Admin SDK
* **Task Scheduler:** node-cron

---

## ⚙️ Prerequisites (Prasyarat)
Sebelum menjalankan *server* ini di lokal, pastikan kamu sudah menyiapkan:
1. **Node.js** (versi 18 atau lebih baru).
2. Akun dan Kredensial **Supabase** (URL dan API Key).
3. Kredensial *Service Account* **Firebase** (dalam bentuk `.json` atau format *Environment Variables*).

---

## 🚀 Cara Instalasi & Menjalankan (Local Setup)

1. **Clone repository ini**
```bash
   git clone https://github.com/Nopal1305/stresstracker-api.git
   cd stresstracker-backend
```

2. **Install dependensi**
```bash
npm install
```

3. **Atur Environment Variables**
```.env
HOST=localhost
PORT=5000
DATABASE_URL=your_supabase_url
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
ACCESS_TOKEN_KEY=
REFRESH_TOKEN_KEY=
```
4. **Jalankan Server**
```bash
npm start
```
## 📡 API Routes Documentation
Daftar lengkap endpoint aplikasi tersedia disini: https://nopal1305.github.io/stresstracker-api/#/
