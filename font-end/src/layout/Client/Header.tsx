import { Link } from "react-router-dom";
// import logo from "./images/logoShop.jpg";
import { useState } from "react";
import ListCategories from "../../component/ListCategories";

const Header = () => {
  const [active, setActive] = useState<string>("/");
  return (
    <header className="sticky top-0 bg-amber-100 shadow-md">
      <div className="flex items-center justify-evenly h-20 px-8">
        <ListCategories />
        <div className="flex items-center gap-2">
          <img
            src="./images/logoShop.jpg"
            alt="Logo Shop"
            className="w-14 h-14 object-cover rounded-full border-2 border-amber-300 shadow-sm"
          />
          <h1 className="text-xl font-bold text-brown-700">My Shop</h1>
        </div>

        <nav className="flex gap-6 text-brown-800 font-medium">
          <ul className="flex gap-6 text-brown-800 font-medium">
            <li
              onClick={() => setActive("/")}
              className={`bg-yellow-200 pr-5 pl-5 pt-3 pb-3 rounded-sm  hover:text-red-500 ${
                active == "/" ? "bg-yellow-500" : "bg-yellow-200"
              }`}
            >
              <Link
                to="/"
                className="hover:text-brown-600 transition-colors duration-200"
              >
                HOME
              </Link>
            </li>
            <li
              onClick={() => setActive("product")}
              className={`bg-yellow-200 pr-5 pl-5 pt-3 pb-3 rounded-sm hover:text-red-500 ${
                active == "product" ? "bg-yellow-500" : "bg-yellow-200"
              }`}
            >
              <Link
                to="/product"
                className="hover:text-brown-600 transition-colors duration-200"
              >
                SẢN PHẨM
              </Link>
            </li>
            <li
              onClick={() => setActive("about")}
              className={`bg-yellow-200 pr-5 pl-5 pt-3 pb-3 rounded-sm hover:text-red-500 ${
                active == "about" ? "bg-yellow-500" : "bg-yellow-200"
              }`}
            >
              <Link
                to="/about"
                className="hover:text-brown-600 transition-colors duration-200"
              >
                VỀ CHÚNG TÔI
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
