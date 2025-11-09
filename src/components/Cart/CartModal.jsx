import React from "react";
import { useCart } from "../../context/CartContext.jsx";
import { formatHarga } from "../../utils/format";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaTrash, FaTimes } from "react-icons/fa";

export default function CartModal({ isOpen, onClose, onConfirm }) {
  const { items, addItem, removeItem, totalPrice } = useCart();

  if (typeof window === "undefined") return null;

  const modalVariants = {
    hidden: { opacity: 0, y: "100vh" },
    visible: { opacity: 1, y: "0", transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: { opacity: 0, y: "100vh" }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content fixed-layout"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Keranjang ({items.reduce((a, b) => a + b.quantity, 0)})</h3>
              <button className="modal-close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="cart-scroll">
              {items.length === 0 ? (
                <p className="empty-cart-message">Keranjang kamu masih kosong.</p>
              ) : (
                items.map((item) => (
                  <div className="cart-item improved" key={item.slug}>
                    <div className="cart-item-info">
                      <h4>{item.nama}</h4>
                      <p>{formatHarga(item.harga)}</p>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => removeItem(item.slug)} title="Kurangi">
                        {item.quantity === 1 ? <FaTrash /> : <FaMinus />}
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => addItem(item)} title="Tambah">
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="footer-total">
                <span>Total</span>
                <span className="total-amount">{formatHarga(totalPrice)}</span>
              </div>
              <button
                className={`footer-checkout-btn ${items.length === 0 ? "disabled" : ""}`}
                onClick={onConfirm}
                disabled={items.length === 0}
              >
                Lanjutkan Pembayaran
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
