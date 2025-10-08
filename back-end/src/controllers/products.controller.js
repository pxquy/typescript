import Products from "../models/products.model";

export const getAllProducts = async (req, res) => {
  try {
    const getAllProducts = await Products.find();

    if (getAllProducts == 0)
      return res.status(200).json({
        message: "Hiện tại chưa có sản phẩm nào trong cửa hàng",
      });

    return res.status(200).json({
      message: "Danh sách sản phẩm",
      data: getAllProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu",
      error: error.message,
    });
  }
};
export const getById = async (req, res) => {
  try {
    const getById = await Products.findById(req.params.id);

    if (!getById)
      return res.status(404).json({
        message: "Không tìm thấy id sản phẩm phù hợp yêu cầu!",
      });

    return res.status(201).json({
      message: "Chi tiết sản phẩm",
      data: getById,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu",
      error: error.message,
    });
  }
};
export const createProduct = async (req, res) => {
  try {
    const { name, price, discountPrice, images, description } = req.body;

    const createProduct = await Products.create(req.body);

    return res.status(201).json({
      message: "Thêm mới thành công",
      data: createProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu",
      error: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { name, price, discountPrice, images, description } = req.body;

    const updateProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateProduct)
      return res.status(404).json({
        message: "Có lẽ sản phẩm cần sửa không tồn tại hoặc đã bị xoá!",
      });
    return res.status(201).json({
      message: "Sửa sản phẩm thành công",
      data: updateProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu",
      error: error.message,
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Products.findByIdAndDelete(req.params.id);

    return res.status(201).json({
      success: true,
      message: "Sản phẩm đã xoá",
      data: deleteProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu",
      error: error.message,
    });
  }
};
