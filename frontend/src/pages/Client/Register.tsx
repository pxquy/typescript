import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

interface common {
  errors: string;
  message: string;
}

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signup, type createSignup } from "../../types/authValidate";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<createSignup>({
    resolver: zodResolver(signup),
  });

  const onSubmit = async (data: {}) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        data
      );
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Lỗi khi đăng ký!");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Đăng ký</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và Tên
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Vui lòng nhập tên",
                minLength: {
                  value: 2,
                  message: "Tên không hợp lệ",
                },
              })}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Nguyễn Văn A"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {typeof errors.name.message === "string"
                  ? errors.name.message
                  : ""}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email không hợp lệ",
                },
              })}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {typeof errors.email.message === "string"
                  ? errors.email.message
                  : ""}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 6,
                  message: "Mật khẩu ít nhất 6 ký tự",
                },
              })}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Nhập mật khẩu"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {typeof errors.password.message === "string"
                  ? errors.password.message
                  : ""}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Nhập lại mật khẩu"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ
            </label>
            <input
              type="text"
              {...register("address", {
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 2,
                  message: "Địa chỉ ít nhất 6 ký tự",
                },
              })}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.address ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Nhập địa chỉ"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {typeof errors.address.message === "string"
                  ? errors.address.message
                  : ""}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="phone"
              {...register("phone", {
                required: "Vui lòng nhập số điện thoại",
                maxLength: {
                  value: 11,
                  message: "số điện thoại tối đa 11 số",
                },
              })}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Nhập số điện thoại"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {typeof errors.password.message === "string"
                  ? errors.password.message
                  : ""}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Ghi nhớ tôi
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Đăng nhập tại đây?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Đăng nhập
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
