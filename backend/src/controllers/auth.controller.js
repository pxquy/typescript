import Users from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const checkEmail = await Users.findOne({ email: req.body.email });
    if (checkEmail)
      return res.status(400).json({
        message: "Email này đã tồn tại!",
      });

    const hashPassword = await bcryptjs.hash(req.body.password, 10);
    const user = await Users.create({
      ...req.body,
      password: hashPassword,
    });

    user.password = undefined;

    return res.status(201).json({
      message: "Đăng ký thành công:",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu server",
      error: error.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({
        message: "Email này không tồn tại tại!",
      });

    const comparePassword = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!comparePassword)
      return res.status(400).json({
        message: "Mật khẩu không đúng",
      });

    const token = await jwt.sign(
      { _id: user._id, roles: user.roles },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Đăng nhập thành công",
      token: token,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu server",
      error: error.message,
    });
  }
};
