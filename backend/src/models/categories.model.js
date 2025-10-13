import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    empty: true,
    required: [true, "Trường này bắt buộc nhập!"],
  },
});

categorySchema.plugin(mongoosePaginate);

const Categories = mongoose.model("Categories", categorySchema);

export default Categories;
