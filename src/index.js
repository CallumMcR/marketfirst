import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Index";
import Products from "./components/Products";
import Product from "./components/Product";
import './index.css';
import "@fontsource/open-sans"; // Defaults to weight 400.


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/" element={<Products />} />
      <Route exact path="/products/:id" element={<Product />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);