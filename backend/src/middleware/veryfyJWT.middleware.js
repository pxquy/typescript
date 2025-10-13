import jwt from "jsonwebtoken";
export const verifyJWT = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token)
    return res.status(400).json({
      message: "Yêu cầu đăng nhập có token",
    });

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dự liệu phía server",
      error: error.message,
    });
  }
};
