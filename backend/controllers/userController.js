const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");

// ======================== REGISTER OWNER ========================
exports.registerOwner = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const { fullname, email, password, phoneNumber, address, resource } = req.body;

    // cari role Owner
    const [role] = await db.sequelize.query(
      "SELECT UniqueID FROM role WHERE Name='Owner' LIMIT 1",
      { transaction: t }
    );
    const RoleId = role[0]?.UniqueID;
    if (!RoleId) throw new Error("Role Owner not found");

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // insert user
    const [userResult] = await db.sequelize.query(
      "INSERT INTO `User` (Fullname,Email,PhoneNumber,Address,Password,RoleId) VALUES (?,?,?,?,?,?)",
      {
        transaction: t,
        replacements: [fullname, email, phoneNumber || null, address || null, hash, RoleId],
      }
    );
    const ownerId = userResult; // biasanya MySQL return insertId

    // insert resource
    const { name, type, description, detail } = resource;
    const [resResult] = await db.sequelize.query(
      "INSERT INTO resource (Name,ResourceType,Description,OwnerId,IsActive) VALUES (?,?,?,?,?)",
      {
        transaction: t,
        replacements: [name, type, description || null, ownerId, 1],
      }
    );
    const resourceId = resResult;

    // insert detail sesuai type
    if (type === "room") {
      await db.sequelize.query(
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
      await db.sequelize.query(
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
    res.status(201).json({ message: "Owner registered", ownerId, resourceId });
  } catch (e) {
    await t.rollback();
    res.status(500).json({ error: e.message });
  }
};

// ======================== REGISTER CUSTOMER ========================
exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, address } = req.body;

    // role Customer
    const [role] = await db.sequelize.query(
      "SELECT UniqueID FROM role WHERE Name='Customer' LIMIT 1"
    );
    const RoleId = role[0]?.UniqueID;
    if (!RoleId) throw new Error("Role Customer not found");

    const hash = await bcrypt.hash(password, 10);

    const [result] = await db.sequelize.query(
      "INSERT INTO `User` (Fullname,Email,PhoneNumber,Address,Password,RoleId) VALUES (?,?,?,?,?,?)",
      {
        replacements: [fullname, email, phoneNumber || null, address || null, hash, RoleId],
      }
    );
    res.status(201).json({ message: "Customer registered", userId: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ======================== LOGIN ========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({
      where: { Email: email },
      include: [{ model: db.Role, attributes: ["Name"] }],
    });

    if (!user || !(await bcrypt.compare(password, user.Password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.UniqueID, role: user.Role.Name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: { id: user.UniqueID, email: user.Email, role: user.Role.Name },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ======================== CRUD USER ========================
exports.getAll = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    await user.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
