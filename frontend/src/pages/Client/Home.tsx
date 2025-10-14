// import { Button } from "@/components/ui/button";
import ListProduct from "../../components/ListProduct";

const HomePage = () => {
  return (
    <>
      <div className="w-full items-center">
        <img
          className="w-350 h-150 object-cover ml-15 mt-5 rounded-md"
          src="./images/bannerShop.jpg"
          alt="Banner Shop"
        />
      </div>
      <h1 className="font-bold w-full text-center mt-5">
        DANH SÁCH SẢN PHẨM NỔI BẬT
      </h1>
      <ListProduct />
      {/* <Button>Click me</Button> */}
    </>
  );
};

export default HomePage;
