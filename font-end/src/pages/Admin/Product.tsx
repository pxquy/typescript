import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Products {
  name: string;
  price: number;
  discountPrice: number;
  images: string;
  description: string;
}

const ProductManager = () => {
  const [Products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3000/api/coffee`);
      setProducts(data.data);
    })();
  }, []);
  return (
    <>
      <div className="mt-15 ml-10">
        <div className="mb-10 z-10">
          <form className="flex gap-20">
            <select
              name=""
              id=""
              className="border rounded-lg border-gray-400 p-2 pl-5 pr-5 font-bold cursor-pointer"
            >
              <option value="" hidden>
                Chọn danh mục
              </option>
              <option value="">Danh mục 1</option>
              <option value="">Danh mục 2</option>
              <option value="">Danh mục 3</option>
            </select>
            <select
              name=""
              id=""
              className="border rounded-lg border-gray-400 p-2 pl-5 pr-5 font-bold cursor-pointer"
            >
              <option value="">Chọn giá</option>
              <option value="">20000-50000</option>
              <option value="">50000-100000</option>
            </select>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="shadow-inner bg-gray-200 w-70 rounded-lg placeholder:p-2 focus:outline-none"
            />
            <button className="bg-blue-400 w-20 rounded-lg font-bold text-white cursor-pointer">
              Lọc
            </button>
          </form>
        </div>
        <div>
          <table className="border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-gray-300 border">
                  <input type="checkBox" />
                </th>
                <th className="border border-gray-300 p-5">STT</th>
                <th className="border border-gray-300 w-60 text-center">
                  hình ảnh
                </th>
                <th className="border border-gray-300 w-60 text-center">
                  Giá sản phẩm
                </th>
                <th className="border border-gray-300 w-60 text-center">
                  Giá giảm
                </th>
                <th className="border border-gray-300 w-60 text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {Products.length == 0 ? (
                <div>Hiện tại không còn sản phẩm nào!</div>
              ) : (
                Products.map((p, index) => (
                  <tr
                    key={index + 1}
                    className={`border border-gray-300 ${
                      index % 2 == 0 ? "bg-white" : "bg-gray-200"
                    }`}
                  >
                    <td className="border border-gray-300 w-10 text-center">
                      <input type="checkBox" />
                    </td>
                    <td className="border border-gray-300 w-10 text-center">
                      {index + 1}
                    </td>
                    <td className=" border-gray-300 w-80 p-2 flex justify-between">
                      <img
                        src={`/images/${p.images}`}
                        alt={p.name}
                        className="w-20 h-20 rounded"
                      />
                      <span className="mt-7 font-bold text-gray-500">
                        {p.name}
                      </span>
                    </td>
                    <td className="border border-gray-300 w-65 text-center">
                      {p.price}
                    </td>
                    <td className="border border-gray-300 w-65 text-center">
                      {p.discountPrice}
                    </td>
                    <td className=" border-gray-300 w-65 text-center justify-around">
                      <button className="m-2 bg-red-600 pl-3 pr-3 pt-1 pb-1 rounded hover:bg-red-500 font-bold cursor-pointer">
                        🗑️
                      </button>
                      <Link
                        to=""
                        className="m-2 bg-yellow-400 pl-3 pr-3 pt-1 pb-1 rounded hover:bg-yellow-300 font-bold"
                      >
                        ✏️
                      </Link>
                      <Link
                        to=""
                        className="m-2 bg-blue-600 pl-3 pr-3 pt-1 pb-1 rounded hover:bg-blue-500 font-bold"
                      >
                        👁️
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductManager;
