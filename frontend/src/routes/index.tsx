import { Route, Routes } from "react-router";
import HomePage from "../pages/client/home";
import ClientLayout from "../components/layout/client";
import AdminLayout from "../components/layout/admin";
import Dashboard from "../pages/admin/dashboard";
import ProductManagement from "../pages/admin/product-management";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="product" element={<ProductPage />} />
          <Route path="productDetail" element={<ProductDetailPage />} />
          <Route path="about" element={<AboutPage />} /> */}
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="product-management" element={<ProductManagement />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
