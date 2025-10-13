import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: [50, "Tên chỉ tối đa 50 ký tự!"],
      required: [true, "Trường này không được để trống!"],
    },
    email: {
      type: String,
      maxLength: [50, "Tên chỉ tối đa 50 ký tự!"],
      unique: true,
      required: [true, "Trường này không được để trống!"],
    },
    password: {
      type: String,
      required: [true, "Trường này không được để trống!"],
    },
    images: {
      type: String,
    },
    address: {
      type: String,
      maxLength: [50, "Tên chỉ tối đa 50 ký tự!"],
      required: [true, "Trường này không được để trống!"],
    },
    phone: {
      type: Number,
      maxLength: [11, "Tên chỉ tối đa 50 ký tự!"],
      required: [true, "Trường này không được để trống!"],
    },
    gender: {
      type: String,
      enum: ["nam", "nữ"],
      default: "nam",
    },
    roles: {
      type: String,
      enum: ["admin", "custom"],
      default: "custom",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(mongoosePaginate);

const Users = mongoose.model("Users", userSchema);

export default Users;
