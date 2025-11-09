import React from "react";
import { useCart } from "../../context/CartContext.jsx";
import { FaShoppingBag } from "react-icons/fa";
import "../../styles/components/_CartBar.scss";

export default function CartBar({ onOpen }) {
  const { items, totalPrice } = useCart();
  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
  const preview =
    items.length > 0
      ? `${items[0].nama}${items.length > 1 ? ` +${items.length - 1} lainnya` : ""}`
      : "Keranjang kamu kosong";

  if (items.length === 0) return null;

  return (
    <div className="cart-bar" onClick={onOpen} role="button" tabIndex="0" aria-label="Open cart">
      <div className="cart-bar-left">
        <span className="cart-item-count">{totalQty} item</span>
        <span className="cart-preview">{preview}</span>
      </div>
      <div className="cart-bar-right">
        <span className="cart-total">
          Rp{totalPrice.toLocaleString("id-ID")}
        </span>
        <div className="cart-icon">
          <FaShoppingBag />
        </div>
      </div>
    </div>
  );
}