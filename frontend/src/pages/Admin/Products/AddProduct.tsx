import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  addAndEdit,
  type createAddAndEdit,
} from "../../../types/addAndEditValidateProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ICategory } from "../../../types/category";

const AddProductPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createAddAndEdit>({
    resolver: zodResolver(addAndEdit),
    mode: "onTouched",
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/categories"
        );
        setCategories(data.data.docs || data.docs || []);
      } catch (error: any) {
        toast.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (values: createAddAndEdit) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:3000/api/coffee",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("✅ " + data.message);
      navigate("/admin/product");
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
        🛠️ Thêm sản phẩm mới
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Tên sản phẩm (*)</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Nhập tên sản phẩm"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">
                {typeof errors.name.message === "string"
                  ? errors.name.message
                  : ""}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Giá sản phẩm (*)</label>
            <input
              {...register("price", { required: true, valueAsNumber: true })}
              type="number"
              placeholder="VD: 45000"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.price && (
              <p className="text-red-600 text-sm mt-1">
                {typeof errors.price.message === "number"
                  ? errors.price.message
                  : ""}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Giá khuyến mãi</label>
            <input
              {...register("discountPrice", { valueAsNumber: true })}
              type="number"
              placeholder="VD: 39000"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.discountPrice && (
              <p className="text-red-600 text-sm mt-1">
                {typeof errors.discountPrice.message === "number"
                  ? errors.discountPrice.message
                  : ""}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Ảnh sản phẩm (URL) (*)
            </label>
            <input
              {...register("images", { required: true })}
              type="text"
              placeholder="Dán link ảnh sản phẩm"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.images && (
              <p className="text-red-600 text-sm mt-1">
                {typeof errors.images.message === "string"
                  ? errors.images.message
                  : ""}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Danh mục (*)</label>
            <select
              {...register("category", { required: true })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm mt-1">
                {typeof errors.category.message === "string"
                  ? errors.category.message
                  : ""}
              </p>
            )}
          </div>
        </div>

        {/* Mô tả */}
        <div>
          <label className="block mb-1 font-medium">Mô tả sản phẩm (*)</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Mô tả chi tiết sản phẩm..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {typeof errors.description.message === "string"
                ? errors.description.message
                : ""}
            </p>
          )}
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

export default AddProductPage;
