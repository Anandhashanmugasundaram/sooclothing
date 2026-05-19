import React from "react";

import ReactDOM from "react-dom/client";

import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  BrowserRouter,
} from "react-router-dom";

import App from "./App.jsx";

import {
  AuthProvider,
} from "@/contexts/AuthContext";

import {
  CartProvider,
} from "@/contexts/CartContext";

import "./index.css";
import ScrollToTop from "./components/site/ScrollToTop.jsx";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>
     <ScrollToTop />

      <AuthProvider>

        <CartProvider>

          <App />

        </CartProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>

);