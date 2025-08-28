# SaaS Booking System - Backend

## Deskripsi
Backend ini adalah RESTful API untuk sistem booking SaaS, dibangun dengan Node.js, Express, dan Sequelize (MySQL). Mendukung manajemen user, role, resource, booking, antrian, detail ruangan, detail kesehatan, dan slot ketersediaan.

## Fitur Utama
- Autentikasi & otorisasi (JWT)
- Manajemen User & Role
- Manajemen Resource (ruangan, layanan kesehatan, dll)
- Booking & detail booking (ruangan/kesehatan)
- Antrian (Queue Tickets)
- Slot ketersediaan (Availability Slots)
- Dokumentasi API otomatis (Swagger)

## Struktur Folder
- `models/` : Definisi model Sequelize
- `controllers/` : Logic endpoint API
- `routes/` : Routing endpoint API
- `migrations/` : File migrasi database
- `config/` : Konfigurasi database & Swagger
- `server.js` : Entry point aplikasi

## Menjalankan Backend

1. **Clone repo & install dependencies**
   ```bash
   npm install
   ```

2. **Konfigurasi environment**
   - Buat file `.env` dan isi variabel DB sesuai kebutuhan (lihat contoh `.env.example` jika ada).

3. **Migrasi database**
   ```bash
   npx sequelize-cli db:migrate
   ```

4. **Jalankan server**
   ```bash
   npm start
   ```
   Server berjalan di port sesuai `.env` (default: 5000).

5. **Akses dokumentasi API**
   - Buka [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## Endpoint Utama

| Resource                | Endpoint                       |
|-------------------------|-------------------------------|
| Auth                    | `/api/auth`                   |
| User                    | `/api/users`                  |
| Role                    | `/api/roles`                  |
| Resource                | `/api/resources`              |
| Booking                 | `/api/bookings`               |
| RoomBookingDetail       | `/api/room-booking-details`   |
| HealthBookingDetail     | `/api/health-booking-details` |
| QueueTickets            | `/api/queue-tickets`          |
| RoomDetail              | `/api/roomdetails`            |
| HealthDetail            | `/api/healthdetails`          |
| AvailabilitySlots       | `/api/availabilityslots`      |

## Tools & Library
- express
- sequelize
- mysql2
- dotenv
- swagger-ui-express

## Pengujian API (Testing)

### 1. Manual Testing (Postman/Insomnia)
- Import endpoint dari dokumentasi Swagger (`/api-docs`).
- Lakukan pengujian CRUD pada setiap endpoint (User, Booking, Resource, dsb).
- Cek validasi, error handling, dan response code.

### 2. Automated API Testing (Jest + Supertest)

Contoh file: `tests/booking.test.js`
```javascript
const request = require("supertest");
const app = require("../server"); // pastikan app diexport dari server.js

describe("Booking API", () => {
  it("GET /api/bookings should return 200", async () => {
    const res = await request(app).get("/api/bookings");
    expect(res.statusCode).toBe(200);
  });
  // Tambahkan test lain: POST, PUT, DELETE, validasi, dsb
});
```
Jalankan dengan:
```bash
npx jest
```

### 3. Pentest Sederhana (OWASP ZAP/Postman)

- Scan endpoint `/api/*` dengan OWASP ZAP untuk deteksi XSS, SQLi, dsb.
- Cek authentication, authorization, dan rate limiting.
- Uji input injection (payload aneh pada field).
- Cek error handling (jangan expose stacktrace/credential).

### 4. Checklist Pentest Minimal
- [ ] Tidak ada endpoint terbuka tanpa auth (kecuali login/register)
- [ ] Tidak ada data sensitif di response
- [ ] SQL Injection tidak bisa dilakukan
- [ ] XSS tidak bisa dilakukan
- [ ] Rate limit diterapkan (opsional)
- [ ] Password di-hash di database

---

MIT License
