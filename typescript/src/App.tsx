import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/client/Home";
import Layout from "./layout/client/Layout";
import Products from "./pages/client/Products";
import News from "./pages/client/News";
import ProductDetail from "./pages/client/ProductDetail";
import ColorButton from "./bai6/ColorButton";
import MySate from "./MyState/MySate";
import Bai8 from "./BAI8/Bai8";

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
        <Route path="mySate" element={<MySate />} />
        <Route path="myEffect" element={<Bai8 />} />
      </Routes>
    </>
  );
}

export default App;
