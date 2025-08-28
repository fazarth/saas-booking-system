const db = require("../models");
const QueueTickets = db.QueueTickets;

exports.getAll = async (req, res) => {
  try {
    const data = await QueueTickets.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await QueueTickets.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await QueueTickets.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await QueueTickets.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    await data.update(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await QueueTickets.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    await data.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
