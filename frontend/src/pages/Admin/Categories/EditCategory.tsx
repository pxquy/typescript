import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import type { ICategory } from "../../../types/category";

const EditCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<ICategory>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/categories/${id}`
        );
        reset(data.data);
      } catch (error: any) {
        toast.error("Lỗi khi lấy danh mục:", error);
      }
    };
    if (id) fetchProduct();
  }, [id, reset]);

  const onSubmit = async (values: ICategory) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:3000/api/categories/${id}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(data.message || "Cập nhật thành công!");
      navigate("/admin/category");
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
      <h2 className="text-xl font-bold mb-4">Chỉnh sửa danh mục</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col w-[48%]">
            <label className="font-semibold">Tên danh mục (*)</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="border rounded p-2"
            />
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Cập nhật danh mục
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryPage;
