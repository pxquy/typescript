import axios from "axios";
import { useForm } from "react-hook-form";

interface Product {
  name: string;
  price: number;
  discountPrice: number;
  images: string;
  category: string;
  description: string;
}

const AddProductPage = () => {
  const { register, handleSubmit } = useForm<Product>({});

  const onSubmit = async (values: any) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/coffee`,
        values
      );
      alert(data.message);
    } catch (error) {
      console.log("Lỗi dữ liệu server", error);
    }
  };
  return (
    <>
      <div className="shadow-sm h-130 mt-10 ml-10 w-300 rounded-lg">
        <h2>Trang thêm sản phẩm mới</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap items-center justify-content-around">
            <div className="flex flex-col p-5">
              <label htmlFor="">Tên sản phẩm(*)</label>
              <input
                {...register("name", { required: true })}
                type="text"
                name=""
                id=""
                className="shadow-inner bg-white hover:outline-none hover:outline-none w-100"
              />
            </div>
            <div className="flex flex-col p-5">
              <label htmlFor="">Tên sản phẩm(*)</label>
              <input
                {...register("price", { required: true })}
                type="text"
                name=""
                id=""
                className="shadow-inner bg-white hover:outline-none hover:outline-none w-100"
              />
            </div>
            <div className="flex flex-col p-5">
              <label htmlFor="">Tên sản phẩm(*)</label>
              <input
                {...register("discountPrice", { required: true })}
                type="text"
                name=""
                id=""
                className="shadow-inner bg-white hover:outline-none hover:outline-none w-100"
              />
            </div>
            <div className="flex flex-col p-5">
              <label htmlFor="">Tên sản phẩm(*)</label>
              <input
                {...register("images", { required: true })}
                type="text"
                name=""
                id=""
                className="shadow-inner bg-white hover:outline-none hover:outline-none w-100"
              />
            </div>
            <div className="flex flex-col p-5">
              <select {...register("category")} name="" id="">
                <option value="">Danh mục 1</option>
                <option value="">Danh mục 2</option>
              </select>
            </div>
            <div className="flex flex-col p-5">
              <label htmlFor="">Mô tả sản phẩm(*)</label>
              <textarea
                name=""
                id=""
                className="shadow-inner bg-white hover:outline-none hover:outline-none w-250"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-400 p-2 rounded-lg text-white ml-250"
          >
            Thêm sản phẩm mới
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProductPage;
