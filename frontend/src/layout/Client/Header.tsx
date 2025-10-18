import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ListCategories from "../../components/ListCategories";

const Header = () => {
  const [active, setActive] = useState<string>("/");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-amber-100 shadow-md">
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
              className={`pr-5 pl-5 pt-3 pb-3 rounded-sm hover:text-red-500 ${
                active === "/" ? "bg-yellow-500" : "bg-yellow-200"
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
              className={`pr-5 pl-5 pt-3 pb-3 rounded-sm hover:text-red-500 ${
                active === "product" ? "bg-yellow-500" : "bg-yellow-200"
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
              className={`pr-5 pl-5 pt-3 pb-3 rounded-sm hover:text-red-500 ${
                active === "about" ? "bg-yellow-500" : "bg-yellow-200"
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

        <div>
          <ul>
            {isLoggedIn ? (
              <li
                onClick={handleLogout}
                className="cursor-pointer bg-yellow-200 pr-5 pl-5 pt-3 pb-3 rounded-sm hover:text-red-500"
              >
                Đăng xuất
              </li>
            ) : (
              <li
                onClick={() => setActive("login")}
                className={`bg-yellow-200 pr-5 pl-5 pt-3 pb-3 rounded-sm hover:text-red-500 ${
                  active === "login" ? "bg-yellow-500" : "bg-yellow-200"
                }`}
              >
                <Link
                  to="/login"
                  className="hover:text-brown-600 transition-colors duration-200"
                >
                  Đăng nhập
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
