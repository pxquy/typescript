import banner from "../../assets/public/banneShop.jpg";
import ListProduct from "../../component/listProduct";

const HomePage = () => {
  return (
    <>
      <div className="w-full items-center">
        <img
          className="w-350 h-150 object-cover ml-15 mt-5 rounded-md"
          src={banner}
          alt="Banner Shop"
        />
      </div>
      <h1 className="font-bold w-full text-center mt-5">
        DANH SÁCH SẢN PHẨM NỔI BẬT
      </h1>
      <ListProduct />
    </>
  );
};

export default HomePage;
