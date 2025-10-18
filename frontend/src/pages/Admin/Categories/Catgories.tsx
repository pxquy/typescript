import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import type { ICategory } from "../../../types/category";

const CategoryManager = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const limit = 1;

  useEffect(() => {
    (async () => {
      try {
        let url = "";

        if (keyword.trim() === "" && !minPrice && !maxPrice) {
          url = `http://localhost:3000/api/categories?_page=${page}&_limit=${limit}`;
        } else if (keyword && !minPrice && !maxPrice) {
          url = `http://localhost:3000/api/categories?_search=name&_keyword=${keyword}&_page=${page}&_limit=${limit}`;
        } else if (minPrice || maxPrice || keyword) {
          url = `http://localhost:3000/api/categories?_search=name&_keyword=${
            keyword || ""
          }&_sort=price&_minPrice=${minPrice || ""}&_maxPrice=${
            maxPrice || ""
          }&_page=${page}&_limit=${limit}`;
        }

        const { data } = await axios.get(url);
        setCategories(data.data.docs);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        console.log("Lỗi dữ liệu sản phẩm", error);
      }
    })();
  }, [page, keyword, minPrice, maxPrice]);

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
      await axios.delete(`http://localhost:3000/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Xoá thành công!");
      setCategories(categories.filter((c) => c._id != id));
    } catch (error: any) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <>
      <div className="mt-15 ml-10">
        <div className="mb-10 z-10 flex items-center justify-between gap-10">
          <form
            className="flex gap-20"
            onSubmit={(e) => {
              e.preventDefault();
              setPage(1);
            }}
          >
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="shadow-inner bg-gray-200 w-70 rounded-lg placeholder:p-2 focus:outline-none px-2 p-2"
            />
          </form>
          <Link
            to="/admin/addCategory"
            className="flex bg-blue-400 p-2 mr-10 rounded-lg text-white hover:bg-blue-500 hover:font-bold"
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
                <th className="border border-gray-300 p-2 w-60">
                  Tên danh mục
                </th>
                <th className="border border-gray-300 p-2 w-60">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-gray-500">
                    Hiện tại không có sản phẩm nào!
                  </td>
                </tr>
              ) : (
                categories.map((c, index) => (
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
                    <td className="border border-gray-300 w-10 text-center">
                      {c.name}
                    </td>

                    <td className="border-gray-300 w-65 text-center">
                      <button
                        onClick={() => deleteProduct(c._id)}
                        className="m-2 bg-red-600 px-3 py-1 rounded hover:bg-red-500 font-bold cursor-pointer"
                      >
                        🗑️
                      </button>
                      <Link
                        to={`/admin/editCategory/${c._id}`}
                        className="m-2 bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300 font-bold"
                      >
                        ✏️
                      </Link>
                      {/* <Link
                        to={`/admin/productDetail/${c._id}`}
                        className="m-2 bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 font-bold"
                      >
                        👁️
                      </Link> */}
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

export default CategoryManager;
