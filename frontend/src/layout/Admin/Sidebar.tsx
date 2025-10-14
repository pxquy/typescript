import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState<string>("/admin");
  return (
    <>
      <div className="h-190 w-60 bg-white shadow-sm overflow-y-scroll">
        <div className="border-b border-gray-300 h-20 text-center leading-20 font-bold text-blue-500">
          📊 TRANG QUẢN TRỊ
        </div>
        <h2 className="m-5 text-gray-400 font-bold">DANH MỤC</h2>
        <div className="ml-10">
          <ul className="flex flex-col gap-3">
            <li
              onClick={() => setActive("/admin")}
              className={`font-bold p-3 hover:bg-blue-200 w-45 rounded ${
                active == "/admin" ? "bg-blue-400" : ""
              }`}
            >
              <Link to="/admin">Dashboard</Link>
            </li>
            <li
              onClick={() => setActive("/product")}
              className={`font-bold p-3 hover:bg-blue-200 w-45 rounded ${
                active == "/product" ? "bg-blue-400" : ""
              }`}
            >
              <Link to="product">Sản phẩm</Link>
            </li>
            <li
              onClick={() => setActive("/")}
              className={`font-bold p-3 hover:bg-blue-200 w-45 rounded ${
                active == "/" ? "bg-blue-400" : ""
              }`}
            >
              <Link to="/">Quay lại trang chủ</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="m-5 text-gray-400 font-bold">HỆ THỐNG</h2>
          <ul className="ml-10 flex flex-col gap-3">
            <li
              onClick={() => setActive("/")}
              className={`font-bold p-3 hover:bg-blue-200 w-45 rounded ${
                active == "/" ? "bg-blue-400" : ""
              }`}
            >
              Cài đặt
            </li>
            <li
              onClick={() => setActive("/")}
              className={`font-bold p-3 hover:bg-blue-200 w-45 rounded ${
                active == "/" ? "bg-blue-400" : ""
              }`}
            >
              Hỗ trợ
            </li>
          </ul>
        </div>

        <div className=" border-t mt-40 border-gray-300">
          <div className="p-10 text-center">
            <img src="" alt="Quý đẹp trai" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
