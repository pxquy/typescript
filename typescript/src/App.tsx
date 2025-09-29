import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/client/Home";
import Layout from "./layout/client/Layout";
import Products from "./pages/client/products";
import News from "./pages/client/news";
import ProductDetail from "./pages/client/ProductDetail";

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
      </Routes>
    </>
  );
}

export default App;
