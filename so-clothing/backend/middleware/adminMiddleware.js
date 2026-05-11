const authMiddleware = require(
  "./authMiddleware"
);

const adminMiddleware = async (
  req,
  res,
  next
) => {
  authMiddleware(
    req,
    res,
    async () => {
      if (!req.user.isAdmin) {
        return res.status(403).json({
          message:
            "Admin access only",
        });
      }

      next();
    }
  );
};

module.exports =
  adminMiddleware;