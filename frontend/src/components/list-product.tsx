import { useEffect, useState } from "react";
import type { IProduct } from "../types/product";
import { getAllProducts } from "../api/product";
import { formatPrice } from "../utils/formatPrice";

const ListProduct = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const _limit = 8;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllProducts({ _page: 1, _limit });
        setProducts(data.docs);
      } catch (error) {
        console.log("Lỗi dữ liệu", error);
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="w-300 mt-10 flex gap-15 items-center justify-center flex-wrap">
        {products.length == 0 ? (
          <span className="w-full pl-153 text-gray-400 font-bold">
            Không có sản phẩm nào trong của hàng
          </span>
        ) : (
          products.map((p, index) => (
            <div
              key={index + 1}
              className="w-60 shadow-lg hover:scale-105 duration-200 ease-in-out cursor-pointer"
            >
              <div>
                <img
                  src={
                    p.images ? `./images/${p.images}` : "./images/coffee1.jpg"
                  }
                  alt={p.name}
                  className="h-50 w-full"
                />
              </div>
              <div className="font-bold text-center p-2">{p.name}</div>
              <div className="flex items-center justify-center gap-10">
                <span className="text-red-600 font-bold">
                  {formatPrice(Number(p.price))}
                </span>
                <span className="line-through text-gray-400">
                  {formatPrice(Number(p.discountPrice))}
                </span>
              </div>
              <div className="flex justify-center items-center gap-3 mt-5 mb-5">
                <button className="p-2 bg-yellow-500 cursor-pointer rounded-sm hover:bg-yellow-600 hover:text-white">
                  Mua ngay
                </button>
                <button className="pt-2 pr-1 pl-1 pb-2 bg-yellow-500 cursor-pointer rounded-sm hover:bg-yellow-600 hover:text-white">
                  Thêm giỏ hàng
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListProduct;
