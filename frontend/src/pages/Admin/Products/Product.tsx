import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice: number;
  images: string;
  description: string;
}

interface Category {
  _id: string;
  name: string;
}

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const limit = 2;

  useEffect(() => {
    (async () => {
      try {
        let url = "";

        if (keyword.trim() === "" && !minPrice && !maxPrice) {
          url = `http://localhost:3000/api/coffee?_page=${page}&_limit=${limit}`;
        } else if (keyword && !minPrice && !maxPrice) {
          url = `http://localhost:3000/api/coffee?_search=name&_keyword=${keyword}&_page=${page}&_limit=${limit}`;
        } else if (minPrice || maxPrice || keyword) {
          url = `http://localhost:3000/api/coffee?_search=name&_keyword=${
            keyword || ""
          }&_sort=price&_minPrice=${minPrice || ""}&_maxPrice=${
            maxPrice || ""
          }&_page=${page}&_limit=${limit}`;
        } else if (categoryId) {
          url = `http://localhost:3000/api/coffee/category/${categoryId}&_page=${page}&_limit=${limit}`;
        }

        const { data } = await axios.get(url);
        setProducts(data.data.docs);
        setTotalPages(data.data.totalPages);
      } catch (error: any) {
        toast.error("Lỗi dữ liệu sản phẩm", error);
      }
    })();
  }, [page, keyword, minPrice, maxPrice, categoryId]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/categories`
        );
        setCategories(data.data.docs);
      } catch (error: any) {
        toast.error("Lỗi dữ liệu danh mục", error);
      }
    })();
  }, []);

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (page <= 2) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (page >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }
    return pages;
  };

  const deleteProduct = async (id: string) => {
    const isConfirm = window.confirm("Bạn chắc chắn muốn xoá chứ");

    if (!isConfirm) {
      return;
    }
    console.log(id);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/coffee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Xoá thành công!");
      setProducts(products.filter((p) => p._id != id));
    } catch (error: any) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <>
      <div className="mt-15 ml-10">
        <div className="mb-10 z-10 flex items-center justify-content-center gap-10">
          <form
            className="flex gap-20"
            onSubmit={(e) => {
              e.preventDefault();
              setPage(1);
            }}
          >
            <select
              onChange={(e) => {
                setCategoryId(e.target.value);
                setPage(1);
              }}
              className="border rounded-lg border-gray-400 p-2 pl-5 pr-5 font-bold cursor-pointer"
            >
              <option value="" hidden>
                Chọn danh mục
              </option>
              {categories.length > 0 ? (
                categories.map((c, index) => (
                  <option key={index} value={c._id}>
                    {c.name}
                  </option>
                ))
              ) : (
                <option disabled>Không có danh mục nào</option>
              )}
            </select>

            <select
              className="border rounded-lg border-gray-400 p-2 pl-5 pr-5 font-bold cursor-pointer"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "1") {
                  setMinPrice("20000");
                  setMaxPrice("50000");
                } else if (value === "2") {
                  setMinPrice("50000");
                  setMaxPrice("100000");
                } else {
                  setMinPrice("");
                  setMaxPrice("");
                }
                setPage(1);
              }}
            >
              <option value="">Chọn khoảng giá</option>
              <option value="1">20.000 - 50.000</option>
              <option value="2">50.000 - 100.000</option>
            </select>

            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="shadow-inner bg-gray-200 w-70 rounded-lg placeholder:p-2 focus:outline-none px-2"
            />
            <button
              type="submit"
              className="bg-blue-400 w-20 rounded-lg font-bold text-white cursor-pointer hover:bg-blue-500"
            >
              Lọc
            </button>
          </form>
          <Link
            to="/admin/addPage"
            className="flex bg-blue-400 p-2 rounded-lg text-white hover:bg-blue-500 hover:font-bold"
          >
            <Plus /> Thêm mới
          </Link>
        </div>

        <div>
          <table className="border rounded-lg w-full text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-gray-300 border p-2">
                  <input type="checkbox" />
                </th>
                <th className="border border-gray-300 p-2">STT</th>
                <th className="border border-gray-300 p-2 w-60">Hình ảnh</th>
                <th className="border border-gray-300 p-2 w-60">
                  Giá sản phẩm
                </th>
                <th className="border border-gray-300 p-2 w-60">Giá giảm</th>
                <th className="border border-gray-300 p-2 w-60">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-gray-500">
                    Hiện tại không có sản phẩm nào!
                  </td>
                </tr>
              ) : (
                products.map((p, index) => (
                  <tr
                    key={index}
                    className={`border border-gray-300 ${
                      index % 2 === 0
                        ? "bg-white shadow-sm"
                        : "bg-gray-100 shadow-inner"
                    }`}
                  >
                    <td className="border border-gray-300 w-10 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="border border-gray-300 w-10 text-center">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="border-gray-300 w-80 p-2 flex justify-between items-center">
                      {p.images ? (
                        <img
                          src={`/images/${p.images}`}
                          alt={p.name}
                          className="w-15 h-15 rounded"
                        />
                      ) : (
                        <div className="w-15 h-15 flex items-center justify-center bg-gray-200 rounded text-gray-500">
                          Không có ảnh
                        </div>
                      )}
                      <span className="font-bold text-gray-500">{p.name}</span>
                    </td>
                    <td className="border border-gray-300 w-65 text-center">
                      {p.price.toLocaleString()}₫
                    </td>
                    <td className="border border-gray-300 w-65 text-center">
                      {p.discountPrice.toLocaleString()}₫
                    </td>
                    <td className="border-gray-300 w-65 text-center">
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="m-2 bg-red-600 px-3 py-1 rounded hover:bg-red-500 font-bold cursor-pointer"
                      >
                        🗑️
                      </button>
                      <Link
                        to={`/admin/edit/${p._id}`}
                        className="m-2 bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300 font-bold"
                      >
                        ✏️
                      </Link>
                      <Link
                        to={`/admin/productDetail/${p._id}`}
                        className="m-2 bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 font-bold"
                      >
                        👁️
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex gap-5 m-10 items-center justify-center text-center w-250">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="bg-blue-400 p-2 rounded-sm text-white hover:font-bold cursor-pointer disabled:opacity-50"
            >
              Trang trước
            </button>

            <div className="flex gap-2 items-center">
              {generatePageNumbers().map((num, i) => (
                <button
                  key={i}
                  disabled={num === "..."}
                  onClick={() => typeof num === "number" && setPage(num)}
                  className={`px-3 py-1 rounded ${
                    num === page
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-gray-200 text-gray-700"
                  } ${
                    num === "..."
                      ? "cursor-default"
                      : "cursor-pointer hover:bg-blue-400"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="bg-blue-400 p-2 rounded-sm text-white hover:font-bold cursor-pointer disabled:opacity-50"
            >
              Trang sau
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductManager;
