import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import type { IProduct } from "../../../types/products";
import type { ICategory } from "../../../types/category";
import {
  addAndEdit,
  type createAddAndEdit,
} from "../../../types/addAndEditValidateProduct";
import { zodResolver } from "@hookform/resolvers/zod";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createAddAndEdit>({
    resolver: zodResolver(addAndEdit),
  });
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/categories"
        );
        setCategories(data.data.docs);
      } catch (error: any) {
        toast.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/coffee/${id}`
        );
        reset(data.data);
      } catch (error: any) {
        toast.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    if (id) fetchProduct();
  }, [id, reset]);

  const onSubmit = async (values: createAddAndEdit) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:3000/api/coffee/${id}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(data.message || "Cập nhật thành công!");
      navigate("/admin/product");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(
          `Lỗi dữ liệu server: ${error.response?.data.message || error.message}`
        );
      } else {
        alert(`Lỗi: ${error.message}`);
      }
    }
  };

  return (
    <div className="shadow-sm h-auto mt-10 ml-10 w-[800px] rounded-lg p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Chỉnh sửa sản phẩm</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col w-[48%]">
            <label className="font-semibold">Tên sản phẩm (*)</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="border rounded p-2"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">
                {typeof errors.name.message === "string"
                  ? errors.name.message
                  : ""}
              </p>
            )}
          </div>

          <div className="flex flex-col w-[48%]">
            <label className="font-semibold">Giá sản phẩm (*)</label>
            <input
              {...register("price", { required: true, valueAsNumber: true })}
              type="number"
              className="border rounded p-2"
            />
            {errors.price && (
              <p className="text-red-600 text-sm mt-1">
                {typeof errors.price.message === "string"
                  ? errors.price.message
                  : ""}
              </p>
            )}
          </div>

          <div className="flex flex-col w-[48%]">
            <label className="font-semibold">Giá khuyến mãi</label>
            <input
              {...register("discountPrice", { valueAsNumber: true })}
              type="number"
              className="border rounded p-2"
            />
            {errors.discountPrice && (
              <p className="text-red-600 text-sm mt-1">
                {typeof errors.discountPrice.message === "string"
                  ? errors.discountPrice.message
                  : ""}
              </p>
            )}
          </div>

          <div className="flex flex-col w-[48%]">
            <label className="font-semibold">Ảnh sản phẩm</label>
            <input
              {...register("images")}
              type="text"
              className="border rounded p-2"
            />
            {errors.images && (
              <p className="text-red-600 text-sm mt-1">
                {typeof errors.images.message === "string"
                  ? errors.images.message
                  : ""}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label className="font-semibold">Danh mục</label>
            <select
              {...register("category")}
              className="border rounded p-2 w-full"
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

          <div className="flex flex-col w-full">
            <label className="font-semibold">Mô tả sản phẩm</label>
            <textarea
              {...register("description")}
              rows={4}
              className="border rounded p-2"
            ></textarea>
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">
                {typeof errors.description.message === "string"
                  ? errors.description.message
                  : ""}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Quay lại
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Cập nhật sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
