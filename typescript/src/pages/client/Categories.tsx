import { useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [active, setActive] = useState("/");
  return (
    <nav className="bg-red-500 flex w-full items-center gap-5 justify-between">
      <div>
        <ul className="flex w-full items-center p-5 pl-35 gap-5">
          <li
            onClick={() => {
              setActive("/");
            }}
            className={`p-2 rounded cursor-pointer ${
              active === "/" ? "bg-blue-400 text-white" : "bg-blue-100"
            }`}
          >
            <Link className="hover:text-red-600 font-bold" to="/">
              Trang chủ
            </Link>
          </li>
          <li
            onClick={() => setActive("products")}
            className={`p-2 rounded cursor-pointer ${
              active === "products" ? "bg-blue-400 text-white" : "bg-blue-200"
            }`}
          >
            <Link to="/products" className="hover:text-red-600 font-bold">
              Sản phẩm
            </Link>
          </li>
          <li
            onClick={() => setActive("news")}
            className={`p-2 rounded cursor-pointer ${
              active === "news" ? "bg-blue-400 text-white" : "bg-blue-200"
            }`}
          >
            <Link to="/news" className="hover:text-red-600 font-bold">
              Tin tức
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-110">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="bg-white rounded w-65 focus:outline-none"
        />
        <button className="bg-blue-500 cursor-pointer w-10 rounded hover:bg-blue-600">
          👌🏼
        </button>
      </div>
    </nav>
  );
};

export default Categories;
