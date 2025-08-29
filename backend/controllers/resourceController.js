const db = require("../models");

const resourceController = {
  createResource: async (req, res) => {
    // hanya owner
    const ownerId = req.user.id;
    const { name, type, description, detail } = req.body;

    const t = await db.transaction();

    try {
      const [resourceId] = await db.query(
        "INSERT INTO resource (Name,ResourceType,Description,OwnerId,IsActive) VALUES (?,?,?,?,?)",
        {
          transaction: t,
          replacements: [name, type, description || null, ownerId, 1],
        }
      );
      // const resourceId = rRes.insertId;

      if (type === "room") {
        await db.query(
          "INSERT INTO roomDetail (ResourceId,RoomNumber,Capacity,Price,Floor,Facilities,Description) VALUES (?,?,?,?,?,?,?)",
          {
            transaction: t,
            replacements: [
              resourceId,
              detail?.roomNumber || null,
              detail?.capacity || null,
              detail?.price || null,
              detail?.floor || null,
              detail?.facilities || null,
              detail?.description || null,
            ],
          }
        );
      } else if (type === "health") {
        await db.query(
          "INSERT INTO healthDetail (ResourceId,DoctorName,Specialization,ClinicAddress,Fee,DurationMin,Description) VALUES (?,?,?,?,?,?,?)",
          {
            transaction: t,
            replacements: [
              resourceId,
              detail?.doctorName || null,
              detail?.specialization || null,
              detail?.clinicAddress || null,
              detail?.fee || null,
              detail?.durationMin || null,
              detail?.description || null,
            ],
          }
        );
      }

      await t.commit();
      res.status(201).json({ message: "Resource created", resourceId });
    } catch (e) {
      await t.rollback();
      res.status(500).json({ error: e.message });
    }
  },

  listResources: async (req, res) => {
    try {
      const { type } = req.query;
      const where = type ? "WHERE ResourceType=?" : "";
      const [rows] = await db.query(`SELECT * FROM resource ${where}`, {
        replacements: type ? [type] : [],
      });
      res.json(rows);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  update: async (req, res) => {
    const resource = await db.Resource.findByPk(req.params.id);
    if (!resource) return res.status(404).json({ error: "Not found" });

    // Owner hanya boleh update resource miliknya
    if (req.user.role === "owner" && resource.OwnerId !== req.user.UniqueID) {
      return res.status(403).json({ error: "Forbidden" });
    }
    await resource.update(req.body);
    res.json(resource);
  },

  getAvailableResources: async (req, res) => {
    try {
      const resources = await db.Resource.findAll({
        where: { IsActive: true },
        include: [
          { model: db.RoomDetail },
          { model: db.HealthDetail },
        ],
      });
      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const resources = await db.Resource.findAll();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = resourceController;
