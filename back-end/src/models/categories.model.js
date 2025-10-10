import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    empty: true,
    required: [true, "Trường này bắt buộc nhập!"],
  },
});

const Categories = mongoose.model("Categories", categorySchema);

export default Categories;
