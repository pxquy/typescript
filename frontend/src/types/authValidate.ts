import { email, refine, z } from "zod";

export const signup = z
  .object({
    name: z.string().min(1, "Tên không được để trống!"),
    email: z.string().min(1, "email không được để trống!"),
    password: z
      .string()
      .min(1, "Mật khẩu không được để trống!")
      .max(6, "Mật khẩu tối đa 6 ký tự!"),
    confirmPassword: z
      .string()
      .min(1, "Mật khẩu không được để trống!")
      .max(6, "Mật khẩu tối đa 6 ký tự!"),
    address: z.string().min(1, "Địa chỉ không được để trống"),
    phone: z
      .string()
      .min(1, "số điện thoại chỉ không được để trống")
      .max(11, "Số diện thoại tối đa 11 ký tự!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });
export type createSignup = z.infer<typeof signup>;

export const signin = z.object({
  email: z.string().min(1, "Vui lòng nhập tài khoản đăng nhập"),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu đăng nhập")
    .max(6, "Mật khẩu tối đa 6 ký tự"),
});

export type createSignin = z.infer<typeof signin>;
