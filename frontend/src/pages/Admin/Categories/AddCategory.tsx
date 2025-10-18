import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import type { ICategory } from "../../../types/category";

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<ICategory>();
  const [loading, setLoading] = useState(false);

  // 🧩 Gửi dữ liệu sản phẩm
  const onSubmit = async (values: ICategory) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:3000/api/categories",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("✅ " + data.message);
      navigate("/admin/category");
      reset();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Lỗi dữ liệu server:", error);
        toast.error(error.response?.data.message || "Lỗi dữ liệu phía server!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        🛠️ Thêm danh mục mới
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Tên danh mục (*)</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Nhập tên sản phẩm"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Đang thêm..." : "➕ Thêm sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage;
