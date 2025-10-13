import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const commentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Thiếu thông tin người dùng!"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: [true, "Thiếu thông tin sản phẩm!"],
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

commentSchema.plugin(mongoosePaginate);

const Comments = mongoose.model("Comments", commentSchema);

export default Comments;
