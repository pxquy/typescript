import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Client/Home";
import ClientLayout from "./layout/Client/ClientLayout";
import ProductDetailPage from "./pages/Client/ProductDetail";
import ProductPage from "./pages/Client/Product";
import AboutPage from "./pages/Client/About";
import LayoutAdmin from "./layout/Admin/LayoutAdmin";
import DashboardManager from "./pages/Admin/dashboard";
import ProductManager from "./pages/Admin/product";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="productDetail" element={<ProductDetailPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashboardManager />} />
          <Route path="product" element={<ProductManager />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
