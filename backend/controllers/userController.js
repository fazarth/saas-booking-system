const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");

User.belongsTo(Role, { foreignKey: "RoleId" });

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { Email: email },
      include: {
        model: Role,
        attributes: ["UniqueID", "Name"],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      { id: user.UniqueID, role: user.Role?.Name, roleId: user.RoleId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.UniqueID,
        fullname: user.Fullname,
        email: user.Email,
        role: user.Role?.Name,
        roleId: user.RoleId,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["Password"] },
      include: {
        model: Role,
        attributes: ["Name"],
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.register = async (req, res) => {
  const { fullname, email, password, phoneNumber, address, roleId } = req.body;

  try {
    const existingUser = await User.findOne({ where: { Email: email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(400).json({ message: "Role tidak ditemukan" });
    }

    const newUser = await User.create({
      Fullname: fullname,
      Email: email,
      Password: hashedPassword,
      PhoneNumber: phoneNumber,
      Address: address,
      RoleId: roleId,
    });

    res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        id: newUser.UniqueID,
        fullname: newUser.Fullname,
        email: newUser.Email,
        role: role.Name,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
