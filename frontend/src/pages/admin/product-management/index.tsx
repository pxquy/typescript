import {
  Calendar,
  Edit,
  Filter,
  Mail,
  Phone,
  Plus,
  Search,
  Trash2,
  Package,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getAllProducts } from "../../../api/product";
import type { IProduct } from "../../../types/product";

interface IResponseList<T> {
  message: string;
  data: {
    docs: T[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    page: number;
    pagingCounter: number;
    prevPage: number | null;
    totalDocs: number;
    totalPages: number;
  };
}

export default function ProductManagement() {
  const [Products, setProducts] = useState<IProduct[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  //Lấy dữ liệu sản phẩm

  useEffect(() => {
    (async () => {
      const { data } = await getAllProducts();
      setProducts(data.docs);
    })();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    discountPrice: 0,
    images: "",
    description: "",
    category: "",
  });

  // State phân trang theo IResponseList
  const [pagination, setPagination] = useState<IResponseList<IProduct>>({
    message: "Success",
    data: {
      docs: [],
      hasNextPage: false,
      hasPrevPage: false,
      limit: 5,
      nextPage: null,
      page: 1,
      pagingCounter: 1,
      prevPage: null,
      totalDocs: 0,
      totalPages: 0,
    },
  });

  // Hàm lọc và phân trang dữ liệu
  const updatePagination = (page: number, limit: number) => {
    // Filter dữ liệu
    const filtered = Products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });

    const totalDocs = filtered.length;
    const totalPages = Math.ceil(totalDocs / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const docs = filtered.slice(startIndex, endIndex);

    setPagination({
      message: "Success",
      data: {
        docs,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit,
        nextPage: page < totalPages ? page + 1 : null,
        page,
        pagingCounter: startIndex + 1,
        prevPage: page > 1 ? page - 1 : null,
        totalDocs,
        totalPages,
      },
    });
  };

  // Update pagination khi có thay đổi
  useEffect(() => {
    updatePagination(pagination.data.page, pagination.data.limit);
  }, [Products, searchQuery]);

  const handleOpenModal = (p: IProduct | null = null) => {
    if (p) {
      setEditingProduct(p);
      setFormData({
        name: p.name,
        price: p.price,
        discountPrice: p.discountPrice ?? 0,
        images: p.images ?? "",
        description: p.description ?? "",
        category: "",
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        price: 0,
        discountPrice: 0,
        images: "",
        description: "",
        category: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      price: 0,
      discountPrice: 0,
      images: "",
      description: "",
      category: "",
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(
        Products.map((p) =>
          p._id === editingProduct._id
            ? {
                ...p,
                ...formData,
                avatar: formData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2),
              }
            : p
        )
      );
    } else {
      const newProduct: IProduct = {
        _id: (
          Math.max(...Products.map((p) => Number(p._id) || 0)) + 1
        ).toString(),
        ...formData,
        category: formData.category ?? "Product", // Default or from formData
        created_at: new Date().toISOString().split("T")[0],
        images: formData.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
      };
      setProducts([...Products, newProduct]);
    }
    handleCloseModal();
  };

  const handleDelete = (_id: string) => {
    setProducts(Products.filter((p) => p._id !== _id));
    setShowDeleteConfirm(null);
  };

  const handlePageChange = (newPage: number) => {
    updatePagination(newPage, pagination.data.limit);
  };

  const handleLimitChange = (newLimit: number) => {
    updatePagination(1, newLimit);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updatePagination(1, pagination.data.limit);
  };

  const handleFilterChange = () => {
    updatePagination(1, pagination.data.limit);
  };

  // Tạo số trang hiển thị
  const getPageNumbers = () => {
    const { page, totalPages } = pagination.data;
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const { data } = pagination;

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản Lý Người Dùng</h2>
        <p className="text-gray-600">
          Quản lý thông tin và quyền hạn của người dùng
        </p>
      </div>

      {/* Table Controls */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            {/* <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <select
                value={filterRole}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Product">Product</option>
              </select>
            </div> */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Plus size={18} />
            Thêm sản phẩm mới
          </button>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tên sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Giá sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Giá giảm
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mô tả sản phẩm
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Products.map((p, index) => (
                <tr key={index + 1} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-1 rounded-full flex items-center justify-center text-white font-semibold">
                        <img src={`/images/${p.images}`} alt={p.name} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {p.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm text-gray-500">{p.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {p.discountPrice}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {p.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(p)}
                        className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(p._id ?? null)}
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.totalDocs === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Không tìm thấy sản phẩm nào</p>
          </div>
        )}

        {/* Pagination */}
        {data.totalDocs > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Info */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Hiển thị</span>
                <select
                  value={data.limit}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <span>
                  từ {data.pagingCounter} đến{" "}
                  {Math.min(
                    data.pagingCounter + data.docs.length - 1,
                    data.totalDocs
                  )}{" "}
                  của {data.totalDocs} kết quả
                </span>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    data.prevPage && handlePageChange(data.prevPage)
                  }
                  disabled={!data.hasPrevPage}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition ${
                    !data.hasPrevPage
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">Trước</span>
                </button>

                <div className="flex gap-1">
                  {getPageNumbers().map((pageNum, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        typeof pageNum === "number" && handlePageChange(pageNum)
                      }
                      disabled={pageNum === "..."}
                      className={`min-w-[40px] px-3 py-2 rounded-lg transition ${
                        pageNum === data.page
                          ? "bg-blue-500 text-white"
                          : pageNum === "..."
                          ? "text-gray-400 cursor-default"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    data.nextPage && handlePageChange(data.nextPage)
                  }
                  disabled={!data.hasNextPage}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition ${
                    !data.hasNextPage
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="hidden sm:inline">Sau</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingProduct
                  ? "Chỉnh sửa người dùng"
                  : "Thêm người dùng mới"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá sản phẩm
                </label>
                <input
                  type="tel"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0912345678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá giảm sản phẩm
                </label>
                <input
                  type="tel"
                  value={formData.discountPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discountPrice: Number(e.target.value),
                    })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0912345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vai trò
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Product">Product</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Hoạt động</option>
                  <option value="Inactive">Không hoạt động</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  {editingProduct ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <Trash2 className="text-red-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              Xác nhận xóa
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể
              hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
