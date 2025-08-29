const request = require("supertest");
const app = require("../server"); // Pastikan server.js export app

describe("Booking API", () => {
  it("GET /api/bookings should return 200", async () => {
    const res = await request(app).get("/api/bookings");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Tambahkan test lain sesuai kebutuhan
});
