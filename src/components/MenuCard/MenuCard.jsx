// src/components/MenuCard/MenuCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext.jsx";
import { formatHarga } from "../../utils/format";
import { FaPlus } from "react-icons/fa";

export default function MenuCard({ item, delay = 0 }) {
  const { addItem } = useCart();

  return (
    <motion.div className="menu-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.3 }}>
      <div className="card-image-placeholder"><span>{item.nama.charAt(0)}</span></div>
      <div className="card-content">
        <h3 className="card-title">{item.nama}</h3>
        <p className="card-description">{item.deskripsi}</p>
        <p className="card-price">{formatHarga(item.harga)}</p>
        <div className="card-actions">
          <button className="card-button-add" onClick={() => addItem(item)} aria-label={`Tambah ${item.nama}`}><FaPlus /></button>
        </div>
      </div>
    </motion.div>
  );
}