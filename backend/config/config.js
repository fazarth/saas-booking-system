require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || "saas_booking_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME_TEST || "saas_booking_test_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  }
};
