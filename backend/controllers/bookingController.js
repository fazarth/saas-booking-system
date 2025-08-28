const db = require("../models");
const Booking = db.Booking;

// helper overlap
const overlapSQL = `
SELECT 1 FROM booking
WHERE ResourceId = ?
  AND Status <> 'Cancelled'
  AND NOT (EndTime <= ? OR StartTime >= ?)
LIMIT 1`;

exports.createBooking = async (req, res) => {
  try {
    const userId = req.user.id; // customer
    const { resourceId, startTime, endTime } = req.body;

    const [exist] = await db.query(overlapSQL, { replacements: [resourceId, startTime, endTime] });
    if (exist.length) return res.status(409).json({ error: "Time slot not available" });

    const [r] = await db.query(
      "INSERT INTO booking (UserId,ResourceId,StartTime,EndTime,Status,BookingCode) VALUES (?,?,?,?, 'Pending', UUID())",
      { replacements: [userId, resourceId, startTime, endTime] }
    );

    res.status(201).json({ message: "Booking created", bookingId: r.insertId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.myBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query(
      "SELECT b.*, r.Name as ResourceName FROM booking b JOIN resource r ON r.UniqueID=b.ResourceId WHERE b.UserId=? ORDER BY b.StartTime DESC",
      { replacements: [userId] }
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Owner/Admin update status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'Pending' | 'Confirmed' | 'Cancelled'
    await db.query("UPDATE booking SET Status=? WHERE UniqueID=?", { replacements: [status, id] });
    res.json({ message: "Booking status updated" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Booking.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await Booking.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await Booking.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await Booking.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    await data.update(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await Booking.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    await data.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
