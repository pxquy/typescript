import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_SHOP_COFFEE);
    console.log("Kết nối thành công database");
  } catch (error) {
    console.log("không thể kết nối tới database", error.message);
  }
};
