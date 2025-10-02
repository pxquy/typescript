import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/client/Home";
import Layout from "./layout/client/Layout";
import Products from "./pages/client/Products";
import News from "./pages/client/News";
import ProductDetail from "./pages/client/ProductDetail";
import ColorButton from "./bai6/colorButton";

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
        <Route path="colorButton" element={<ColorButton />} />
      </Routes>
    </>
  );
}

export default App;
