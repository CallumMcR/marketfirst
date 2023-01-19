import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Index";
import Products from "./components/Products";
import Product from "./components/Product";
import Login from "./components/Login";
import MyAccount from "./components/MyAccount";
import './index.css';
import "@fontsource/open-sans"; // Defaults to weight 400.


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:search?" element={<Products />} />
      <Route exact path="/products/product/:id" element={<Product />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/account/:location" element={<MyAccount />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);