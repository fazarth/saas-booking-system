const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import semua model
db.User = require("./user");
db.Role = require("./role");
db.Resource = require("./resource");
db.Booking = require("./booking");
db.RoomDetail = require("./roomDetail");
db.HealthDetail = require("./healthDetail");
db.HealthBookingDetail = require("./healthbookingdetail");
db.RoomBookingDetail = require("./roombookingdetail");
db.QueueTickets = require("./queuetickets");
db.Checkin = require("./checkin");
db.AvailabilitySlots = require("./availabilityslots");

// Inisialisasi relasi jika ada fungsi associate
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
