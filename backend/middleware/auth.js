const jwt = require("jsonwebtoken");
const db = require("../models");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.User.findByPk(decoded.id, {
      include: [{ model: db.Role, attributes: ["Name"] }]
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;
    req.user.role = user.Role.Name;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate" });
  }
};

module.exports = auth;
