const db = require("../models");
const RoomBookingDetail = db.RoomBookingDetail;

exports.getAll = async (req, res) => {
  try {
    const data = await RoomBookingDetail.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await RoomBookingDetail.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await RoomBookingDetail.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await RoomBookingDetail.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    await data.update(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await RoomBookingDetail.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    await data.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
