import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/client/Home";
import Layout from "./layout/client/Layout";
import Products from "./pages/client/Products";
import News from "./pages/client/News";
import ProductDetail from "./pages/client/ProductDetail";
import Bai6 from "./pages/bai6/bai6";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/news" element={<News />} />
        </Route>
        <Route path="bai6" element={<Bai6 />} />
      </Routes>
    </>
  );
}

export default App;
