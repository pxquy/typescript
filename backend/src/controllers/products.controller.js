import Products from "../models/products.model";

export const getAllProducts = async (req, res) => {
  try {
    const {
      _page = 1,
      _limit = 10,
      _sort = "price",
      _order = "desc",
      _search = "name",
      _keyword,
      _minPrice,
      _maxPrice,
    } = req.query;

    const sortOption = { [_sort]: _order === "desc" ? 1 : -1 };
    const options = {
      page: _page,
      limit: _limit,
      sort: sortOption,
      populate: "category",
    };

    const filters = {};

    if (_keyword) {
      filters[_search] = { $regex: _keyword, $options: "i" };
    }
    if (_minPrice || _maxPrice) {
      const min = Number(_minPrice) || 0;
      const max = Number(_maxPrice) || Infinity;

      if (!filters[_sort]) filters[_sort] = {};

      if (!isNaN(min)) filters[_sort].$gte = min;
      if (!isNaN(max)) filters[_sort].$lte = max;
    }

    const getAllProducts = await Products.paginate(filters, options);

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
    const createProduct = await Products.create({ ...req.body });

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
    if (!deleteProduct)
      return res.status(404).json({
        message: "Không tìm thấy ID sản phẩm cần xoá",
      });
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
