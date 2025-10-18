import Categories from "../models/categories.model";

export const getAllCategories = async (req, res) => {
  const { _page = 1, _limit = 5, _search = "name", _keyword = "" } = req.query;
  const options = {
    page: _page,
    limit: _limit,
  };
  const filters = {};

  if (_keyword) {
    filters[_search] = { $regex: _keyword, $options: "i" };
  }
  try {
    const getAllCategories = await Categories.paginate(filters, options);

    if (getAllCategories.length == 0)
      return res.status(200).json({
        message: "Hiện tại chưa có danh mục nào!",
      });

    return res.status(200).json({
      message: "Danh sách danh mục:",
      data: getAllCategories,
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
    const geyById = await Categories.findById(req.params.id);

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
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const createCategory = await Categories.create(req.body);

    return res.status(201).json({
      message: "Thêm sản phẩm thành công!",
      data: createCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu server",
      error: error.message,
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const updateCategory = await Categories.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateCategory)
      return res.status(404).json({
        message: "Không tìm thấy ID sản phẩm cần sửa!",
      });

    return res.status(200).json({
      message: "Sửa sản phẩm thành công",
      data: updateCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu server",
      error: error.message,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const deleteCategory = await Categories.findByIdAndDelete(req.params.id);

    if (deleteCategory)
      return res.status(404).json({
        message: "Không tìm thấy ID danh mục cần xoá!",
      });

    return res.status(200).json({
      success: true,
      message: "Sản phẩm vừa xoá: ",
      data: deleteCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu server",
      error: error.message,
    });
  }
};
