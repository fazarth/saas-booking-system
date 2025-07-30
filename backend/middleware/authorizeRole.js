module.exports = function authorizeRole(...allowedIds) {
  return (req, res, next) => {
    const userRoleId = req.user?.roleId;

    if (!allowedIds.includes(userRoleId)) {
      return res
        .status(403)
        .json({ message: "Akses ditolak. Role tidak diizinkan." });
    }

    next();
  };
};
