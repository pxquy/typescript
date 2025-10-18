import z from "zod";

export const addAndEdit = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  price: z.number().min(1, "Giá sản phẩm không được để trống"),
  discountPrice: z.number().min(1, "Giá giảm sản phẩm không được để trống"),
  description: z.string().min(1, "Mô tả sản phẩm không được để trống"),
  images: z.string().min(1, "Ảnh sản phẩm không được để trống"),
  category: z.string().min(1, "Danh mục sản phẩm không được để trống"),
});

export type createAddAndEdit = z.infer<typeof addAndEdit>;
