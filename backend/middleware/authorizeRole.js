const authorizeRole = (requiredRoleName) => {
  return (req, res, next) => {
    const userRoleName = req.user?.role;

    if (userRoleName !== requiredRoleName) {
      return res
        .status(403)
        .json({ message: "Akses ditolak. Role tidak diizinkan." });
    }

    next();
  };
};

module.exports = authorizeRole;