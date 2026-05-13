import {
  Route,
  Routes,
} from "react-router-dom";

import { Toaster } from "sonner";

import { Layout } from "@/components/site/Layout";

import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Lookbook from "./pages/Lookbook";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders"; // ✅ ADD

export default function App() {

  return (

    <>

      <Toaster
        position="top-center"
        theme="light"
      />

      <Layout>

        <Routes>

          <Route
            path="/"
            element={<Index />}
          />

          <Route
            path="/shop"
            element={<Shop />}
          />

          <Route
            path="/product/:slug"
            element={
              <ProductDetail />
            }
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/account"
            element={<Account />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/lookbook"
            element={<Lookbook />}
          />

          <Route
            path="/admin"
            element={<Admin />}
          />

          <Route
            path="/admin-products"
            element={
              <AdminProducts />
            }
          />

          {/* ✅ ADMIN ORDERS */}
          <Route
            path="/admin-orders"
            element={
              <AdminOrders />
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </Layout>

    </>

  );

}