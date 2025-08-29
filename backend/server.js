// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const { swaggerUi, swaggerSpec } = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/resources", require("./routes/resourceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/room-booking-details", require("./routes/roomBookingDetailRoutes"));
app.use("/api/health-booking-details", require("./routes/healthBookingDetailRoutes"));
app.use("/api/queue-tickets", require("./routes/queueTicketsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const db = require("./models");

db.sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL Connected");

    return db.sequelize.sync();
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database Error:", error);
  });

// Endpoint utama backend:
// - /api/auth         // Autentikasi & user (login, register, dsb)
// - /api/resources    // Manajemen resource (ruangan, fasilitas, dsb)
// - /api/bookings     // Manajemen booking (buat, lihat, update, hapus booking)
// - /api-docs         // Dokumentasi API (Swagger UI)
