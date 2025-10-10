import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  description: {
    type: String,
    maxLength: [200, "Trường này tối da 200 ký tự"],
  },
});

productSchema.plugin(mongoosePaginate);

const Products = mongoose.model("Product", productSchema);

export default Products;
