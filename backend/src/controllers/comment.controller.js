import Comments from "../models/comment.model";
import Products from "../models/products.model";

export const getAllComments = async (req, res) => {
  const { _page = 1, _limit = 5 } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    populate: ["user", "product"],
  };
  try {
    const getAllComments = await Comments.paginate({}, options);

    if (getAllComments.length == 0)
      return res.status(200).json({
        message: "Hiện tại chưa có bình luận nào!",
      });

    return res.status(200).json({
      message: "Danh sách danh mục:",
      data: getAllComments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu server",
      error: error.message,
    });
  }
};
export const getById = async (req, res) => {
  try {
    const geyById = await Comments.findById(req.params.id);

    if (!geyById)
      return res.status(404).json({
        message: "Không tìm thấy ID danh mục phù hợp!",
      });

    return res.status(200).json({
      message: "Chi tiết sản phẩm:",
      data: geyById,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu server",
      error: error.message,
    });
  }
};
export const getByIdProductComment = async (req, res) => {
  try {
    const comments = await Comments.find({ product: Products._id })
      .populate("product", "name")
      .paginate("user", "name");

    if (!comments)
      return res.status(404).json({
        message: "Không tìm thấy ID danh mục phù hợp!",
      });

    return res.status(200).json({
      message: "Chi tiết sản phẩm:",
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu server",
      error: error.message,
    });
  }
};
export const createComment = async (req, res) => {
  try {
    const { title, content, product } = req.body;

    if (!title || !content || !product) {
      return res.status(400).json({
        message: "Thiếu thông tin bình luận hoặc sản phẩm",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập hoặc token không hợp lệ",
      });
    }

    const comment = await Comments.create({
      title,
      content,
      product,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Thêm bình luận thành công!",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu server",
      error: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { name } = req.body;
    const updateComment = await Comments.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateComment)
      return res.status(404).json({
        message: "Không tìm thấy ID sản phẩm cần sửa!",
      });

    return res.status(200).json({
      message: "Sửa sản phẩm thành công",
      data: updateComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu server",
      error: error.message,
    });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const deleteComment = await Comments.findByIdAndDelete(req.params.id);

    if (deleteComment)
      return res.status(404).json({
        message: "Không tìm thấy ID danh mục cần xoá!",
      });

    return res.status(200).json({
      success: true,
      message: "Sản phẩm vừa xoá: ",
      data: deleteComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu server",
      error: error.message,
    });
  }
};
