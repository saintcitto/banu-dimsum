import React from "react";
import { CartProvider } from "./src/context/CartContext.jsx";
import "./src/styles/index.scss";

export const wrapRootElement = ({ element }) => (
  <CartProvider>{element}</CartProvider>
);

export const disableCorePrefetching = () => true;