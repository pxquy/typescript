import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Client/Home";
import ClientLayout from "./layout/Client/ClientLayout";
import ProductDetailPage from "./pages/Client/ProductDetail";
import ProductPage from "./pages/Client/Product";
import AboutPage from "./pages/Client/About";

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
      </Routes>
    </>
  );
}

export default App;
