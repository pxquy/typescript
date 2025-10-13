export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return res.status(400).json({
        message: "Bạn không có quyền sử dụng chức năng này",
      });
    }
    next();
  };
};
