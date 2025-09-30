import axios from "axios";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ProductDetail {
  id: number;
  name: string;
  price: number;
  image: string;
}
const ProductDetail = () => {
  const [product, setProduct] = useState<ProductDetail>({
    id: 1,
    name: "",
    price: 0,
    image: "",
  });

  const { id } = useParams<{ id: string }>();

  const getBYId = async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.error("Lỗi dự liệu server");
    }
  };

  useEffect(() => {
    if (id) getBYId(id);
  }, [id]);

  useEffect(() => {
    console.log("Product detail:", product);
  }, [product]);
  return (
    <>
      <Header />
      <div>
        <div>
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <h2>Thông tin sản phẩm</h2>
            <p></p>
            <p></p>
            <p>Mô tả sản phẩm chính hãng.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
