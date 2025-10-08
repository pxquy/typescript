import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    empty: true,
    required: [true, "Trường này bắt buộc nhập!"],
  },
  price: {
    type: Number,
    required: [true, "Trường này bắt buộc nhập!"],
  },
  discountPrice: {
    type: Number,
  },
  images: {
    type: String,
  },
  description: {
    type: String,
    maxLength: [200, "Trường này tối da 200 ký tự"],
  },
});

const Products = mongoose.model("Product", productSchema);

export default Products;
