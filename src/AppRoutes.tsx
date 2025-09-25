import {  Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Cart } from "./components/Cart";
import { Product } from "./components/Product";
import { Success } from "./components/Success";
import { Pending } from "./components/Pending";
import { Failure } from "./components/Failure";
export function AppRoutes() {
  return (
    <>
    
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout/success" element={<Success />} />
            <Route path="/checkout/pending" element={<Pending />} />
            <Route path="/checkout/failure" element={<Failure />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<Product />} />
        </Routes>    
    </>
  );
}
