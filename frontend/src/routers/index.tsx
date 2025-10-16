import { Routes, Route } from "react-router-dom";
import ClientLayout from "../layout/Client/ClientLayout";
import HomePage from "../pages/Client/Home";
import ProductPage from "../pages/Client/Product";
import ProductDetailPage from "../pages/Client/ProductDetail";
import AboutPage from "../pages/Client/About";
import LayoutAdmin from "../layout/Admin/LayoutAdmin";
import DashboardManager from "../pages/Admin/Dashboard";
import ProductManager from "../pages/Admin/Products/Product";
import AddProductPage from "../pages/Admin/Products/AddProduct";
import Login from "../pages/Client/Login";
import Register from "../pages/Client/Register";
import EditProductPage from "../pages/Admin/Products/EditProduct";

function Routers() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="productDetail" element={<ProductDetailPage />} />
          <Route path="about" element={<AboutPage />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashboardManager />} />
          <Route path="product" element={<ProductManager />} />
          <Route path="addPage" element={<AddProductPage />} />
          <Route path="edit/:id" element={<EditProductPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default Routers;
